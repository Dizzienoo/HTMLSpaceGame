import {runGame, mouseInputs, touchInputs, keyBoardInputs, clearCanvas} from "./script.js";
import {globalState} from "./settings.js"
import { getData } from "./getData.js";
import { generateNumber } from "./utilities.js";
import { portraitProtection } from "./renderScreen.js";
import { resetPlayer } from "./resetPlayer.js";
import { calculateRockPos } from "./drawImages.js";

// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
globalState.canvasWidth = window.innerWidth
globalState.canvasHeight = window.innerHeight
if (globalState.canvasWidth/2.3 > globalState.canvasHeight) {globalState.canvasWidth = globalState.canvasHeight* 2.2}
globalState.rect = canvas.getBoundingClientRect();

document.addEventListener("touchstart", (e) => {
    touchInputs.touchDown(e, globalState);
    e.preventDefault();
});
document.addEventListener("touchend", (e) => {
    touchInputs.touchUp(e, globalState);
    e.preventDefault();
});
document.addEventListener("mousedown", (e) => {mouseInputs.mouseDown(e, globalState)});
document.addEventListener("mouseup", (e) => {mouseInputs.mouseUp(e, globalState)});
document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, globalState)});
document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, globalState)});

function thisTry(globalState, ctx) {
    // If the Screen Resolution changes, reset it, reset the player and redraw the rocks position
    if (globalState.canvasWidth !== window.innerWidth || globalState.canvasHeight !== window.innerHeight) {
        globalState.canvasWidth = window.innerWidth;
        canvas.width = window.innerWidth;
        globalState.canvasHeight = window.innerHeight;
        canvas.height = window.innerHeight;
        resetPlayer(globalState);
        calculateRockPos(globalState);
    }
    // The test data items
    const testData = [
        "assets/testData.csv"
    ]
    // Pick one of the files to run
    const testDataURL = testData[generateNumber(0, testData.length -1)];
    // Get the Data for the test
    getData(testDataURL).then((testData) => {
        globalState.testData = testData;
        clearCanvas(globalState, ctx)
        if (globalState.canvasWidth < globalState.canvasHeight) {
            // console.log("HERE")
            portraitProtection(globalState, ctx);
        }
        else {
            runGame(globalState, ctx)
        }
        if (globalState.gameState !== "GAME_OVER")
        {requestAnimationFrame(() => thisTry(globalState, ctx));}
    })

}

thisTry(globalState,ctx);