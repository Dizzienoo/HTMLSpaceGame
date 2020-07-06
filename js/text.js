import { scaleText } from "./scaleText.js";

/**
 * 
 * @param {number} textScale The Size of the text on the page (20 is a normal size)
 * @param {*} globalState 
 * @param {*} ctx 
 */
export function fitToPages(textScale, text, globalState, ctx) {
	// Get the maxWidth of the page
	let maxWidth = (globalState.canvasWidth/10)*9
	// Get the max height of the page
	let maxLines = (Math.floor((globalState.canvasHeight - (globalState.canvasHeight - (globalState.canvasHeight/10)*9))/ (globalState.canvasHeight/15))-1);
	// Set the Text Size
	let textSize = scaleText(textScale, globalState)
	// Create a function that splits text up into "Lines" based on input variables
	let lines = createLines(text[globalState.currentLine], textSize, globalState.textFont, maxWidth, ctx);
	// Create a function that splits lines into pages based on input variables
	return {
		builtPages: createPages(lines, maxLines),
		textSize
	}
}


/**
 * Converts a block of text into lines that will fit within the desired width
 * 
 * @param {string} text The text to split
 * @param {number} textSize The size of the text
 * @param {string} textFont The font the text will be
 * @param {number} maxWidth The width of the canvas
 * @param {object} ctx The Canvas to allow width calculations
 * 
 * @returns {string[]} Returns array of strings that will fit the page
 */
export function createLines(text, textSize, textFont, maxWidth, ctx) {
	// Create the array to return
	let lines = []
	// Split the incoming text into words
	let words = text.split(" ");
	// Create an empty line object
	let line = ``
	// Set the text size to the desired size
	ctx.font = `${textSize}px ${textFont}`
	// Run through each word
	for (let i = 0; i < words.length; i++) {
		//Test if the word will fit on the current line
		let testLine = line + words[i] + ` `;
		// Get the lines length using the canvas
		let metrics = ctx.measureText(testLine);
		let testWidth = metrics.width;
		// If the new word would make the line longer than we want
		if (testWidth > maxWidth) {
			// Add the Current line to the array
			lines.push(line)
			// Set the line to start again with the new word
			line = words[i] + ` `
		}
		else {
			// Otherwise, just add the word
			line = testLine
		}
	}
	// Add the final line to the Array
	lines.push(line)
	// Return the lines
	return lines;
}

/**
 * Turns an array of lines into an array of pages (each page is an array of lines)
 * 
 * @param {string[]} lines The pre-created array of string to process
 * @param {number} maxLines The maximum number of lines we want per page
 * 
 * @returns {object[]} Returns array of string arrays
 */
export function createPages(lines, maxLines) {
	// Create the array to return
	let pages = []
	// Create count of current line
	let currentLine = 0;
	// Create an empty page
	let page = []
	// Run through each line
	for (let i = 0; i < lines.length; i++) {
		// If the current line is less than the max
		if (currentLine < maxLines) {
			// Add the line to the page
			page.push(lines[i])
			// Increase current line count
			currentLine++
		}
		else {
			// Add the page to the pages array
			pages.push(page)
			// Reset the page and add the line
			page = [lines[i]];
			// Set the current lines to 1
			currentLine = 1;
		}
	}
	// Add the final page to pages
	pages.push(page);
	// Return the pages
	return pages;
}