import {movers} from "./handleMovement.js"

export const keyBoardInputs = {
	keyDown: (e, globalState) => {
		// console.log(e.key)
		if (e.key === "ArrowRight" || e.key === "d" || e.key === "Right") {
			movers.moveRight(globalState.playerSettings);
		}
		else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "Left") {
			movers.moveLeft(globalState.playerSettings);
		}
		else if (e.key === "ArrowUp" || e.key === "w" || e.key === "Up") {
			movers.moveUp(globalState.playerSettings);
		}
		else if (e.key === "ArrowDown" || e.key === "s" || e.key === "Down") {
			movers.moveDown(globalState.playerSettings);
		}
	},
	keyUp: (e, globalState) => {
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
				stopMovement(globalState.playerSettings)
			}		
			else if (e.key ===" ") {
				nextTrial(globalState)
			} 
	}	
}

function nextTrial(globalState) {
	globalState.trialState =	"FINISHED";
}

function stopMovement(settings) {
	settings.dx = 0;
	settings.dy = 0;
}

export const mouseInputs = {
	mouseDown: (e, globalState) => {
		console.log("mouseDown")
		globalState.mouseDown = true;
		let X = e.clientX - globalState.rect.left;
		let Y = e.clientY - globalState.rect.top;
		// If the click is within the Up Arrow
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.upArrowArea.x && X < (globalState.upArrowArea.w + globalState.upArrowArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.upArrowArea.y && Y < (globalState.upArrowArea.h + globalState.upArrowArea.y)
		) {
			// Increase Power
			console.log("UP")
			movers.moveUp(globalState.playerSettings);
		}
		// If the click is within the Down Arrow
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.downArrowArea.x && X < (globalState.downArrowArea.w + globalState.downArrowArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.downArrowArea.y && Y < (globalState.downArrowArea.h + globalState.downArrowArea.y)
		) {
			// Increase Power
			console.log("DOWN")
			movers.moveDown(globalState.playerSettings);
		}
		// If the click is within the Left Arrow
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.leftArrowArea.x && X < (globalState.leftArrowArea.w + globalState.leftArrowArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.leftArrowArea.y && Y < (globalState.leftArrowArea.h + globalState.leftArrowArea.y)
		) {
			// Increase Power
			console.log("LEFT")
			movers.moveLeft(globalState.playerSettings);
		}
		// If the click is within the Right Arrow
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.rightArrowArea.x && X < (globalState.rightArrowArea.w + globalState.rightArrowArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.rightArrowArea.y && Y < (globalState.rightArrowArea.h + globalState.rightArrowArea.y)
		) {
			// Increase Power
			console.log("RIGHT")
			movers.moveRight(globalState.playerSettings);
		}
	},
	mouseUp: (e, globalState) => {
		if (globalState.mouseDown === true) {
			console.log(`firing`);
			// When they let go of the click, stop movement
			globalState.mouseDown = false;
			stopMovement(globalState.playerSettings);
		}
	}
}