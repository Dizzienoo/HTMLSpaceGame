import { reverseNumber } from "./utilities.js";

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
        // Get the power as a positive number and add on 1 point min
        globalState.trialResults.actualScore = (reverseNumber(Math.round(globalState.playerSettings.power), 10, 90)+10)
        // Round down to 1-10
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
        globalState.trialResults.actualScore = (reverseNumber(Math.round(globalState.playerSettings.power), 10, 90)-100)
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore/10);
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
    }
}
