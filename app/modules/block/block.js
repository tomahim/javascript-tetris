/*
	Block Module
*/

var App = App || {};

App.Block = (function() {

	var self = {};

	self.currentBlock = null;

	self.blocks = {
		zBlock : {
			coordinates : [
				[0, getCenter() - 1],
				[0, getCenter()],
				[1, getCenter()],
				[1, getCenter() + 1]
			],
			center : 2
		},
		jBlock : {
			coordinates : [
				[0, getCenter() - 1],
				[1, getCenter() - 1],
				[1, getCenter()],
				[1, getCenter() + 1]
			],
			center : 2
		},
		lBlock : {
			coordinates : [
				[0, getCenter() + 1],
				[1, getCenter() + 1],
				[1, getCenter()],
				[1, getCenter() - 1]
			],
			center : 2
		},
		iBlock : {
			coordinates : [
				[0, getCenter()],
				[1, getCenter()],
				[2, getCenter()],
				[3, getCenter()]
			],
			center : 2
		},
		oBlock : {		
			coordinates : [
				[0, getCenter() -1],
				[0, getCenter()],
				[1, getCenter() - 1],
				[1, getCenter()]
			],
		},
		tBlock : {	
			coordinates : [
				[0, getCenter()],
				[1, getCenter() - 1],
				[1, getCenter()],
				[1, getCenter() + 1]
			],
			center : 2
		}
	};

	self.moveCurrentBlock = function(move) {
		if(self.moveBlock(self.currentBlock, move)) {
			return true;
		} else if(move === config.moves.DOWN) {
			stopCurrentBlock();
		};	
	}

	self.canMoveTo = function(currentCoordinates, coordinates) {
		return currentCoordinates && coordinates && !App.Board.Coordinate.detectCollision(currentCoordinates, coordinates);
	};

	self.updateBlockCoordinates = function(block, color) {
		block.coordinates.forEach((coord) => {
			var x = coord[0],
				y = coord[1];

			App.Board.board[x][y] = color;
			App.UI.changeColor(x, y, color);
		});
	};

	// block => {coordinates, center, color}
	self.moveBlock = function(block, move) {		
		var nextCoordinates = App.Board.Coordinate.computeNextCoordinates(block.coordinates, block.center, move);
		if (self.canMoveTo(block.coordinates, nextCoordinates)) {
			self.updateBlockCoordinates(block, config.color.none);
			block.coordinates = nextCoordinates;
			self.updateBlockCoordinates(block, block.color);
			return true;
		} else {
			return false;
		}
	};

	function getCenter() {
		return config.columns / 2;
	}

	function stopCurrentBlock() {
		self.currentBlock = null;		
	}	

	return self;
})();