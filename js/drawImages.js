
/**
 * Draws the magnet Image on the screen
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawMagnet(settings, ctx) {
	ctx.fillStyle = "crimson";
	// ctx.fillRect(, , , );
	ctx.drawImage(
		document.getElementById("rover"), 
		settings.x - (canvas.width)/20, 
		settings.y, 
		canvas.width/7, 
		canvas.height/7);
}

/**
 * Draws the "Magnet" beam
 * 
 * @param {*} settings The player settings object
 * @param {*} ctx The canvas function
 */
export function drawBeam(settings, ctx, beamColor) {
	ctx.beginPath();
	// Set Start Point
	ctx.moveTo(settings.x-settings.power,canvas.height/5); // Top Left
	// Draw a straight line
	ctx.lineTo(settings.x+settings.power, canvas.height/5); // Top Right

	ctx.lineTo(settings.x+settings.power, (canvas.height/5)*2.5); // Middle Right
	
	ctx.lineTo(settings.x, settings.y); // Bottom
	
	ctx.lineTo(settings.x-settings.power, (canvas.height/5)*2.5); // Middle Left
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = beamColor
	ctx.fill();
	ctx.globalAlpha = 1.0;
}

/**
 * Renders the background Image relative to the Canvas
 * 
 * @param {*} image The Image to Display
 * @param {*} canvas The Canvas to Display it on
 * @param {*} ctx The Canvas Function
 */
export function renderBackground (image, canvas, ctx) {
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}