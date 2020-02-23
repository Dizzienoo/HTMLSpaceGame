export const globalState = new function () {
		this.canvasWidth = 0,
		this.canvasHeight = 0,
		this.gameState = "INTRO",
		this.trialState = "INTRO",
		this.trial = 0,
		this.readyForNext = false,
		this.finishedTrial = false,
		this.level2 = 10,
		this.level3 = 20,
		this.level4 = 30,
		this.playerSettings = {
			w: 50,
			h: 70,
			x: 200,
			y: (this.canvasHeight/5)*3.25,
			speed: 5,
			dx: 0,
			dy: 0,
			powerSpeed: 2,
			power: 50,
			level: 0,
			beamColor: "green"
		},
		this.hintAnimation = {
			x: 100,
			y: 300,
			size: 30,
			dx: 0,
			dy: 2
		}
	}

/**
 * The Constant Player Parameters, used for Reset
 */
export const initialSettings = {
	w: 50,
	h: 70,
	x: 20,
	y: (globalState.canvasHeight/5)*3.25,
	speed: 5,
	dx: 0,
	dy: 0,
	powerSpeed: 2,
	power: 50,
	level: 0
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

export const gameIntroduction = "Welcome to the Game, this should be a multi-line introduction, aaaa, aaaa, Welcome to the Game, this should be a multi-line introduction, aaaa, aaaa, Welcome to the Game, this should be a multi-line introduction, aaaa, aaaa, Welcome to the Game, this should be a multi-line introduction, aaaa, aaaa, Welcome to the Game, this should be a multi-line introduction, aaaa, aaaa"