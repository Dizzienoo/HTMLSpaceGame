export function calculateScore(globalState) {
    const resultScreenPos = globalState.testData[globalState.trial].result + globalState.rockArea.leftX
    // If the Beam covers the hint
	if (resultScreenPos > globalState.beamLeft && resultScreenPos < globalState.beamRight) {
        //Set the success to true
        globalState.trialResults.success = true;
        // Set the Score as 100 - power percent
        console.log(globalState.playerSettings.power);
        globalState.trialResults.score = 100-((globalState.playerSettings.power /100)* 90)
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