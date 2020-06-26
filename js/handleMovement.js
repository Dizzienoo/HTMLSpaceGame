/**
 * Handles the lateral movement of the magnet and
 * also handles the increase and decrease of power
 * 
 * @param settings The player settings Object
 */
export function handleMovement(globalState) {
	// Move the rover relative to movement speed
	globalState.playerSettings.x += globalState.playerSettings.dx;
	// Add the movement speed (as positive number) to total moved
	globalState.trialResults.movementX += Math.abs(globalState.playerSettings.dx);
	// Adjust the power if it is within range
	if (globalState.playerSettings.power >= 10 && globalState.playerSettings.power <= 100) {
		globalState.playerSettings.power += globalState.playerSettings.dy;
		globalState.trialResults.movementY += Math.abs(globalState.playerSettings.dy)
	}
	if (globalState.playerSettings.power <= 10) {
		globalState.playerSettings.power = 10;
		globalState.trialResults.movementY -= Math.abs(globalState.playerSettings.dy)
	}
	else if (globalState.playerSettings.power >= 100) {
		globalState.playerSettings.power = 100;
		globalState.trialResults.movementY -= Math.abs(globalState.playerSettings.dy)
	}
	detectWalls(globalState);
}

/**
 * Handles Moving Up Down Left and Right
 */
export const movers = {
	moveLeft: (playerSettings) => {
		playerSettings.dx = -playerSettings.speed;
	},
	moveRight: (playerSettings) => {
		playerSettings.dx = playerSettings.speed;
	},
	moveUp: (playerSettings) => {
		playerSettings.dy = playerSettings.powerSpeed;
	},
	moveDown: (playerSettings) => {
		playerSettings.dy = -playerSettings.powerSpeed;
	}
}

/**
 * Detects the Edges of the Game to stop the player going beyond them
 */
function detectWalls(globalState) {
	// // Stop Rover going further than minimum width plus minimum beam width
  // if (globalState.playerSettings.x < globalState.minWidth + ((globalState.canvasWidth/300) * 10)) {
  //   globalState.playerSettings.x = globalState.minWidth + ((globalState.canvasWidth/300) * 10);
  // }

	// // Stop Rover going further than maximum width minus minimum beam width
  // if (globalState.playerSettings.x > globalState.maxWidth - ((globalState.canvasWidth/300) * 10)) {
  //   globalState.playerSettings.x = globalState.maxWidth - ((globalState.canvasWidth/300) * 10);
	// }
	
	// Stop the Rover going further than the Left Rock
	if (globalState.playerSettings.x < globalState.rockArea.leftX + globalState.rockArea.w) {
		globalState.playerSettings.x = globalState.rockArea.leftX + globalState.rockArea.w
		globalState.trialResults.movementX -= Math.abs(globalState.playerSettings.dx);
	}
	// Stop the Rover going further than the Right Rock
	if (globalState.playerSettings.x > globalState.rockArea.rightX) {
		globalState.playerSettings.x = globalState.rockArea.rightX
		globalState.trialResults.movementX -= Math.abs(globalState.playerSettings.dx)
	}
  // Top wall
  if (globalState.playerSettings.y < 0) {
    globalState.playerSettings.y = 0;
  }

  // Bottom Wall
  if (globalState.playerSettings.y + globalState.playerSettings.h > globalState.canvasHeight) {
    globalState.playerSettings.y = globalState.canvasHeight - globalState.playerSettings.h;
  }
}