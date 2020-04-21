
export function scaleText(textSize, globalSettings) {
    // 

    let response = (textSize / 80) * ((globalSettings.canvasWidth > globalSettings.canvasHeight)? globalSettings.canvasWidth/10: globalSettings.canvasHeight/10)
    console.log(`Text Size`, response);
    return response
}