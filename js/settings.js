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
	this.textFont = "VT323"
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
		power: 10,
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
	// The Junk we will be displaying (1-7)
	this.junkNumber = 1,
	// This variable is used to set the position of the rocks and the size of the power beam
	// 4 would mean the power size is a quarter of the screen
	this.powerSize = 15
	// Time in ms before trial is moved along
	this.trialTime = 5000;
	// How long left before the trial auto completes (in seconds)
	this.trialTimeLeft = 5;
	this.gameIntroduction = [
		`It is your first mission after joining the Intergalactic Space Defenders. However, a near miss has left your team marooned on a strange and distant planet in the treacherous Zammer region of sector 13…`,
	],
	this.gameTutorial = [
	    `Your captain has given you a mission: Use the electromagnet to pull in space junk from old objects like abandoned spacecrafts floating past the planet. However, you must conserve as much power as possible while doing this. This will mean you have the parts to build the escape ship but leave enough power to launch the rocket when it is ready. Once you have enough points the rocket will launch!`,
	    `Use the electromagnet to find and pull in the space junk. You can increase the power of the electromagnet, which will increase its range. But remember, the more power you use, the less you will have to launch the rocket when it is ready…`,
	    `Your radar will let you know when there are objects passing by that are likely to break up and drop vital pieces of space junk, which you can catch with your electromagnet. Do not forget, the more power you use, the less points you will receive for catching the space junk!`,
	    `The radar will show you where the last piece of space junk was spotted falling off passing objects. Use this information to calibrate your electromagnetic ray to catch the next piece that falls off. `,
		`Use the right and left arrows to position the electromagnet underneath where you think the space junk will be. Then use the up and down arrows to increase and decrease its power. Give it a try now!`,
		`On a computer left and right can be controlled with the left and right keys and up and down with the up and down keys.  Use space to advance or click the play button.`
	],
	this.trialIntros = [
	    "PRACTICE ROUND: Move the rover and adjust the electromagnets power using the arrows on the screen or keyboard. Press continue or enter on the keyboard when you are confident you will catch the space junk. Press continue or enter to start the next trial.", 
	    "The radar is showing an abandoned spacecraft passing by, and it's about to break up. Better get to it!",
	    "The radar is picking up a very large abandoned space cruiser floating by. One of the wings is rapidly disintegrating - but it also looks like the whole thing might break up! Careful - If the whole thing was to break up pieces could fall over a wider area!", 
	    "Looks like your lucky day! The radar is reporting that a high volume of ancient spacecrafts are about to pass by, all of about the same size. The spacecraft will pass one at a time. Remember - seperate objects may pass overhead in different places and so will drop any space junk in different areas!",
	    "Incoming! There are now many discarded spacecraft of all sizes passing by, one after another. Now's your chance - collect all the junk you can falling from each ship as it passes. Only one ship will go by at a time.",
	    "This group of spacecraft is bigger than expected - and some of the bits falling off are now heading straight for us! If you do not catch the junk now, it will damage our equipment and loose us points! But if you do catch it then you will get extra points and get us off this planet as quickly as possible! ",
	    
	],
	this.difficultyWarning = "This game is hard... Be prepared to be crushed",
	this.restartTutorialMessage = "Do you want to re-read the tutorial again?",
	this.reReadLevelInfo = "Click Next to progress or Back to go back to the Level description",
	this.tutorialReDo = false,
	this.trialResults = {
		// Did the Trial Succees
		success: false,
		// What was the score to two decimals
		actualScore: 0,
		// What was the Player Visible Score
		score: 0,
		// How far did they move X
		movementX: 0,
		// How much did they adjust Y
		movementY: 0,
	},
	// The area inbetween the two rocks
	this.activeArea = 0;
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
// let tyy ={
// 	originalHint: globalState.testData[globalState.trial].originalHint,
// 	originalResult: globalState.testData[globalState.trial].originalResult,
// 	participantPosition: globalState.playerSettings.x,
// 	participantConfidence: globalState.playerSettings.power,
// 	success: globalState.trialResults.success,
// 	trialScore: globalState.trialResults.score,
// 	actualTrialScore: globalState.trialResults.actualScore,
// 	level: globalState.testData[globalState.trial].level,
// 	distanceXMoved: globalState.trialResults.movementX,
// 	distanceYMoved: globalState.trialResults.movementY,
// 	// timeToComplete: globalState.testData[globalState.trial].timeToComplete,
// }

// export function saveScore(trialResults) {
// 	gorilla.metric(trialResults)
// 	// gorilla.metric({originalHint: trialResults.originalHint}, "originalHint");
// 	// gorilla.metric({originalResult: trialResults.originalResult}, "originalResult");
// 	// gorilla.metric({participantPosition: trialResults.participantPosition}, "participantPosition");
// 	// gorilla.metric({participantConfidence: trialResults.participantConfidence}, "participantConfidence");
// 	// gorilla.metric({success: trialResults.success}, "success");
// 	// gorilla.metric({trialScore: trialResults.trialScore}, "trialScore");
// 	// gorilla.metric({level: trialResults.level}, "level");
// 	// gorilla.metric({distanceXMoved: trialResults.distanceXMoved}, "distanceXMoved");
// 	// gorilla.metric({distanceYMoved: trialResults.distanceYMoved}, "distanceYMoved");
// 	// gorilla.metric({timeToComplete: trialResults.timeToComplete}, "timeToComplete");
// }