import {runGame, mouseInputs, keyBoardInputs, clearCanvas} from "./script.js";
import {globalState} from "./settings.js"
import { getData } from "./getData.js";

// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");
// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
globalState.canvasWidth = window.innerWidth
globalState.canvasHeight = window.innerHeight
globalState.rect = canvas.getBoundingClientRect();

document.addEventListener("mousedown", (e) => {mouseInputs.mouseDown(e, globalState)});
document.addEventListener("mouseup", (e) => {mouseInputs.mouseUp(e, globalState)});
document.addEventListener("keydown", (e) => {keyBoardInputs.keyDown(e, globalState)});
document.addEventListener("keyup", (e) => {keyBoardInputs.keyUp(e, globalState)});

function thisTry(globalState, ctx) {

    const testDataURL = "../assets/pilot_finaldata.csv"
    getData(testDataURL).then((testData) => {
        globalState.testData = testData;
        console.log(globalState.testData)

        clearCanvas(globalState, ctx)
        runGame(globalState, ctx)
        if (globalState.gameState !== "GAME_OVER")
        {requestAnimationFrame(() => thisTry(globalState, ctx));}
    })
    
}

thisTry(globalState,ctx);
// runGame(globalState, ctx)