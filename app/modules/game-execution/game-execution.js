/*
	GameExecution Module
*/

var App = App || {};

App.GameExecution = (function() {

	var self = {
		currentLevel : config.levels[1],
		score : 0
	};

	self.init = function() {
		App.Board.init();
		App.UI.init();
		self.play();
	};

	self.play = function() {
		if (!App.Block.currentBlock) {
			App.Board.checkCompletedLines(() => {
				if(!App.Board.displayNewBlock()) {
					App.UI.displayGameOver();
				}
			});
		} else {
			App.Block.moveCurrentBlock(config.moves.DOWN);
			
		}
		window.setTimeout(self.play, self.currentLevel.gameSpeed);
	};

	return self;
})();

App.GameExecution.init();