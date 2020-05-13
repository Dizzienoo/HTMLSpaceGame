/**
 * Clears the Canvas for Re-animation
 */
export function clearCanvas(globalState, ctx) {
	ctx.clearRect(0, 0, globalState.canvasWidth, globalState.canvasHeight);
}