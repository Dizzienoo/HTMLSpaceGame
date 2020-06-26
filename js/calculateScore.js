export function calculateScore(globalState) {
    // Calculate the Time the trial took to complete
    globalState.trialResults.trialTime = globalState.trialResults.trialEndTime - globalState.trialResults.trialStartTime
    // Find the padding between the Rock and the Left edge
    const paddingL = globalState.rockArea.leftX + globalState.rockArea.w
	// Find the padding between rock right and far edge
    const paddingR = globalState.canvasWidth - globalState.rockArea.rightX
	// Calculate the hint pos by
	// Finding active area (canvas width - l and r paddings)
    const activeArea = globalState.canvasWidth - (paddingL + paddingR);
	// Dividing active area by 100 and multiplying by junk location (then adding left padding on)
    const resultScreenPos = ((activeArea / 100) * (globalState.testData[globalState.trial].result)) + paddingL;
    // If the Beam covers the hint
	if (resultScreenPos > globalState.beamLeft && resultScreenPos < globalState.beamRight && globalState.trialTimeLeft > 0) {
        //Set the success to true
        globalState.trialResults.success = true;
        // Set the Score as 100 - power percent
        console.log(globalState.playerSettings.power)
        globalState.trialResults.actualScore = Math.round((100-((((globalState.playerSettings.power < 15)? 0: globalState.playerSettings.power) /100)* 100)+ Number.EPSILON)*100)/100 || 1
        console.log(globalState.trialResults.actualScore)
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore/10);
        // If this is higher than previous high score
        if (globalState.highestScore < globalState.trialResults.score) {
            // Set the new high score
            globalState.highestScore = globalState.trialResults.score
        }
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
    }
    // Otherwise if we are on the punishment round
    else if (Number(globalState.level) === 6) {
        //else if (Number(globalState.testData[globalState.trial].level) === 6) {
        globalState.trialResults.actualScore = Math.round((-10-((globalState.playerSettings.power /100)* 90)+ Number.EPSILON)*100)/100;
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore);
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
    }
}