const fillCanvas = function(padding) {
	return (globalState.canvasHeight >= globalState.canvasWidth)? (globalState.canvasWidth/2 - (globalState.canvasWidth /padding)): (globalState.canvasHeight/2 - (globalState.canvasHeight /padding))
}

