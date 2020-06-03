/**
 * Scales the Text to fit the screen based on desired size
 * 
 * @param {*} textSize The Desired size of the text (relative to other scaled texts)
 * @param {*} globalSettings The global settings object
 */
export function scaleText(textSize, globalSettings) {
    return (textSize / 80) * ((globalSettings.canvasWidth > globalSettings.canvasHeight)? globalSettings.canvasWidth/10: globalSettings.canvasHeight/10)
}