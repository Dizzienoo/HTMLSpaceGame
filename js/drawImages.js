
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
 * Function that handles beam power relative to screen space
 */
function calculateBeamandPower (globalState) {
	let power = globalState.playerSettings.power
	// If the current beam will go further than the width of the page
	if (globalState.minWidth > globalState.playerSettings.x - ((globalState.canvasWidth/300) * power)) {
		// Then adpated power is set to, player position - 
		globalState.playerSettings.adaptedPower = (globalState.playerSettings.x - globalState.minWidth)/((globalState.canvasWidth/300))
	}
	else if (globalState.maxWidth < globalState.playerSettings.x + ((globalState.canvasWidth/300) * power)) {
		globalState.playerSettings.adaptedPower = (globalState.maxWidth - globalState.playerSettings.x)/((globalState.canvasWidth/300))
	}
	else {
		globalState.playerSettings.adaptedPower = 100;
	}
	if (globalState.playerSettings.adaptedPower < globalState.playerSettings.power) {
		power = globalState.playerSettings.adaptedPower;
	}
	// Calculate Left Width
	let leftWidth = globalState.playerSettings.x - ((globalState.canvasWidth/300) * power)
	// Calculate Right Width
	let rightWidth = globalState.playerSettings.x + ((globalState.canvasWidth/300) * power)
	// Set the global variables
	globalState.beamLeft = leftWidth;
	globalState.beamRight = rightWidth;
	globalState.currentPower = power;
}

/**
 * Draws the "Magnet" beam
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawBeam(globalState, ctx) {
	ctx.beginPath();

	calculateBeamandPower(globalState);
	// Set Start Point
	ctx.moveTo(globalState.beamLeft, globalState.canvasHeight/5); // Top Left
	// Draw a straight line
	ctx.lineTo(globalState.beamRight, globalState.canvasHeight/5); // Top Right
	ctx.lineTo(globalState.beamRight, (globalState.canvasHeight/5)*2.5); // Middle Right
	
	ctx.lineTo(globalState.playerSettings.x, globalState.playerSettings.y); // Bottom
	
	ctx.lineTo(globalState.beamLeft, (globalState.canvasHeight/5)*2.5); // Middle Left
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