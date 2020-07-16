import { scaleText } from "./scaleText.js";

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
		globalState.canvasWidth/12, 
		globalState.canvasHeight/6);
}

/**
 * Calculate the Positions the rocks will be on the screen
 */
export function calculateRockPos(globalState) {
	globalState.rockArea = {
		leftX: ((globalState.canvasWidth / globalState.powerSize) + globalState.canvasWidth/10) - globalState.canvasWidth/20,
		rightX: ((globalState.canvasWidth / globalState.powerSize) * (globalState.powerSize - 1.5)) - globalState.canvasWidth/10 ,
		y: globalState.canvasHeight / 5*3.6,
		w: globalState.canvasWidth / 10,
		h: globalState.canvasHeight / 10,
	}
	globalState.rockSet = true;
}

/**
 * Draws the Rocks that determine the rage of motion of the rover
 * 
 * @param {*} globalState 
 * @param {*} ctx 
 */
export function drawRocks(globalState, ctx) {
	if (!globalState.rockSet) {
		calculateRockPos(globalState);
	}
	// Draw the Rocks
	ctx.drawImage(
		document.getElementById("rockLeft"), 
		globalState.rockArea.leftX - globalState.rockArea.w/10, 
		globalState.rockArea.y, 
		globalState.rockArea.w, 
		globalState.rockArea.h
	);
	ctx.drawImage(
		document.getElementById("rockRight"), 
		globalState.rockArea.rightX - globalState.rockArea.w/15, 
		globalState.rockArea.y, 
		globalState.rockArea.w, 
		globalState.rockArea.h
	);
}

export function drawScanners(globalState, ctx) {
	globalState.scannerArea = {
		leftX: ((globalState.canvasWidth / globalState.powerSize) + globalState.canvasWidth/40) - globalState.canvasWidth/20,
		rightX: ((globalState.canvasWidth / globalState.powerSize) * (globalState.powerSize - 1)) - globalState.canvasWidth/20 ,
		y: globalState.canvasHeight / 5*2.55,
		w: globalState.canvasWidth / 10,
		h: globalState.canvasHeight / 5,
	}
	// Draw the Scanners
	ctx.drawImage(
		document.getElementById("scannerLeft"), 
		globalState.scannerArea.leftX, 
		globalState.scannerArea.y, 
		globalState.scannerArea.w, 
		globalState.scannerArea.h
	);
	ctx.drawImage(
		document.getElementById("scannerRight"), 
		globalState.scannerArea.rightX, 
		globalState.scannerArea.y, 
		globalState.scannerArea.w, 
		globalState.scannerArea.h
	);
}

