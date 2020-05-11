import { scaleText } from "./scaleText.js";
import { testData } from "./settings.js";

/**
 * Draws the magnet Image on the screen
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawMagnet(globalState, ctx) {
	ctx.fillStyle = "crimson";
	ctx.drawImage(
		document.getElementById("rover"), 
		globalState.playerSettings.x - (globalState.canvasWidth)/20, 
		globalState.playerSettings.y, 
		globalState.canvasWidth/7, 
		globalState.canvasHeight/7);
}

/**
 * Draws the Rocks that determine the rage of motion of the rover
 * 
 * @param {*} globalState 
 * @param {*} ctx 
 */
export function drawRocks(globalState, ctx) {
	ctx.drawImage(
		document.getElementById("rock"),
		((globalState.canvasWidth / globalState.powerSize) + globalState.canvasWidth/15) - globalState.canvasWidth/20,
		globalState.canvasHeight / 5*3.5,
		globalState.canvasWidth / 10 ,
		globalState.canvasHeight / 10);

		ctx.drawImage(
			document.getElementById("rock"),
			((globalState.canvasWidth / globalState.powerSize) * (globalState.powerSize - 1)) - globalState.canvasWidth/10 ,
			globalState.canvasHeight / 5*3.5,
			globalState.canvasWidth / 10,
			globalState.canvasHeight / 10);
}

/**
 * Function that handles beam power relative to screen space
 */
// function calculateBeamandPower (globalState) {
// 	let power = globalState.playerSettings.power
// 	// If the current beam will go further than the width of the page
// 	if (globalState.minWidth > globalState.playerSettings.x - ((globalState.canvasWidth/300) * power)) {
// 		// Then adpated power is set to, player position - 
// 		globalState.playerSettings.adaptedPower = (globalState.playerSettings.x - globalState.minWidth)/((globalState.canvasWidth/300))
// 	}
// 	else if (globalState.maxWidth < globalState.playerSettings.x + ((globalState.canvasWidth/300) * power)) {
// 		globalState.playerSettings.adaptedPower = (globalState.maxWidth - globalState.playerSettings.x)/((globalState.canvasWidth/300))
// 	}
// 	else {
// 		globalState.playerSettings.adaptedPower = 100;
// 	}
// 	if (globalState.playerSettings.adaptedPower < globalState.playerSettings.power) {
// 		power = globalState.playerSettings.adaptedPower;
// 	}
// 	// Calculate Left Width
// 	let leftWidth = globalState.playerSettings.x - ((globalState.canvasWidth/300) * power)
// 	// Calculate Right Width
// 	let rightWidth = globalState.playerSettings.x + ((globalState.canvasWidth/300) * power)
// 	// Set the global variables
// 	globalState.beamLeft = leftWidth;
// 	globalState.beamRight = rightWidth;
// 	globalState.currentPower = power;
// }

/**
 * Simplified Calculate Beam Size after rework with Rocks
 * 
 * @param {*} globalState The Global State of the Game
 */
function calculateBeamandPower(globalState) {
	globalState.beamLeft = globalState.playerSettings.x - ((globalState.canvasWidth/ (globalState.powerSize * 75)) * globalState.playerSettings.power);
	globalState.beamRight = globalState.playerSettings.x + ((globalState.canvasWidth/ (globalState.powerSize * 75)) * globalState.playerSettings.power);
	globalState.currentPower = globalState.playerSettings.power;
}

