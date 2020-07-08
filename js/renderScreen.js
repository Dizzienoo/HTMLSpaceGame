import { createLines, createPages, fitToPages } from "./text.js";
import { drawBeam, drawMagnet, drawArrows, drawSatellite, drawPower, drawButton, drawSimpleResult, drawCurrentScore, drawTotalScore, drawRocks, drawCountdown, drawTrialHint, drawBackButton, drawScanners, drawScanBeams, calculateRockPos, displayTotalScore } from "./drawImages.js"
import { handleMovement } from "./handleMovement.js"
import { scaleText } from "./scaleText.js"
import { resetPlayer } from "./resetPlayer.js";


// Boolean to stop the Press being continuously registered
let firstPress = true

/**
 * Renders the Introduction screen by splitting the 
 * text into screen fittable sections
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function introScreen(globalState, ctx) {
	// Fit the text to the pages
	const {builtPages, textSize} = fitToPages(20, globalState.gameIntroduction, globalState, ctx);
	// Assign the pages to the global state for handle input
	globalState.introPages = builtPages;
	// Set the Font and Color
	ctx.font = `${textSize}px ${globalState.textFont}`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center"
	// Draw the continue button
	drawButton(globalState, ctx);
	// Draw the back button
	drawBackButton(globalState, ctx);
	// Define the Y state
	let y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
	// Render pages, while pages space will page++ else move to next area
	let currentPage = builtPages[globalState.currentPage];
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], globalState.canvasWidth/2, y);
		y += (globalState.canvasHeight/15)
	}
}

let hintOnce=false;

/**
 * Render the Tutorial 
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function tutorialScreen(globalState, ctx) {
	// Define the Y state
	let y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
	const {builtPages, textSize} = fitToPages(20, globalState.gameTutorial, globalState, ctx);
	// Assign the pages to the global state for handle input
	globalState.tutorialPages = builtPages;
	// Render pages, while pages space will page++ else move to next area
	let currentPage = builtPages[globalState.currentPage];
	// Draw the Continue Button
	drawButton(globalState, ctx);
	// Draw the back button
	drawBackButton(globalState, ctx);
	// Calculate the position of the Rocks for later funcs
	switch(globalState.currentLine) {
		case 0:
			drawRocks(globalState, ctx);
			// Draw the Magnet for the Tutorial
			drawMagnet(globalState, ctx);
		break;

		case 1:
			drawRocks(globalState, ctx);
			drawMagnet(globalState, ctx);
		break;

		case 2:
			renderJunk(50, globalState, ctx);
			// drawScanners(globalState, ctx);
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
		break;

		case 3:
			if (globalState.hintAnimation.y === ((globalState.canvasHeight/5)*2.25) && !hintOnce) {
				globalState.hintAnimation.y = 0;
				hintOnce = true;
			}
			renderJunk(50,globalState, ctx, true);
			// drawScanners(globalState, ctx);
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
		break;

		case 4:
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw the Arrows
			drawArrows(globalState, ctx);
			// Handle Moving the lander
			handleMovement(globalState);
		break;
		
		case 5:
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw the Arrows
			drawArrows(globalState, ctx);
			// Handle Moving the lander
			handleMovement(globalState);
	    break;
		    
	}
	// Set the Font and Color
	ctx.font = `${textSize}px ${globalState.textFont}`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center"
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], globalState.canvasWidth/2, y);
		y += (globalState.canvasHeight/15)
	}
}


/**
 * Show the Junk (satellite) on the Screen
 * 
 * @param {*} junkLocation The location of the satellite on the screen
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object
 * @param {boolean} hint Is this run showing the satelite as a hint or result (default as result)
 */
function renderJunk(junkLocation, globalState, ctx, hint= false) {
	// Set the hint to fall within the rocks
	// Find the padding between edge and rock left
	let paddingL = globalState.rockArea.leftX + globalState.rockArea.w;
	// Find the padding between rock right and far edge
	let paddingR = globalState.canvasWidth - globalState.rockArea.rightX;
	// Calculate the hint pos by
	//		finding active area (canvas width - l and r paddings)
	let activeArea = globalState.canvasWidth - (paddingL + paddingR); 
	// 		dividing active area by 100 and multiplying by junk location (then adding left padding on)
	let adjustedHint = ((activeArea / 100) * junkLocation) + paddingL;
	// Set the Hint animation Location
	globalState.hintAnimation.x = adjustedHint;
	if (globalState.hintAnimation.y >= (globalState.canvasHeight/5)*2.25) {
		globalState.hintAnimation.y = (globalState.canvasHeight/5)*2.25
		drawSatellite(globalState, ctx, hint);
	} 
	else {
		globalState.hintAnimation.y += globalState.hintAnimation.dy;
		drawSatellite(globalState, ctx, hint);
	}
}

