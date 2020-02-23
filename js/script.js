// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

import {initialSettings, testData, globalState, gameIntroduction} from "./settings.js"
import {handleMovement} from "./handleMovement.js"
import {drawBeam, drawMagnet, renderBackground, drawArrows, drawHint} from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"
import { wrapText } from "./wrapText.js";


canvas.width = screen.width
canvas.height = screen.height
globalState.canvasWidth = screen.width
globalState.canvasHeight = screen.height


/**
 * Clears the Canvas for Re-animation
 */
function clearCanvas() {
	ctx.clearRect(0,0,globalState.canvasWidth, globalState.canvasHeight);
}


export function resetPlayer() {
	settings = Object.assign({}, initialSettings);
}






function levelAlert (number) {
	
}

function calculatePoints () {

}

function updateTally () {
	
}


function runGame() {
	// Update the Settings
	globalState.canvasHeight = canvas.height;
	globalState.playerSettings.y = (canvas.height/5)*3.25
	// Clears the Canvas (re-sets each frame)
	clearCanvas();
	// Render the Background
	renderBackground(globalState, ctx);
	switch(globalState.gameState) {
		case "INTRO":
			introScreen(globalState, ctx);
		break;

		case "GAME":
			mainGame(globalState, ctx);
		break;

	}
	// if (globalState.playerSettings.level < 10) {
	// 	//Runs the Main Game
	// }
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




function introScreen(globalState, ctx) {
	document.addEventListener("keyup", (e) => {if (e.key === " ") {globalState.gameState = "GAME"}})
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	wrapText(
		ctx,
		gameIntroduction,
		10,
		globalState.canvasHeight - (globalState.canvasHeight/10)*9,
		globalState.canvasWidth,
		globalState.canvasHeight/15,
		"Arial",
		"white"
	);
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
		break;

		case "TRIAL": 
			document.addEventListener("mousedown", mouseInputs.mouseDown);
			document.addEventListener("mouseup", mouseInputs.mouseUp);
			document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, globalState)});
			document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, globalState)});
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw the Arrows
			drawArrows(globalState, ctx);
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
			console.warn("GAME_OVER");
			break;
	}
// }
}

// Runs the Game
runGame();



