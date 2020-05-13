

// import { globalState } from "./settings.js"
import { renderBackground } from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"
import { introScreen, tutorialScreen, mainGame, gameOver } from "./renderScreen.js";
import { clearCanvas } from "./utilities.js";



export {mouseInputs, keyBoardInputs, clearCanvas}

export function runGame(globalState, ctx) {
	// Clears the Canvas (re-sets each frame)
	// clearCanvas(globalState, ctx);
	// Render the Background
	renderBackground(globalState, ctx);
	console.log(globalState.gameState)
	console.log(globalState.trialState)
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
	// cancelAnimationFrame(this)
	// requestAnimationFrame(runGame(globalState, ctx));
}


// Move all "Next" actions through to handle input progress function
// at each stage have a "button" in the same place the progresses (start for intro, ready for game)

// 


// // Runs the Game
// runGame(globalState);
