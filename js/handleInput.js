import {movers} from "./handleMovement.js"

export const keyBoardInputs = {
	keyDown: (e, settings, globalSettings) => {
		// console.log(e.key)
		if (e.key === "ArrowRight" || e.key === "d" || e.key === "Right") {
			movers.moveRight(settings);
		}
		else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "Left") {
			movers.moveLeft(settings);
		}
		else if (e.key === "ArrowUp" || e.key === "w" || e.key === "Up") {
			movers.moveUp(settings);
		}
		else if (e.key === "ArrowDown" || e.key === "s" || e.key === "Down") {
			movers.moveDown(settings);
		}
		// else if (e.key === " ") {
		// 	nextTrial(globalSettings)
		// }
	},
	keyUp: (e, settings, globalSettings) => {
			if(e.key === 'Right' ||
			e.key === 'ArrowRight' ||
			e.key === 'Left' ||
			e.key === 'ArrowLeft' ||
			e.key === 'Up' ||
			e.key === 'ArrowUp' ||
			e.key === 'Down' ||
			e.key === 'ArrowDown' ||
			e.key === "w" ||
			e.key === "a" ||
			e.key === "s" ||
			e.key === "d") {
				stopMovement(settings)
			}		
			else if (e.key ===" ") {
				nextTrial(globalSettings)
			} 
	}	
}

function nextTrial(globalSettings) {
	globalSettings.trialState =	"FINISHED";
}

function stopMovement(settings) {
	settings.dx = 0;
	settings.dy = 0;
}

export const mouseInputs = {
	mouseDown: (e) => {
		let X = e.screenX;
		let Y = e.screenY;
		// console.log(X, Y);
	},
	mouseDown: (e) => {
		let X = e.screenX;
		let Y = e.screenY;
		// console.log(X, Y);
	}
}