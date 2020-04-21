// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

import { globalState } from "./settings.js"
import { renderBackground } from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"
import { introScreen, tutorialScreen, mainGame, gameOver } from "./renderScreen.js";


canvas.width = window.innerWidth
canvas.height = window.innerHeight
globalState.canvasWidth = window.innerWidth
globalState.canvasHeight = window.innerHeight
globalState.rect = canvas.getBoundingClientRect();

document.addEventListener("mousedown", (e) => {mouseInputs.mouseDown(e, globalState)});
document.addEventListener("mouseup", (e) => {mouseInputs.mouseUp(e, globalState)});
document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, globalState)});
document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, globalState)});

/**
 * Clears the Canvas for Re-animation
 */
function clearCanvas() {
	ctx.clearRect(0, 0, globalState.canvasWidth, globalState.canvasHeight);
}

function runGame() {
	// Clears the Canvas (re-sets each frame)
	clearCanvas();
	// Render the Background
	renderBackground(globalState, ctx);
	switch(globalState.gameState) {
		case "INTRO":
			introScreen(globalState, ctx);
		break;

		case "TUTORIAL":
			tutorialScreen(globalState, ctx);
		break;

		case "GAME":
			mainGame(globalState, ctx);
		break;

		case "GAME_OVER":
			gameOver(globalState, ctx);
		break;

	}
	requestAnimationFrame(runGame);
}


// Move all "Next" actions through to handle input progress function
// at each stage have a "button" in the same place the progresses (start for intro, ready for game)
// add in timer for 1 second so ready cant be hit at start of trial by accident
// 


// Runs the Game
runGame();
