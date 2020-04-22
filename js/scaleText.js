
export function scaleText(textSize, globalSettings) {
    // 
    let response = (textSize / 80) * ((globalSettings.canvasWidth > globalSettings.canvasHeight)? globalSettings.canvasWidth/10: globalSettings.canvasHeight/10)
    return response
}