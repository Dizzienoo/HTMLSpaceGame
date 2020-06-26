import {runGame, mouseInputs, touchInputs, keyBoardInputs, clearCanvas} from "./script.js";
import {globalState} from "./settings.js"
import { getData } from "./getData.js";
import { generateNumber } from "./utilities.js";

// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
globalState.canvasWidth = window.innerWidth
globalState.canvasHeight = window.innerHeight
if (globalState.canvasWidth/2.2 > globalState.canvasHeight) {globalState.canvasWidth = globalState.canvasHeight* 2.2}
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

    // The test data items
    const testData = [
        "assets/testData.csv"
    ]
    // Pick one of the files to run
    const testDataURL = testData[generateNumber(0, testData.length -1)];
    getData(testDataURL).then((testData) => {
        globalState.testData = testData;
        clearCanvas(globalState, ctx)
        runGame(globalState, ctx)
        if (globalState.gameState !== "GAME_OVER")
        {requestAnimationFrame(() => thisTry(globalState, ctx));}
    })
    
}

thisTry(globalState,ctx);
// runGame(globalState, ctx)