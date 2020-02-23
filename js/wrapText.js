
/**
 * Takes in text parameters and will wrap the test to fit the screen
 * 
 * @param {*} ctx  The Canvas Context
 * @param {*} text The Text to Output
 * @param {*} x The X Position of the Text
 * @param {*} y The Y Position of the Text
 * @param {*} maxWidth The Maximum width on the page
 * @param {*} lineHeight The Space inbetween lines
 * @param {*} textSize The Size of the Text
 * @param {*} font The Font to Use
 * @param {*} color The Font Color
 */
export function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
	ctx.fillStyle = `${color}`
	ctx.font = `${lineHeight - (lineHeight/2.5)}px ${font}`
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = ctx.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			ctx.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	ctx.fillText(line, x, y);
}