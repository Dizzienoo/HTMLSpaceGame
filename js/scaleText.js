/**
 * Scales the Text to fit the screen based on desired size
 * 
 * @param {*} textSize The Desired size of the text (relative to other scaled texts)
 * @param {*} globalState The global settings object
 */
export function scaleText(textSize, globalState) {
    return (textSize / 80) * ((globalState.canvasWidth > globalState.canvasHeight)? globalState.canvasWidth/10: globalState.canvasHeight/10)
}