export function drawScanBeams(globalState, ctx) {
	// Set Start Point
	ctx.moveTo(globalState.scannerArea.leftX + globalState.scannerArea.w, globalState.scannerArea.y); // Scanner Start
	// Draw a straight line
	ctx.lineTo(globalState.scannerArea.leftX + ((globalState.scannerArea.w /10)*9) + globalState.canvasWidth/10, 0); // Top Left
	ctx.lineTo(globalState.canvasWidth/2, 0); // Middle Top
	
	ctx.lineTo(globalState.canvasWidth/2, globalState.scannerArea.y); // Bottom Middel
	
	// ctx.lineTo(globalState.beamLeft, (globalState.canvasHeight/5)*2.5); // Middle Left
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = globalState.playerSettings.beamColor
	ctx.closePath();
	ctx.fill();
	ctx.globalAlpha = 1.0;

	// Set Start Point
	ctx.moveTo(globalState.scannerArea.rightX, globalState.scannerArea.y); // Scanner Start
	// Draw a straight line
	ctx.lineTo(globalState.scannerArea.rightX - globalState.canvasWidth/10, 0); // Top Left
	ctx.lineTo(globalState.canvasWidth/2, 0); // Middle Top

	ctx.lineTo(globalState.canvasWidth/2, globalState.scannerArea.y); // Bottom Middel

	ctx.globalAlpha = 0.2;
	ctx.fillStyle = globalState.playerSettings.beamColor
	ctx.closePath();
	ctx.fill();
	ctx.globalAlpha = 1.0;
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
 * Writes the current trial number on the screen so players know they are progressing
 * 
 * @param {object} globalState The global state of the game
 * @param {object} ctx The canvas object of the game
 */
export function drawTrialHint(globalState, ctx) {
	// Write out the level number
	// Display the text
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	if (globalState.level === 1) {
		ctx.fillText(`Practice Round`, globalState.canvasWidth/2, (globalState.canvasHeight/10)*2);
	}
	else {
		ctx.fillText(`Level ${(globalState.level -1).toString()}`, globalState.canvasWidth/2, (globalState.canvasHeight/10)*2);
	}
}

/**
 * Simplified Calculate Beam Size after rework with Rocks
 * 
 * @param {object} globalState The Global State of the Game
 */
function calculateBeamandPower(globalState) {
	globalState.beamLeft = globalState.playerSettings.x - ((globalState.canvasWidth/ (globalState.powerSize * 65)) * globalState.playerSettings.power);
	globalState.beamRight = globalState.playerSettings.x + ((globalState.canvasWidth/ (globalState.powerSize * 65)) * globalState.playerSettings.power);
	globalState.currentPower = globalState.playerSettings.power;
}

/**
 * Draws the "Magnet" beam
 * 
 * @param {object} globalState The global state of the game
 * @param {object} ctx The canvas object of the game
 */
export function drawBeam(globalState, ctx) {
	ctx.beginPath();

	calculateBeamandPower(globalState);
	// Set Start Point
	ctx.moveTo(globalState.beamLeft, (globalState.canvasHeight/10)*2); // Top Left
	// Draw a straight line
	ctx.lineTo(globalState.beamRight, (globalState.canvasHeight/10)*2); // Top Right
	ctx.lineTo(globalState.beamRight, (globalState.canvasHeight/5)*2.5); // Middle Right
	
	ctx.lineTo(globalState.playerSettings.x, globalState.playerSettings.y); // Bottom
	
	ctx.lineTo(globalState.beamLeft, (globalState.canvasHeight/5)*2.5); // Middle Left
	ctx.globalAlpha = 0.45;
	ctx.fillStyle = globalState.playerSettings.beamColor
	ctx.closePath();
	ctx.fill();
	ctx.globalAlpha = 1.0;
}

/**
 * Handles Rendering the Power Bar
 * 
 * @param {object} globalState The global state of the game
 * @param {object} ctx The canvas object of the game
 */
export function drawPower(globalState, ctx) {
	// Draw Power box fill
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/20, -((globalState.canvasHeight/10)*5)*(globalState.currentPower/100));
	ctx.fill();
	// Draw Power box outline
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/20, -(globalState.canvasHeight/10)*5);
	ctx.lineWidth = "4";
	ctx.strokeStyle = "white";
	ctx.stroke();
	// Draw Power Text
	// ctx.rotate(270 * Math.PI/180);
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.font = `20px ${globalState.textFont}`;
	ctx.fillText("Power", (globalState.canvasWidth/40)+(globalState.canvasWidth/15/2), (globalState.canvasHeight/10)*2-(globalState.canvasHeight/40));
	// ctx.rotate(90 * Math.PI/180);
}