/**
 * Draws the "Magnet" beam
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawBeam(globalState, ctx) {
	ctx.beginPath();

	calculateBeamandPower(globalState);
	// Set Start Point
	ctx.moveTo(globalState.beamLeft, globalState.canvasHeight/5); // Top Left
	// Draw a straight line
	ctx.lineTo(globalState.beamRight, globalState.canvasHeight/5); // Top Right
	ctx.lineTo(globalState.beamRight, (globalState.canvasHeight/5)*2.5); // Middle Right
	
	ctx.lineTo(globalState.playerSettings.x, globalState.playerSettings.y); // Bottom
	
	ctx.lineTo(globalState.beamLeft, (globalState.canvasHeight/5)*2.5); // Middle Left
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = globalState.playerSettings.beamColor
	ctx.fill();
	ctx.globalAlpha = 1.0;
}

/**
 * Handles Rendering the Power Bar
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawPower(globalState, ctx) {
	// Draw Power box fill
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/15, -((globalState.canvasHeight/10)*5)*(globalState.currentPower/100));
	ctx.fill();
	// Draw Power box outline
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/15, -(globalState.canvasHeight/10)*5);
	ctx.lineWidth = "4";
	ctx.strokeStyle = "white";
	ctx.stroke();
	// Draw Power Text
	// ctx.rotate(270 * Math.PI/180);
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.font = "20px Comic Sans MS";
	ctx.fillText("Power", (globalState.canvasWidth/40)+(globalState.canvasWidth/15/2), (globalState.canvasHeight/10)*2-(globalState.canvasHeight/40));
	// ctx.rotate(90 * Math.PI/180);
}

/**
 * Parent function that calls all arrows to be drawn
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawArrows(globalState, ctx) {
	// Vertical Arrows
	drawVerticalArrows(globalState, ctx);
	// Horizontal Arrows
	drawHorizontalArrows(globalState, ctx);
}

/**
 * Draws the Vertical Arrows that handle power
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawVerticalArrows(globalState, ctx) {
	// Draw Up Arrow
	ctx.drawImage(document.getElementById("arrowUp"), 0, (globalState.canvasHeight/10)*8, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.upArrowArea = {
		x: 0,
		y: (globalState.canvasHeight/10)*8,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Down Arrow
	ctx.drawImage(document.getElementById("arrowDown"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*8, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.downArrowArea = {
		x: ((globalState.canvasWidth/10)*9),
		y: (globalState.canvasHeight/10)*8,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
}

/**
 * Draws the Horizontal Arrows that handle Position
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawHorizontalArrows(globalState, ctx) {
	// Draw Left Arrow
	ctx.drawImage(document.getElementById("arrowLeft"), 0, (globalState.canvasHeight/10)*9, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.leftArrowArea = {
		x: 0,
		y: (globalState.canvasHeight/10)*9,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Right Arrow
	ctx.drawImage(document.getElementById("arrowRight"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*9, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.rightArrowArea = {
		x: (globalState.canvasWidth/10)*9,
		y: (globalState.canvasHeight/10)*9,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
}

/**
 * Draws the hint image (space junk)
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawHint(globalState, ctx) {
	let sizeX = globalState.canvasWidth/10
	let sizeY = globalState.canvasHeight/10
	ctx.drawImage(
		document.getElementById("junk"), 
		globalState.hintAnimation.x - sizeX/2, 
		globalState.hintAnimation.y - sizeY/2, 
		sizeX, 
		sizeY
		);
}

/**
 * Draw the Progress Button
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawButton(globalState, ctx) {
	// Set the Progress Button area on global settings
	globalState.progressButtonArea = {
		x: globalState.canvasWidth/2 - (globalState.canvasWidth/2)/4, 
		y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
		w: globalState.canvasWidth/4, 
		h: globalState.canvasHeight/8
	}
	switch (globalState.gameState) {
		case "INTRO":
			// Draw Next Box
			// ctx.beginPath();
			// ctx.rect(
			// 	globalState.canvasWidth/2 - (globalState.canvasWidth/2)/2, 
			// 	(globalState.canvasHeight/4)*3 - (globalState.canvasHeight/4)/2, 
			// 	globalState.canvasWidth/2, 
			// 	globalState.canvasHeight/4
			// );
			// ctx.fill();
			ctx.drawImage(
				document.getElementById("start_button"), 
				globalState.progressButtonArea.x, 
				globalState.progressButtonArea.y, 
				globalState.progressButtonArea.w, 
				globalState.progressButtonArea.h
			);

			break;

		case "TUTORIAL":
			ctx.drawImage(
				document.getElementById("start_button"), 
				globalState.progressButtonArea.x, 
				globalState.progressButtonArea.y, 
				globalState.progressButtonArea.w, 
				globalState.progressButtonArea.h
			);
			
			break;
		case "GAME":
			switch (globalState.trialState) {
				case "INTRO":
					ctx.drawImage(
						document.getElementById("start_button"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

				case "TRIAL":
					ctx.drawImage(
						document.getElementById("start_button"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

				case "RESULTS":
					ctx.drawImage(
						document.getElementById("start_button"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

			}
			break;
	}
}

/**
 * Renders the background Image relative to the Canvas
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function renderBackground (globalState, ctx) {
	ctx.drawImage(document.getElementById("background"), 0, 0, globalState.canvasWidth, globalState.canvasHeight);
}

/**
 * Draws a simple "Caught" or "Missed" result
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawSimpleResult(globalState, ctx) {
	// Create the word to display
	let result = "Missed!"
	let fillStyle = "red"
	// If the Beam covers the hint
	if (globalState.hintAnimation.x > globalState.beamLeft && globalState.hintAnimation.x < globalState.beamRight) {
		result = "Caught!"
		fillStyle = "green"
	}
	// Display the text
	ctx.fillStyle = fillStyle;
	ctx.textAlign = "center";
	ctx.font = `${scaleText(40, globalState)}px Arial`;
	ctx.fillText(result, (globalState.canvasWidth/2), (globalState.canvasHeight/10)*2);
}

/**
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawCurrentScore(globalState, ctx) {
	// Display the text
	ctx.fillStyle = "green";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(20, globalState)}px Arial`;
	ctx.fillText(`Score: ${globalState.score}`, (globalState.canvasWidth/4)*1, (globalState.canvasHeight/10)*2);
}

/**
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawTotalScore(globalState, ctx) {
	// Display the text
	ctx.fillStyle = "green";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(20, globalState)}px Arial`;
	ctx.fillText(`Total Score: ${globalState.totalScore}`, (globalState.canvasWidth/4)*3, (globalState.canvasHeight/10)*2);
}