// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

import {testData, globalState, gameIntroduction} from "./settings.js"
import {handleMovement} from "./handleMovement.js"
import {drawBeam, drawMagnet, renderBackground, drawArrows, drawHint, drawPower} from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"
import { introScreen, tutorialScreen, gameOver } from "./renderScreen.js";


canvas.width = window.innerWidth
canvas.height = window.innerHeight
globalState.canvasWidth = window.innerWidth
globalState.canvasHeight = window.innerHeight

/**
 * Clears the Canvas for Re-animation
 */
function clearCanvas() {
	ctx.clearRect(0, 0, globalState.canvasWidth, globalState.canvasHeight);
}

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
	globalState.playerSettings.y = (globalState.canvasHeight/5)*3.5;
	globalState.playerSettings.speed = 5;
	globalState.playerSettings.dx = 0;
	globalState.playerSettings.dy = 0;
	globalState.playerSettings.powerSpeed = 2;
	globalState.playerSettings.power = 50;
	globalState.playerSettings.beamColor = "green";
	globalState.rect = canvas.getBoundingClientRect();
}


function levelAlert (number) {
	
}

function calculatePoints () {

}

function updateTally () {
	
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


function renderReadyScreenAndHint(hint) {
	// Draw Start Button
	ctx.drawImage(
		document.getElementById("start_button"), 
		globalState.canvasWidth/2 - (globalState.canvasWidth/2)/2, 
		(globalState.canvasHeight/4)*3 - (globalState.canvasHeight/4)/2, 
		globalState.canvasWidth/2, 
		globalState.canvasHeight/4
	);
	// Draw the Hint
	renderHint(hint);
}

let stop = false

function renderHint(hintLocation) {
	// Draw the circle
	globalState.hintAnimation.x = (globalState.canvasWidth/100 * hintLocation);
	if (globalState.hintAnimation.y < (globalState.canvasHeight/5)*2.5 && globalState.hintAnimation.y > (globalState.canvasHeight/10) && stop === false) {
		globalState.hintAnimation.x += globalState.hintAnimation.dx;
		globalState.hintAnimation.y += globalState.hintAnimation.dy;
		drawHint(globalState, ctx);
	}
	else {
		stop = true;
		globalState.hintAnimation.y = (globalState.canvasHeight/5)*2;
		drawHint(globalState, ctx);
	}
}




function mainGame(globalState, ctx) {
	let i = globalState.trial;
	switch(globalState.trialState) {
		case "INTRO": 
			renderReadyScreenAndHint(testData[i].hint);
			document.addEventListener("keyup", (e) => {
				if (e.key === " ") {
					globalState.trialState = "TRIAL"}
			});
			// Reset the Settings
			resetPlayer(globalState);
		break;

		case "TRIAL": 
		document.addEventListener("mousedown", (e) => {mouseInputs.mouseDown(e, globalState)});
		// document.addEventListener("mouseup", (e) => {mouseInputs.mouseUp(e, globalState)});
		document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, globalState)});
		document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, globalState)});
		// Draw the Magnet
		drawMagnet(globalState, ctx);
		// Draw the Beam coming from the Magnet
		drawBeam(globalState, ctx);
		// Draw the Arrows
		drawArrows(globalState, ctx);
		// Draw the Power Bar
		drawPower(globalState, ctx);
		
		// Handle Moving the lander
		handleMovement(globalState);
		break;

		case "FINISHED":
			globalState.trial ++;
			if(globalState.trial < testData.length) {
				globalState.trialState = "INTRO";
			}
			else {
				globalState.trialState = "GAME_OVER"
			}
		break;

		case "GAME_OVER":
			globalState.gameState = "GAME_OVER";
			break;
	}
// }
}

// Runs the Game
runGame();



