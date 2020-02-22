// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

// canvas.width = screen.width;
// canvas.height = screen.height;

import {settings, initialSettings, testData, globalSettings} from "./settings.js"
import {handleMovement} from "./handleMovement.js"
import {drawBeam, drawMagnet, renderBackground} from "./drawImages.js"
import {keyBoardInputs, mouseInputs} from "./handleInput.js"

/**
 * Clears the Canvas for Re-animation
 */
function clearCanvas() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
}



// const magnet = new Image();
// magnet.src = "char-pikachu.png"



//Upside down triangle



export function resetPlayer() {
	settings = Object.assign({}, initialSettings);
}






function levelAlert (number) {
	
}

function calculatePoints () {

}

function updateTally () {
	
}



// // fillText 
// ctx.fillStyle = "black";
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 300, 50)

// strokeText - makes outline text
// ctx.lineWidth = 1;
// ctx.strokeStyle = "green"
// ctx.strokeText("Howdy World", 400, 100)


//Introduction Screen that explains the game

//Tutorial Runthrough

// Main Game
	// Demonstrate Cue and Ready Trigger - Done, drop animation needs improving, part of canvas task. Make Ready Button Clickable
	// Trial (player Inputs)
		// Move Magnet - Done, Needs Arrow Inputs
		// Set Magnet Power - Done - need to set to canvas width variable, also needs minimum variable, also needs arrow inputs, also needs to set a "hit area" to use
		// Run! Confirm 
	// Display "Ship", Score and Conclusion, Need to Add Score Box
	// Reset
	// If 

// Game Over Screen

// TODO: MAKE SURE WALLS WITH RIGHT WITH MAGNET SIZING 

const circle = {
	x: 100,
	y: 300,
	size: 30,
	// Increment we want to move on x and y
	dx: 0,
	dy: 2.5
}

function drawCircle() {
	ctx.drawImage(
		document.getElementById("junk"), 
		circle.x, 
		circle.y, 
		100, 
		100
		);
}

/**
 * 
 */
function runGame() {


	// Clears the Canvas (re-sets each frame)
	clearCanvas();
	// Render the Background
	renderBackground(document.getElementById("background"), canvas, ctx);
	
	if (settings.level < 10) {
		//Runs the Main Game
		mainGame(settings, ctx);
	}
	requestAnimationFrame(runGame);
}

// /**
//  * The Games' introduction screens
//  * 
//  * 
//  */
// function introduction(pages) {
// 	for (let i = 0; i < pages.length; i++) {

// 	}
// }

function renderReadyScreenAndHint(hint) {
	// let button = {
	// 	x: canvas.width /2
	// 	y:
	// }
	// Draw Start Button
	ctx.drawImage(
		document.getElementById("start_button"), 
		canvas.width/2 - (canvas.width/2)/2, 
		(canvas.height/4)*3 - (canvas.height/4)/2, 
		canvas.width/2, 
		canvas.height/4
	);
	// Draw the Hint
	renderHint(hint);
}

let stop = false

function renderHint(hintLocation) {
	// Draw the circle
	circle.x = (canvas.width/100 * hintLocation);
	if (circle.y < (canvas.height/5)*2.5 && circle.y > (canvas.height/10) && stop === false) {
		circle.x += circle.dx;
		circle.y += circle.dy;
		drawCircle();
	}
	else {
		stop = true;
		circle.y = (canvas.height/5)*2;
		drawCircle();
	}
}


let beamColor = "green";

function mainGame(settings, ctx) {
	//
	let i = globalSettings.trial;
	switch(globalSettings.trialState) {
		case "INTRO": 
			renderReadyScreenAndHint(testData[i].hint);
			document.addEventListener("keyup", (e) => {
				if (e.key === " ") {
					globalSettings.trialState = "TRIAL"}
			});
		break;

		case "TRIAL": 
			document.addEventListener("mousedown", mouseInputs.mouseDown);
			document.addEventListener("mouseup", mouseInputs.mouseUp);
			document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, settings, globalSettings)});
			document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, settings, globalSettings)});
			// Draw the Magnet
			drawMagnet(settings, ctx);
			// Draw the Beam coming from the Magnet
			drawBeam(settings, ctx, beamColor);
			handleMovement(settings);
		break;

		case "FINISHED":
			globalSettings.trial ++;
			if(globalSettings.trial < testData.length) {
				globalSettings.trialState = "INTRO";
			}
			else {
				globalSettings.trialState = "GAME_OVER"
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



