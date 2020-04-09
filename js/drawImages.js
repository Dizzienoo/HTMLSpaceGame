
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

/**
 * Handles Rendering the Power Bar
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawPower(globalState, ctx) {
	// Draw Power box fill
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/15, -((globalState.canvasHeight/10)*5)*(globalState.currentPower/100));
	ctx.fill();
	// Draw Power box outline
	ctx.beginPath();
	ctx.rect((globalState.canvasWidth)/40, (globalState.canvasHeight/10)*7, globalState.canvasWidth/15, -(globalState.canvasHeight/10)*5);
	ctx.lineWidth = "4";
	ctx.strokeStyle = "white";
	ctx.stroke();
	// Draw Power Text
	// ctx.rotate(270 * Math.PI/180);
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.font = "20px Comic Sans MS";
	ctx.fillText("Power", (globalState.canvasWidth/40)+(globalState.canvasWidth/15/2), (globalState.canvasHeight/10)*2-(globalState.canvasHeight/40));
	// ctx.rotate(90 * Math.PI/180);
}

export function drawArrows(globalState, ctx) {
	// Vertical Arrows
	drawVerticalArrows(globalState, ctx);
	// Horizontal Arrows
	drawHorizontalArrows(globalState, ctx);
}

export function drawVerticalArrows(globalState, ctx) {
	// Draw Up Arrow
	ctx.drawImage(document.getElementById("arrowUp"), 0, (globalState.canvasHeight/10)*8, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Draw Down Arrow
	ctx.drawImage(document.getElementById("arrowDown"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*8, globalState.canvasWidth/10, globalState.canvasHeight/10);
}

export function drawHorizontalArrows(globalState, ctx) {
	// Draw Left Arrow
	ctx.drawImage(document.getElementById("arrowLeft"), 0, (globalState.canvasHeight/10)*9, globalState.canvasWidth/10, globalState.canvasHeight/10);
	// Draw Right Arrow
	ctx.drawImage(document.getElementById("arrowRight"), (globalState.canvasWidth/10)*9, (globalState.canvasHeight/10)*9, globalState.canvasWidth/10, globalState.canvasHeight/10);
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