function renderReadyScreenAndHint(hint, globalState, ctx) {
	// Draw the Trial Number
	drawTrialHint(globalState, ctx);
	// Draw the Hint
	renderJunk(hint, globalState, ctx, true);

	// drawScanners(globalState, ctx);
	// drawScanBeams(globalState, ctx);
}


function renderLevelIntro(globalState, ctx) {
	// Define the Y state
	let y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
	const {builtPages, textSize} = fitToPages(20, [globalState.trialIntros[Number(globalState.level -1)]], globalState, ctx);
	// Assign the pages to the global state for handle input
	globalState.levelPages = builtPages;
	// Display the text
	let currentPage = builtPages[globalState.currentPage];
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(20, globalState)}px ${globalState.textFont}`;
	// Render the new pages
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], globalState.canvasWidth/2, y);
		y += (globalState.canvasHeight/15)
	}
}

function renderLevelComplete(globalState, ctx) {
	// Set the Size and Font of the Text
	ctx.font = `${scaleText(40, globalState)}px ${globalState.textFont}`;
	// Set the Text Color
	ctx.fillStyle = "white";
	// Center the Text
	ctx.textAlign = "center";
	// Draw the "Level X Complete" Text
	if (globalState.level === 1) {
		ctx.fillText(`Practice Round Complete`, (globalState.canvasWidth)/2, globalState.canvasHeight/4);
	}
	else {
		ctx.fillText(`Level ${(globalState.level -1).toString()} Complete`, (globalState.canvasWidth)/2, globalState.canvasHeight/4);
	}
	ctx.fillText(`Total Score: ${globalState.totalScore}`, (globalState.canvasWidth)/2, (globalState.canvasHeight/4)*2);
	ctx.fillText(`Your Highest Score: ${globalState.highestScore}`, (globalState.canvasWidth)/2, (globalState.canvasHeight/4)*3);    
}

/**
 * Renders the Main Trials of the Game
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function mainGame(globalState, ctx) {
	let i = globalState.trial;
	drawButton(globalState, ctx);
	switch(globalState.trialState) {
    case "INTRO":
			// Show the introduction to the level of trials
      renderLevelIntro(globalState, ctx)
      
      break;
	        
		case "HINT": 
			renderReadyScreenAndHint(globalState.testData[i].hint, globalState, ctx);
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			break;

		case "TRIAL":
			drawCountdown(globalState, ctx);
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw the Arrows
			drawArrows(globalState, ctx);
			// Draw the Power Bar
			drawPower(globalState, ctx);
			// Draw a reminder of their current total score
			displayTotalScore(globalState, ctx);		
			// Handle Moving the lander
			handleMovement(globalState);
			// drawScanners(globalState, ctx);
			break;
		
		case "RESULTS":
			// Draw the junks final location
			renderJunk(globalState.testData[i].result, globalState, ctx);
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Edge Rocks
			drawRocks(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw Simple Result
			drawSimpleResult(globalState, ctx);
			// Draw their Current Score
			drawCurrentScore(globalState, ctx);
			// Draw their Total Score
			displayTotalScore(globalState, ctx);
			// drawScanners(globalState, ctx);
			break;
			
    case "LEVEL_COMPLETE":
      // Show the level complete info
      renderLevelComplete(globalState, ctx);
      break;
	}
}

/**
 * Render the Game Over screen
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function gameOver(globalState, ctx) {
	// Set the Size and Font of the Text
	ctx.font = `${scaleText(40, globalState)}px ${globalState.textFont}`;
	// Set the Text Color
	ctx.fillStyle = "white";
	// Center the Text
	ctx.textAlign = "center";
	// Draw the "Game Over" Text
	ctx.fillText("Game Over", (globalState.canvasWidth)/2, globalState.canvasHeight/4);
	ctx.fillText(`Total Score: ${globalState.totalScore}`, (globalState.canvasWidth)/2, (globalState.canvasHeight/4)*2);
	ctx.fillText(`Your Highest Score: ${globalState.highestScore}`, (globalState.canvasWidth)/2, (globalState.canvasHeight/4)*3);
}

/**
 * Render the please return to Landscape message
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function portraitProtection(globalState, ctx) {
	// Set the Size and Font of the Text
	ctx.font = `${scaleText(40, globalState)}px ${globalState.textFont}`;
	// Set the Text Color
	ctx.fillStyle = "red";
	// Center the Text
	ctx.textAlign = "center";
	// Draw the "Game Over" Text
	ctx.fillText("Please set your ", (globalState.canvasWidth)/2, globalState.canvasHeight/4);
	ctx.fillText("device to landscape", (globalState.canvasWidth)/2, (globalState.canvasHeight/8)*3);
}