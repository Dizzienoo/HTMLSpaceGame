/**
 * Resets the Player back to starting position and settings
 * @param {*} globalState The Global State Object
 */
export function resetPlayer(globalState) {
	globalState.maxWidth = (globalState.canvasWidth/20)*19
	globalState.minWidth = globalState.canvasWidth/20
	globalState.currentPower = 50;
	globalState.playerSettings.w = (globalState.canvasWidth)/10;
	globalState.playerSettings.h = (globalState.canvasHeight)/10;
	globalState.playerSettings.x = globalState.canvasWidth/2;
	globalState.playerSettings.y = (globalState.canvasHeight/5)*3;
	globalState.playerSettings.speed = 8;
	globalState.playerSettings.dx = 0;
	globalState.playerSettings.dy = 0;
	globalState.playerSettings.powerSpeed = 2;
	globalState.playerSettings.power = 50;
	globalState.playerSettings.beamColor = "green";
	globalState.hintAnimation.y = (globalState.canvasHeight/10)*1
	globalState.rect = canvas.getBoundingClientRect();
	// Reset the "time left" timer
	globalState.trialTimeLeft = globalState.trialTime / 1000;
	// Reset the trialScore and Success
	globalState.trialResults.score = 0;
	globalState.trialResults.actualScore = 0;
	globalState.trialResults.success = false;
	globalState.trialResults.movementX = 0;
	globalState.trialResults.movementY = 0;
}
