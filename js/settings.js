/**
 * The Global State of the Game
 */
export const globalState = new function () {
		this.currentPage = 0;
		this.currentLine = 0;
		this.textFont = "Arial"
		this.canvasWidth = 0,
		this.canvasHeight = 0,
		this.gameState = "INTRO",
		this.trialState = "INTRO",
		this.totalScore = 0,
		this.trial = 0,
		this.readyForNext = false,	
		this.finishedTrial = false,
		this.level2 = 10,
		this.level3 = 20,
		this.level4 = 30,
		this.maxWidth = (this.canvasWidth/10)*9,
		this.constants = {
			maxLines: Math.floor((this.canvasHeight - (this.canvasHeight - (this.canvasHeight/10)*9))/ (this.canvasHeight/15)),
			textSize: (this.canvasHeight/15) - ((this.canvasHeight/15)/2.5),
		},
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
			beamColor: "green"
		},
		this.hintAnimation = {
			x: 100,
			y: 100,
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

export const gameIntroduction = [
	`It is your first mission after joining the integalactive space defenders. However, a near miss has left your team marooned on a strange and distant planet in the treacherous Zammer region of sector 13…`,
	`Your captian has given you a mission: Use the electro-magnet to pull in as much space junk as possible, while conserving the most power – this will provide the parts to build the escape ship, and leave enough power to launch the rocket when its ready.`,
]

export const gameTutorial = [
	`Use the electro magnet to find and pull in the space junk. You can increase the power of the electro magnet, which will increase its range. But remember, the more power you use, the less you will have to launch the rocket when it is ready…`,
	`To help you with your task your captain has give you a scanner that will show you where past space junk has been spotted. Unfortunately the batteries will only last so long – and as its running out it may get more and more unreliable!`,
	`The scanner will show you an image of some space junk in a location it has been seen in the past. When you are ready, press start.`,
	`Use the right and left arrows to position to electro-magnet underneath where you think the space junk will be. Then use the up and down arrows to increase and decrease its power.`,
	`On a computer left and right can be controlled with the left and right keys and up and down with the up and down keys.  Use space to advance or click the screen.`
]