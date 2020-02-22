const fillCanvas = function(padding) {
	return (canvas.height >= canvas.width)? (canvas.width/2 - (canvas.width /padding)): (canvas.height/2 - (canvas.height /padding))
}

