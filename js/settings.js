/**
 * The Active Player Parameters
 */
export const settings = {
	w: 50,
	h: 70,
	x: 20,
	y: (canvas.height/5)*3.25,
	speed: 5,
	dx: 0,
	dy: 0,
	powerSpeed: 2,
	power: 50,
	level: 0
}

/**
 * The Constant Player Parameters, used for Reset
 */
export const initialSettings = {
	w: 50,
	h: 70,
	x: 20,
	y: (canvas.height/5)*3.25,
	speed: 5,
	dx: 0,
	dy: 0,
	powerSpeed: 2,
	power: 50,
	level: 0
}

export const globalSettings = {
	trialState: "INTRO",
	trial: 0,
	readyForNext: false,
	finishedTrial: false,
	level2: 10,
	level3: 20,
	level4: 30,
}


export const testData = [
	{
		hint: 60,
		result: 20
	},
	{
		hint: 40,
		result: 20
	},
	{
		hint: 30,
		result: 20
	},
	{
		hint: 15,
		result: 20
	}
]