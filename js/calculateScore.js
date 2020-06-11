export function calculateScore(globalState) {
    const paddingL = globalState.rockArea.leftX + globalState.rockArea.w
	// Find the padding between rock right and far edge
	const paddingR = globalState.canvasWidth - globalState.rockArea.rightX
	// Calculate the hint pos by
	// Finding active area (canvas width - l and r paddings)
    const activeArea = globalState.canvasWidth - (paddingL + paddingR);
	// Dividing active area by 100 and multiplying by junk location (then adding left padding on)
    const resultScreenPos = ((activeArea / 100) * (globalState.testData[globalState.trial].result)) + paddingL;
    // If the Beam covers the hint
	if (resultScreenPos > globalState.beamLeft && resultScreenPos < globalState.beamRight) {
        //Set the success to true
        globalState.trialResults.success = true;
        // Set the Score as 100 - power percent
        globalState.trialResults.actualScore = Math.round((100-((globalState.playerSettings.power /100)* 90)+ Number.EPSILON)*100)/100;
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore);
        // If this is higher than previous high score
        if (globalState.highestScore < globalState.trialResults.score) {
            // Set the new high score
            globalState.highestScore = globalState.trialResults.score
        }
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
    }
    console.log(globalState.trialResults)
}