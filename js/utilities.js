/**
 * Clears the Canvas for Re-animation
 */
export function clearCanvas(globalState, ctx) {
	ctx.clearRect(0, 0, globalState.canvasWidth, globalState.canvasHeight);
}

export function generateNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}