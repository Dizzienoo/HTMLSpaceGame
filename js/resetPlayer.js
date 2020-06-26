/**
 * Resets the Player back to starting position and settings
 * @param {*} globalState The Global State Object
 */
export function resetPlayer(globalState) {
  // Find the padding between the Rock and the Left edge
  const paddingL = (globalState.rockArea && globalState.rockArea.leftX)?
		globalState.rockArea.leftX : 0 + (globalState.rockArea && globalState.rockArea.w)?
		globalState.rockArea.w : 0
	// Find the padding between rock right and far edge
	const paddingR = globalState.canvasWidth - ((globalState.rockArea && globalState.rockArea.rightX)? 
	globalState.rockArea.rightX : globalState.canvasWidth)
	// Calculate the hint pos by
	// Finding active area (canvas width - l and r paddings)
	const activeArea = globalState.canvasWidth - (paddingL + paddingR);
	globalState.maxWidth = (globalState.canvasWidth/20)*19
	globalState.minWidth = globalState.canvasWidth/20
	globalState.currentPower = 50;
	globalState.playerSettings.w = (globalState.canvasWidth)/10;
	globalState.playerSettings.h = (globalState.canvasHeight)/10;
	if (globalState.gameState === "INTRO") {
		// Set lander to middle
		globalState.playerSettings.x = globalState.canvasWidth/2		
	}
	else {
		// Set the Rover position to a random spot within the active area
		globalState.playerSettings.x = ((((activeArea/100)*95) * Math.random()) + paddingL) + 
			(((globalState.rockArea && globalState.rockArea.w)? globalState.rockArea.w : 0)/2);
	}
	globalState.playerSettings.y = (globalState.canvasHeight/5)*3.1;
	globalState.playerSettings.speed = globalState.canvasWidth/60;
	globalState.playerSettings.dx = 0;
	globalState.playerSettings.dy = 0;
	globalState.playerSettings.powerSpeed = globalState.canvasWidth/360;
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
	// Reset the Distance Moved
	globalState.trialResults.movementX = 0;
	globalState.trialResults.movementY = 0;
	// Reset the Trial Timings
	globalState.trialResults.trialTime = 0;
	globalState.trialResults.trialStartTime = 0;
	globalState.trialResults.trialEndTime = 0;
}