/**
 * Draws a countdown timer of time left in the trial
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawCountdown(globalState, ctx) {
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	ctx.fillText(`Time Left: ${globalState.trialTimeLeft}`, globalState.canvasWidth/2, (globalState.canvasHeight/10)*2-(globalState.canvasHeight/40));
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
	// Set it's area for a button
	globalState.upArrowArea = {
		x: 0,
		y: (globalState.canvasHeight/10)*7.3,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Up Arrow
	ctx.drawImage(document.getElementById("arrowUp"), 0, (globalState.canvasHeight/10)*7.3, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.downArrowArea = {
		x: ((globalState.canvasWidth/10)*9),
		y: (globalState.canvasHeight/10)*7.3,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Down Arrow
	ctx.drawImage(document.getElementById("arrowDown"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*7.3, globalState.canvasWidth/10, globalState.canvasHeight/10);
}

/**
 * Draws the Horizontal Arrows that handle Position
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawHorizontalArrows(globalState, ctx) {
	// Set it's area for a button
	globalState.leftArrowArea = {
		x: 0,
		y: (globalState.canvasHeight/10)*8.3,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Left Arrow
	ctx.drawImage(document.getElementById("arrowLeft"), 0, (globalState.canvasHeight/10)*8.3, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Set it's area for a button
	globalState.rightArrowArea = {
		x: (globalState.canvasWidth/10)*9,
		y: (globalState.canvasHeight/10)*8.3,
		w: globalState.canvasWidth/10,
		h: globalState.canvasHeight/10
	}
	// Draw Right Arrow
	ctx.drawImage(document.getElementById("arrowRight"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*8.3, globalState.canvasWidth/10, globalState.canvasHeight/10);
}

/**
 * Draws the hint image (space junk)
 * 
 * @param {object} globalState The global state of the game
 * @param {object} ctx The canvas object of the game
 * @param {boolean} hint Is the satellite a hint? Default no
 */
