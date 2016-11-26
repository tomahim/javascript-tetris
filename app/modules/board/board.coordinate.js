/*
	Coordinate Module
*/

var App = App || {};

App.Board.Coordinate = (function() {
	var self = {};

	self.detectCollision = function(currentCoordinates, nextCoordinates) {
		// exlude current block coordinates
		var targetCoordinates = [];
		nextCoordinates.forEach((coord, i) => {
			if(!containsCoordinates(currentCoordinates, coord)) {
				targetCoordinates.push(coord);
			}
		});

		var nbCollisions = 0;
		targetCoordinates.forEach((coord) => {
			nbCollisions += !self.isCoordinateFree(coord[0], coord[1]) ? 1 : 0;
		});
		return nbCollisions > 0;
	};

	self.computeNextCoordinates = function(coordinates, center, move) {
		var targetCoordinates = [];		
		switch(move) {
			case config.moves.LEFT: 				
				coordinates.forEach((coord) => {
					targetCoordinates.push([coord[0], coord[1] - 1]);
				});
				break;
			case config.moves.RIGHT:
				coordinates.forEach((coord) => {
					targetCoordinates.push([coord[0], coord[1] + 1]);
				});
				break;
			case config.moves.DOWN:	
				coordinates.forEach((coord) => {
					targetCoordinates.push([coord[0] + 1, coord[1]]);
				});
				break;
			case config.moves.ROTATE:	
				// Only blocks with center coordinates can rotate
				if (center) {		
					var centerX = coordinates[center][0],
						centerY = coordinates[center][1];

					var newCoordinates = [];
					coordinates.forEach((coord, index) => {
						if (index !== center) {
							newCoordinates[index] = [
								coord[1] + centerX - centerY,
								centerX + centerY - coord[0]
							];
						} else {
							// The center of the block should not move
							newCoordinates[index] = coord;
						}
					});
					targetCoordinates = newCoordinates;
				}
				break;
			default:
				break;
		}
		if (!targetCoordinates.length) {
			return coordinates;
		}
		return targetCoordinates;
	};

	self.isCoordinateFree = function(x, y) {
		return App.Board.board[x] != null && App.Board.board[x][y] != null && App.Board.board[x][y] === config.color.none;
	}

	function containsCoordinates(listCoordinates, coord) {
		var found = false;
		for(var i = 0; i < listCoordinates.length; i++) {
			found = equalsCoordinates(listCoordinates[i], coord);
			if (found) {
				break;
			}
		}
		return found;
	}

	function equalsCoordinates(coord1, coord2) {
		return (coord1.length == coord2.length) && coord1.every((element, index) => {
			return element === coord2[index];
		});
	}

	return self;
})();