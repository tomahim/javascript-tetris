/*
	Board DFS Module (Deep first search)
*/

var App = App || {};

App.Board.DFS = (function() {

	var self = {};

	/*
	* DFS Neighbors
	*/

	self.getCoordinatesGroupedByColor = function() {
		var groups = [];
		var visited = initVisited();
		for (var x = 0; x < App.Board.board.length; x++) {
		    for (var y = 0; y < App.Board.board[x].length; y++) {                        
		        var currentColor = App.Board.board[x][y];
		        if (currentColor != 0 && !visited[x][y]) {
		            var group = {
		            	coordinates : [],
		            	color : currentColor,
		            	center : null
		            };
		            DFSNeighboursBlocks(group, visited, x, y, currentColor);           
		            groups.push(group);
		        }
		    }
		}
		return groups;
	};

	// Recursive DFS method
	function DFSNeighboursBlocks(group, visited, x, y, currentColor) {
	    
		if (isValidNode(x, y, currentColor, visited)) {

		    // Mark node as visited
		    visited[x][y] = true;

		    group.coordinates.push([x, y]);
		    
		    var xCoord = [-1, 0, 0, +1];
		    var yCoord = [0, -1, +1, 0];

		    for(var i = 0; i < xCoord.length; i++) {
		        // Deep first search adjacent block (not diagonal)
		        DFSNeighboursBlocks(group, visited, x + xCoord[i], y + yCoord[i], currentColor);            
		    }
		}
	}

	function isValidNode(x, y, currentColor, visited) {
		return App.Board.board[x] != null && App.Board.board[x][y] != null && App.Board.board[x][y] === currentColor && !visited[x][y];
	}

	function initVisited() {
		var visited = [];
		for (var x = 0; x < App.Board.board.length; x++) {
		    var line = [];
		    for (var y = 0; y < App.Board.board[x].length; y++) {   
		        line.push(false)
		    }
		    visited.push(line);
		}
		return visited;
	}

	return self;

})();