export function drawSatellite(globalState, ctx, hint = false) {
	// Set the Size of the Satellite
	let sizeX = globalState.canvasWidth/10
	let sizeY = globalState.canvasHeight/10
	// If we are hinting
	if (hint === true) {
		// Save the Current Canvas Settings
		ctx.save();
		ctx.globalAlpha = 0.45;
	}
	ctx.drawImage(
		document.getElementById((hint)?`greenJunk${globalState.junkNumber}`: `junk${globalState.junkNumber}`), 
		globalState.hintAnimation.x - sizeX/2, 
		globalState.hintAnimation.y - sizeY/2, 
		sizeX, 
		sizeY
		);
	if (hint === true) {
		ctx.restore();
	}
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
		x: (globalState.canvasWidth/2) - (globalState.canvasWidth/2)/5, 
		y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
		w: globalState.canvasWidth/5, 
		h: globalState.canvasHeight/8
	}
	switch (globalState.gameState) {
		case "INTRO":
			if (globalState.currentPage !== 0) {
				globalState.progressButtonArea = {
					x: (globalState.canvasWidth/8)*5 - (globalState.canvasWidth/2)/4, 
					y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
					w: globalState.canvasWidth/5, 
					h: globalState.canvasHeight/8
				}
			}
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
				document.getElementById("continueButton"), 
				globalState.progressButtonArea.x, 
				globalState.progressButtonArea.y, 
				globalState.progressButtonArea.w, 
				globalState.progressButtonArea.h
			);

			break;

		case "TUTORIAL":
			// Set the Progress button
			globalState.progressButtonArea = {
				x: (globalState.canvasWidth/8)*5 - (globalState.canvasWidth/2)/4, 
				y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
				w: globalState.canvasWidth/5, 
				h: globalState.canvasHeight/8
			}
			ctx.drawImage(
				document.getElementById("continueButton"), 
				globalState.progressButtonArea.x, 
				globalState.progressButtonArea.y, 
				globalState.progressButtonArea.w, 
				globalState.progressButtonArea.h
			);
			
			break;
		case "GAME":
			globalState.progressButtonArea = {
				x: (globalState.canvasWidth/2) - (globalState.canvasWidth/2)/5, 
				y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
				w: globalState.canvasWidth/5, 
				h: globalState.canvasHeight/8
			}
			switch (globalState.trialState) {
				case "INTRO":
					ctx.drawImage(
						document.getElementById("nextButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

				case "REDO_TUTORIAL":
					globalState.progressButtonArea = {
						x: (globalState.canvasWidth/8)*5 - (globalState.canvasWidth/2)/4, 
						y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
						w: globalState.canvasWidth/5, 
						h: globalState.canvasHeight/8
					}
					ctx.drawImage(
						document.getElementById("nextButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
				break;

				case "RETURN":
					globalState.progressButtonArea = {
						x: (globalState.canvasWidth/8)*5 - (globalState.canvasWidth/2)/4, 
						y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
						w: globalState.canvasWidth/5, 
						h: globalState.canvasHeight/8
					}
					ctx.drawImage(
						document.getElementById("nextButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
				break;

				case "HINT":
					ctx.drawImage(
						document.getElementById("startButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;
				
				case "TRIAL":
					ctx.drawImage(
						document.getElementById("startButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

				case "RESULTS":
					ctx.drawImage(
						document.getElementById("nextButton"), 
						globalState.progressButtonArea.x, 
						globalState.progressButtonArea.y, 
						globalState.progressButtonArea.w, 
						globalState.progressButtonArea.h
					);
					break;

				case "LEVEL_COMPLETE":
					ctx.drawImage(
						document.getElementById("continueButton"), 
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
 * Draw the Back Button
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function drawBackButton(globalState, ctx) {
	globalState.backButtonArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	}
	// Set the Back Button area on global settings
	switch (globalState.gameState) {
		case "INTRO":
			if (globalState.currentPage !== 0) {
				globalState.backButtonArea = {
					x: (globalState.canvasWidth/8)*4 - (globalState.canvasWidth/2)/4,
					y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
					w: globalState.canvasWidth/8, 
					h: globalState.canvasHeight/8
				}
				ctx.drawImage(
					document.getElementById("backButton"), 
					globalState.backButtonArea.x, 
					globalState.backButtonArea.y, 
					globalState.backButtonArea.w, 
					globalState.backButtonArea.h
					);
			}
			break;

		case "TUTORIAL":
			globalState.backButtonArea = {
				x: (globalState.canvasWidth/8)*4 - (globalState.canvasWidth/2)/4,
				y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
				w: globalState.canvasWidth/8, 
				h: globalState.canvasHeight/8
			}
			ctx.drawImage(
				document.getElementById("backButton"), 
				globalState.backButtonArea.x, 
				globalState.backButtonArea.y, 
				globalState.backButtonArea.w, 
				globalState.backButtonArea.h
			);
			break;

		case "GAME":
			if (globalState.trialState === "REDO_TUTORIAL" || globalState.trialState === "RETURN") {
				globalState.backButtonArea = {
					x: (globalState.canvasWidth/8)*4 - (globalState.canvasWidth/2)/4,
					y: (globalState.canvasHeight/8)*7 - (globalState.canvasHeight/4)/4, 
					w: globalState.canvasWidth/8, 
					h: globalState.canvasHeight/8
				}
				ctx.drawImage(
					document.getElementById("backButton"), 
					globalState.backButtonArea.x, 
					globalState.backButtonArea.y, 
					globalState.backButtonArea.w, 
					globalState.backButtonArea.h
				);
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
		ctx.drawImage(document.getElementById(`background_level${globalState.level}`), 0, 0, globalState.canvasWidth, globalState.canvasHeight);
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
	if (globalState.trialResults.success) {
		result = "Caught!"
		fillStyle = "green"
	}
	if (globalState.trialTimeLeft <= 0) {
		result = "Timed Out!"
		fillStyle = "red"
	}
	// Display the text
	ctx.fillStyle = fillStyle;
	ctx.textAlign = "center";
	ctx.font = `${scaleText(40, globalState)}px ${globalState.textFont}`;
	ctx.fillText(result, (globalState.canvasWidth/2), (globalState.canvasHeight/10)*1.5);
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
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	ctx.fillText(`Score: ${globalState.trialResults.score}`, (globalState.canvasWidth/2), (globalState.canvasHeight/10)*2);
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
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	ctx.fillText(`Total Score: ${globalState.totalScore}`, (globalState.canvasWidth/4)*3, (globalState.canvasHeight/10)*2);
}

/**
 * Shows the total score at the top right of the screen during roung
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function displayTotalScore(globalState, ctx) {
	// Display the text
	ctx.fillStyle = "green";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	ctx.fillText(`Total Score: ${globalState.totalScore}`, (globalState.canvasWidth/10)*8.5, (globalState.canvasHeight/10));
}