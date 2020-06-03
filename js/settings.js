/**
 * The Global State of the Game
 */
export const globalState = new function () {
	// For Mouse Inputs, Set in the reset player function and at beginning
	this.rect = 0;
	// For Mouse Inputs so mouse up isn't always firing
	this.mouseDown = false;
	// The area of the left Arrow, set in draw images
	this.leftArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the right Arrow
	this.rightArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the up Arrow
	this.upArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the down Arrow
	this.downArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the progress box
	this.progressButtonArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The parsed into pages to be displayed, set in renderScreen, introScreen
	this.introPages = []
	this.tutorialPages = []
	// Beam Left and Right are used to show what the current beams x positions are and are calculated in drawImages, calculateBeamandPower
	this.beamLeft = 0;
	this.beamRight = 0;
	// Current Power is used to show the actual power of the beam once all side calculations are accounted for, it is set in drawImages, calculateBeamandPower and reset in resetPlayer
	this.currentPower = 50;
	// Current Page and Line are used by the intro and tutorial screens to page through the introduction texts
	this.currentPage = 0;
	this.currentLine = 0;
	// Text font is used to set the fot the game uses
	this.textFont = "Calibri"
	this.canvasWidth = 0,
	this.canvasHeight = 0,
	// The state that the overall game is in
	this.gameState = "INTRO",
	// The state that the individual Trial is in
	this.trialState = "INTRO",
	// Score of a single test
	this.score = 0,
	// Score of all trials combined
	this.totalScore = 0,
	// Highest Score the player got
	this.highestScore = 0,
	// What trial is this in the current level
	this.trialNumber = 1,
	// Which trial are we on?
	this.trial = 0,
	// Which level are we on?
	this.level = 1,
	this.readyForNext = false,	
	this.finishedTrial = false,
	this.maxWidth = (this.canvasWidth/20)*19,
	this.minWidth = this.canvasWidth/20
	this.constants = {
		maxLines: Math.floor((this.canvasHeight - (this.canvasHeight - (this.canvasHeight/10)*9))/ (this.canvasHeight/15)),
		textSize: (this.canvasHeight/15) - ((this.canvasHeight/15)/2.5),
	},
	this.playerSettings = {
		w: 50,
		h: 70,
		x: 200,
		y: (this.canvasHeight/5)*3,
		speed: 8,
		dx: 0,
		dy: 0,
		powerSpeed: 2,
		power: 50,
		adaptedPower: 100,
		beamColor: "green"
	},
	this.hintAnimation = {
		x: 100,
		y: 100,
		size: 30,
		dx: 0,
		dy: 5
	},
	// This variable is used to set the position of the rocks and the size of the power beam
	// 4 would mean the power size is a quarter of the screen
	this.powerSize = 8
	// Time in ms before trial is moved along
	this.trialTime = 10000;
	// How long left before the trial auto completes (in seconds)
	this.trialTimeLeft = 10;
	this.gameIntroduction = [
		`It is your first mission after joining the integalactive space defenders. However, a near miss has left your team marooned on a strange and distant planet in the treacherous Zammer region of sector 13…`,
	],
	this.gameTutorial = [
	    `Your captain has given you a mission: Use the electro-magnet to pull in as much space junk as possible, while conserving the most power – this will provide the parts to build the escape ship, and leave enough power to launch the rocket when its ready.`,
		`Use the electro magnet to find and pull in the space junk. You can increase the power of the electro magnet, which will increase its range. But remember, the more power you use, the less you will have to launch the rocket when it is ready…`,
		`To help you with your task your captain has give you a scanner that will show you where past space junk has been spotted. Unfortunately the batteries will only last so long – and as its running out it may get more and more unreliable!`,
		`The scanner will show you an image of some space junk in a location it has been seen in the past. When you are ready, press start.`,
		`Use the right and left arrows to position to electro-magnet underneath where you think the space junk will be. Then use the up and down arrows to increase and decrease its power.`,
		`On a computer left and right can be controlled with the left and right keys and up and down with the up and down keys.  Use space to advance or click the screen.`
	],
	this.trialIntros = [
	    "This is a test run",
	    "this is a new run 1",
	    "this is a new run 2",
	    "this is a new run 3",
	    "this is a new run 4",
	    "this is a new run 5",
    ]
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
