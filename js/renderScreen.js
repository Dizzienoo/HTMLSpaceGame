import { createLines, createPages } from "./text.js";
import { drawBeam, drawMagnet, drawArrows, drawHint, drawPower, drawButton, drawSimpleResult, drawCurrentScore, drawTotalScore, drawRocks, drawCountdown } from "./drawImages.js"
import { handleMovement } from "./handleMovement.js"
import { scaleText } from "./scaleText.js"


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
	// Define some Constants for the Intro
	// Get the maxWidth of the page
	let maxWidth = (globalState.canvasWidth/10)*9
	// Get the max height of the page
	let maxLines = Math.floor((globalState.canvasHeight - (globalState.canvasHeight - (globalState.canvasHeight/10)*9))/ (globalState.canvasHeight/15));
	// Set the Text Size
	let textSize = (globalState.canvasHeight/15) - ((globalState.canvasHeight/15)/2.5)
	// Define the Y state
	let y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
	// Create a function that splits text up into "Lines" based on input variables
	let lines = createLines(globalState.gameIntroduction[globalState.currentLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	globalState.introPages = createPages(lines, maxLines)
	// Set the Font and Color
	ctx.font = `${textSize}px ${globalState.textFont}`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center"
	// Draw the continue button
	drawButton(globalState, ctx);
	// Render pages, while pages space will page++ else move to next area
	let currentPage = globalState.introPages[globalState.currentPage];
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], globalState.canvasWidth/2, y);
		y += (globalState.canvasHeight/15)
	}
}

/**
 * Render the Tutorial 
 * 
 * @param {*} globalState The global state of the game
 * @param {*} ctx The canvas object of the game
 */
export function tutorialScreen(globalState, ctx) {
	// Get the maxWidth of the page
	let maxWidth = (globalState.canvasWidth/10)*9
	// Get the max height of the page
	let maxLines = Math.floor((globalState.canvasHeight - (globalState.canvasHeight - (globalState.canvasHeight/10)*9))/ (globalState.canvasHeight/15));
	// Set the Text Size
	let textSize = (globalState.canvasHeight/15) - ((globalState.canvasHeight/15)/2.5)
	// Define the Y state
	let y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
	// Create a function that splits text up into "Lines" based on input variables
	let lines = createLines(globalState.gameTutorial[globalState.currentLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	globalState.tutorialPages = createPages(lines, maxLines)
	// Render pages, while pages space will page++ else move to next area
	let currentPage = globalState.tutorialPages[globalState.currentPage];
	globalState.playerSettings.x = globalState.canvasWidth/2;
	globalState.playerSettings.y = (globalState.canvasHeight/5)*3.5
	
	drawButton(globalState, ctx);
	switch(globalState.currentLine) {
		case 0:
			drawRocks(globalState, ctx);
			// Draw the Magnet fnor the Tutorial
			drawMagnet(globalState, ctx);
		break;

		case 1:
			drawRocks(globalState, ctx);
			drawMagnet(globalState, ctx);
		break;

		case 2:
		    globalState.hintAnimation.x = globalState.canvasWidth/2
		    globalState.hintAnimation.y = globalState.canvasHeight/2
			drawHint(globalState, ctx);
		break;

		case 3:
	    	globalState.hintAnimation.x = globalState.canvasWidth/2
		    globalState.hintAnimation.y = globalState.canvasHeight/2
			drawHint(globalState, ctx);
		break;

		case 4:
			drawArrows(globalState, ctx);
		break;
		
		case 5:
			drawArrows(globalState, ctx);
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



let stop = false

function renderJunk(junkLocation, globalState, ctx) {
	// Draw the circle
	globalState.hintAnimation.x = (globalState.canvasWidth/100 * junkLocation);
	if (globalState.hintAnimation.y > (globalState.canvasHeight/5)*4) {
		globalState.hintAnimation.y = (globalState.canvasHeight/5)*4
		stop = true
	} 
	if (!stop) {
		globalState.hintAnimation.y += globalState.hintAnimation.dy;
	}
	drawHint(globalState, ctx);
}

function renderReadyScreenAndHint(hint, globalState, ctx) {
	// Draw Start Button
	drawButton(globalState, ctx);
	// Draw the Hint
	renderJunk(hint, globalState, ctx);

}


function renderLevelIntro(globalState, ctx) {
    	// Display the text
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = `${scaleText(40, globalState)}px Arial`;
	ctx.fillText(globalState.trialIntros[Number(globalState.level)], (globalState.canvasWidth/2), (globalState.canvasHeight/10)*2);
}

function renderLevelComplete(globalState, ctx) {
	// Set the Size and Font of the Text
	ctx.font = `${scaleText(40, globalState)}px ${globalState.textFont}`;
	// Set the Text Color
	ctx.fillStyle = "white";
	// Center the Text
	ctx.textAlign = "center";
	// Draw the "Level X Complete" Text
	ctx.fillText(`Level ${globalState.level.toString()} Complete`, (globalState.canvasWidth)/2, globalState.canvasHeight/4);
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
	        renderLevelIntro(globalState, ctx)
	        
	        break;
	        
		case "HINT": 
			renderReadyScreenAndHint(globalState.testData[i].hint, globalState, ctx);

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
			// Handle Moving the lander
			handleMovement(globalState);
			break;
		
		case "RESULTS":
			// Draw the junks final location
			renderJunk(globalState.testData[i].result, globalState, ctx);
			// Draw the Magnet
			drawMagnet(globalState, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(globalState, ctx);
			// Draw Simple Result
			drawSimpleResult(globalState, ctx);
			// Draw their Current Score
			drawCurrentScore(globalState, ctx);
			// Draw their Total Score
			drawTotalScore(globalState, ctx);
			
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