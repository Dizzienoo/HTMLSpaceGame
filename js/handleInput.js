import { movers } from "./handleMovement.js"
import { gameIntroduction, gameTutorial, testData } from "./settings.js"
import { resetPlayer } from "./resetPlayer.js";

export const keyBoardInputs = {
	keyDown: (e, globalState) => {
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
				Progress(globalState)
			} 
	}	
}

function stopMovement(settings) {
	settings.dx = 0;
	settings.dy = 0;
}

export const mouseInputs = {
	mouseDown: (e, globalState) => {
		globalState.mouseDown = true;
		let X = e.clientX - globalState.rect.left;
		let Y = e.clientY - globalState.rect.top;
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.progressButtonArea.x && X < (globalState.progressButtonArea.w + globalState.progressButtonArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.progressButtonArea.y && Y < (globalState.progressButtonArea.h + globalState.progressButtonArea.y)
		) {
			Progress(globalState);
		}
		if (globalState.gameState === "GAME" && globalState.trialState === "TRIAL") {

			// If the click is within the Up Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.upArrowArea.x && X < (globalState.upArrowArea.w + globalState.upArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.upArrowArea.y && Y < (globalState.upArrowArea.h + globalState.upArrowArea.y)
			) {
				// Increase Power
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
				// Decrease Power
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
				// Move Left
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
				// Move Right
				movers.moveRight(globalState.playerSettings);
			}
		}
	},
	mouseUp: (e, globalState) => {
		if (globalState.mouseDown === true) {
			globalState.mouseDown = false;
			stopMovement(globalState.playerSettings);
		}
	}
}

let firstPress = true;

function Progress(globalState) {
	console.log("PROGRESS")
	switch(globalState.gameState) {
		case "INTRO":
			firstPress = false;
			if (globalState.currentPage < globalState.introPages.length -1) {
				globalState.currentPage++;
				y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9);
			}
			else if (globalState.currentLine < gameIntroduction.length -1) {
				globalState.currentLine++
			}
			else {
				globalState.currentPage = 0;
				globalState.currentLine = 0;
				globalState.gameState = "TUTORIAL";
	
			}
			break;
			
		case "TUTORIAL": 
			firstPress = false;
			if (globalState.currentPage < globalState.tutorialPages.length -1) {
				globalState.currentPage++
				y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
			}
			else if (globalState.currentLine < gameTutorial.length -1) {
				globalState.currentLine++
			}
			else {
				globalState.currentPage = 0;
				globalState.currentLine = 0;
				globalState.gameState = "GAME";

			}
			break;

		case "GAME":
			switch(globalState.trialState) {
				case "INTRO": 
					globalState.trialState = "TRIAL"
					// Reset the Player (mainly for the Reset the Hint y position)
					resetPlayer(globalState);

					setTimeout(() => {Progress(globalState)}, globalState.trialTime)
					break;

				case "TRIAL":
					globalState.trialState = "RESULTS"
					break;
					
				case "RESULTS":
					console.log("RESULTS")
					globalState.trial ++;
					if(globalState.trial < testData.length) {
						globalState.trialState = "INTRO";
						// Reset the Player
						// DEBUG: If scores and positions are failing it is probably this reset
						resetPlayer(globalState);
					}
					else {
						globalState.trialState = "GAME_OVER"
					}
					break;

				case "GAME_OVER":
					globalState.gameState = "GAME_OVER";

				break;
			}

		case "GAME_OVER":

			break;

		default:
			globalState.gameState = "INTRO"
			break;
	}
}