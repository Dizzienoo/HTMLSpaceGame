
/**
 * Draws the magnet Image on the screen
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawMagnet(globalState, ctx) {
	ctx.fillStyle = "crimson";
	ctx.drawImage(
		document.getElementById("rover"), 
		globalState.playerSettings.x - (globalState.canvasWidth)/20, 
		globalState.playerSettings.y, 
		globalState.canvasWidth/7, 
		globalState.canvasHeight/7);
}

/**
 * Draws the "Magnet" beam
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawBeam(globalState, ctx) {
	ctx.beginPath();
	// Set Start Point
	ctx.moveTo(globalState.playerSettings.x-globalState.playerSettings.power,globalState.canvasHeight/5); // Top Left
	// Draw a straight line
	ctx.lineTo(globalState.playerSettings.x+globalState.playerSettings.power, globalState.canvasHeight/5); // Top Right

	ctx.lineTo(globalState.playerSettings.x+globalState.playerSettings.power, (globalState.canvasHeight/5)*2.5); // Middle Right
	
	ctx.lineTo(globalState.playerSettings.x, globalState.playerSettings.y); // Bottom
	
	ctx.lineTo(globalState.playerSettings.x-globalState.playerSettings.power, (globalState.canvasHeight/5)*2.5); // Middle Left
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = globalState.playerSettings.beamColor
	ctx.fill();
	ctx.globalAlpha = 1.0;
}

export function drawArrows(globalState, ctx) {
	ctx.drawImage(document.getElementById("arrowLeft"), globalState.canvasWidth/10, (globalState.canvasHeight/10)*9, 100, 100)
}

export function drawHint(globalState, ctx) {
	ctx.drawImage(
		document.getElementById("junk"), 
		globalState.hintAnimation.x, 
		globalState.hintAnimation.y, 
		100, 
		100
		);
}

/**
 * Renders the background Image relative to the Canvas
 * 
 * @param {*} image The Image to Display
 * @param {*} canvas The Canvas to Display it on
 * @param {*} ctx The Canvas Function
 */
export function renderBackground (globalState, ctx) {
	ctx.drawImage(document.getElementById("background"), 0, 0, globalState.canvasWidth, globalState.canvasHeight);
}