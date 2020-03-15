import { createLines, createPages } from "./text.js";
import { gameIntroduction } from "./settings.js";

// Boolean to stop the Press being continuously registered
let firstPress = true

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
	let lines = createLines(gameIntroduction[globalState.currentIntoLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	let pages = createPages(lines, maxLines)
	console.log(pages.length)
	// Set the Font and Color
	ctx.font = `${textSize}px ${globalState.textFont}`;
	ctx.fillStyle = "white";
	// Render pages, while pages space will page++ else move to next area
	let currentPage = pages[globalState.currentPage];
	console.log(globalState.currentPage)
	console.log(currentPage.length);
	for (let i = 0; i < currentPage.length; i++) {
		ctx.fillText(currentPage[i], 10, y);
		y += (globalState.canvasHeight/15)
	}
	// Add a controller to handle the inputs
	document.addEventListener("keyup", (e) => {if (e.key === " " && firstPress) {
		firstPress = false;
		if (globalState.currentPage < pages.length -1) {
			globalState.currentPage++
			console.log(globalState.currentPage);
			y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9)
		}
		else if (globalState.currentIntoLine < gameIntroduction.length -1) {
			globalState.currentIntoLine++
		}
		else {
			globalState.gameState = "GAME";

		}
	}}, {once: true});
	firstPress = true;
}