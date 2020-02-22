// import {detectWalls} from "./detectWalls.js"

/**
 * Handles the lateral movement of the magnet and
 * also handles the increase and decrease of power
 * 
 * @param settings The player settings Object
 */
export function handleMovement(settings) {
	settings.x += settings.dx;
	if (settings.power >= 0 && settings.power <= 100) {
		settings.power += settings.dy;
	}
	else if (settings.power < 0) {
		settings.power = 0;
	}
	else if (settings.power > 100) {
		settings.power = 100;
	}
	detectWalls(settings);
}

/**
 * Handles Moving Up Down Left and Right
 */
export const movers = {
	moveLeft: (settings) => {
		settings.dx = -settings.speed;
	},
	moveRight: (settings) => {
		settings.dx = settings.speed;
	},
	moveUp: (settings) => {
		settings.dy = settings.powerSpeed;
	},
	moveDown: (settings) => {
		settings.dy = -settings.powerSpeed;
	}
}

/**
 * Detects the Edges of the Game to stop the player going beyond them
 */
function detectWalls(settings) {
  // Left wall
  if (settings.x < 0) {
    settings.x = 0;
  }

  // Right Wall
  if (settings.x + settings.w > canvas.width) {
    settings.x = canvas.width - settings.w;
  }

  // Top wall
  if (settings.y < 0) {
    settings.y = 0;
  }

  // Bottom Wall
  if (settings.y + settings.h > canvas.height) {
    settings.y = canvas.height - settings.h;
  }
}