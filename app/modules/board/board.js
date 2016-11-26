/*
	Board Module
*/

var App = App || {};

App.Board = (function() {

	var self = {};

	// 2d-Array reprenting the Tetris board game
	self.board = [];

	// Init the 2d-Array with board size in config
	self.init = function() {	
		if (config.savedBoard && config.savedBoard.length) {
			self.board = config.savedBoard;
			return;
		}

		var line = initEmptyLine();
		for(var i = 0; i < config.lines; i++) {
			// copying empty initial array
			self.board.push(line.slice(0));
		}
	};

	self.displayNewBlock = function() {
		var randomBlock = App.Util.getRandomBlock();
		App.Block.currentBlock = {
			coordinates : randomBlock.coordinates,
			color : App.Util.getRandomColor(),
			center : randomBlock.center
		};

		if (App.Block.canMoveTo([], randomBlock.coordinates)) {
			App.Block.updateBlockCoordinates(App.Block.currentBlock, App.Block.currentBlock.color);
			return true;
		} else {
			return false;
		}
	};

	self.checkCompletedLines = function(cbEnd) {

		var emptyLines = [];
		self.board.forEach((lines, x) => {
			var sum = 0;
			lines.forEach((color, y) => {
				sum += !App.Board.Coordinate.isCoordinateFree(x, y);
			});
			if (sum === config.columns) {
				emptyLines.push(x);
			}
		});

		emptyLines.forEach((x) => {
			clearCompletedLine(x);
		});

		if (emptyLines.length) {
			// Group together blocks by colors
			var groups = App.Board.DFS.getCoordinatesGroupedByColor();

			// make falling these blocks until we find a collision
			do {					
				var nbMoved = 0;
				groups.forEach((group) => {
					var moved = App.Block.moveBlock(group, config.moves.DOWN);
					nbMoved += moved ? 1 : 0;
				});
			} while(nbMoved > 0);

			// recursivly check new potential completed lines
			setTimeout(() => {
				self.checkCompletedLines(() => {
					// TODO : check if needed to call the end callback
				});
			}, 500);

			// update score
			incrementScore(emptyLines.length);
		} else {			
			cbEnd();
		}
	}

	function initEmptyLine() {		
		var cols = [];
		for(var j = 0; j < config.columns; j++) {
			cols.push(config.color.none);
		} 
		return cols;
	}

	function clearCompletedLine(x) {
		var emptyLine = initEmptyLine();
		self.board[x] = emptyLine;
		for(var y = 0; y < config.columns; y++) {
			App.UI.changeColor(x, y, config.color.none);
		}
	}

	function incrementScore(nbLinesCompleted) {
		App.GameExecution.score += nbLinesCompleted * 10;
		for(var levelNum in config.levels) {
			if (App.GameExecution.score >= config.levels[levelNum].scoreGoal && App.GameExecution.currentLevel.num < levelNum) {
				App.GameExecution.currentLevel = config.levels[levelNum];
			}
		}
		App.UI.refreshScoreAndLevel();
	}


	return self;
})();