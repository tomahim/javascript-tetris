var App = App || {};

App.Util = (function() {
	var self = {};

	self.getRandomBlock = function() {
		var randomNumber = self.getRandomInt(0, self.getNbBlocks()-1);
		return findPropertyByNum(App.Block.blocks, randomNumber);
	};

	self.getRandomColor = function() {
		var randomNumber = self.getRandomInt(0, self.getNbColors()-1);
		return findPropertyByNum(config.color.available, randomNumber);
	};

	self.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	self.getNbBlocks = function() {
		return Object.keys(App.Block.blocks).length;
	};

	self.getNbColors = function() {
		return Object.keys(config.color.available).length;
	};

	function findPropertyByNum(obj, num) {	
		var i = 0, 
			found = null;	
		for(var key in obj) {
			if (i === num) {
				found = obj[key];
				break;
			}
			i++;
		}
		return found;
	}

	return self;
})();