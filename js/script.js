// import { globalState } from "./settings.js"
import { renderBackground } from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"
import { introScreen, tutorialScreen, mainGame, gameOver } from "./renderScreen.js";
import { clearCanvas } from "./utilities.js";

export {mouseInputs, keyBoardInputs, clearCanvas}

export function runGame(globalState, ctx) {
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
}