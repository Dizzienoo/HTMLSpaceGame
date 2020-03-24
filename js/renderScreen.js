import { createLines, createPages } from "./text.js";
import { gameIntroduction, gameTutorial } from "./settings.js";
import { drawMagnet, drawArrows, drawHint } from "./drawImages.js";

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
	let lines = createLines(gameIntroduction[globalState.currentLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	let pages = createPages(lines, maxLines)
	// Set the Font and Color
	ctx.font = `${textSize}px ${globalState.textFont}`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center"
	// Render pages, while pages space will page++ else move to next area
	let currentPage = pages[globalState.currentPage];
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], globalState.canvasWidth/2, y);
		y += (globalState.canvasHeight/15)
	}
	// Add a controller to handle the inputs
	document.addEventListener("keyup", (e) => {if (e.key === " " && firstPress) {
		firstPress = false;
		if (globalState.currentPage < pages.length -1) {
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
	}}, {once: true});
	firstPress = true;
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
	let lines = createLines(gameTutorial[globalState.currentLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	let pages = createPages(lines, maxLines)
	// Render pages, while pages space will page++ else move to next area
	let currentPage = pages[globalState.currentPage];
	
	globalState.playerSettings.x = globalState.canvasWidth/2;
	globalState.playerSettings.y = (globalState.canvasHeight/5)*3.5
	console.log(globalState.currentLine);
	switch(globalState.currentLine) {
		case 0:
			// Draw the Magnet for the Tutorial
			drawMagnet(globalState, ctx);
		break;

		case 1:
			drawMagnet(globalState, ctx);
		break;

		case 2:
		globalState.hintAnimation.x = globalState.canvasWidth/2
		globalState.hintAnimation.y = globalState.canvasHeight/2
			drawHint(globalState, ctx);
		break;

		case 3: 
			drawArrows(globalState, ctx);
		break;

		case 4:
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
	// Add a controller to handle the inputs
	document.addEventListener("keyup", (e) => {if (e.key === " " && firstPress) {
		firstPress = false;
		if (globalState.currentPage < pages.length -1) {
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
	}}, {once: true});
	firstPress = true;
}