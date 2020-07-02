/**
 * Clears the Canvas for Re-animation
 */
export function clearCanvas(globalState, ctx) {
	ctx.clearRect(0, 0, globalState.canvasWidth, globalState.canvasHeight);
}

/**
 * Gets a number between 0 and the max (so send 100 to get 0-99)
 */
export function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }

export function generateNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Reverses a number within a range, so 1-10 3 becomes 8 5 stays 5
 * 
 * @param {*} num The number to reverse
 * @param {*} min The min of the range
 * @param {*} max The max of the range
 */
export function reverseNumber(num, min, max) {
	return ( min + max ) - num;
}