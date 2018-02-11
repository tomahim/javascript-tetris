/*
	UI Module
*/

var App = App || {};

App.UI = (function() {

	var self = {},
		gameEl = document.getElementById('game-board'),
		levelEl = document.getElementById('level-box'),
		scoreEl = document.getElementById('score-box');

	self.init = function() {
		drawBoard();
		document.onkeydown = initEvents;
	};	

	self.displayGameOver = function() {
		gameEl.innerHTML = '<div class="game-over">'
			+ 'GAME OVER :\'('
			+ '<div><a class="retry" onclick="location.reload()">Try again !</a></div>'
		+ '</div>';
	};	

	self.changeColor = function(x, y, colorChoosed) {		
		if (colorChoosed === config.color.none) {
			getPieceEl(x, y).style['background'] = 'none';
		} else {			
			getPieceEl(x, y).style['background-color'] = getColor(colorChoosed);
		}
	};

	function drawBoard() {
		gameEl.style['height'] = config.lines * config.blockSize + 'px';
		gameEl.style['width'] = config.columns * config.blockSize + 'px';
		var html = '';
		var x = 0;
		App.Board.board.forEach((lines) => {
			var y = 0;
			lines.forEach((col) => {
				var className = col > 0 ? 'color-' + col : '';
				html += '<div id="piece-'+ x +'-' + y +'" '
					 +  'class="piece ' + className +'" '
					 +	'style="'
					 + 		'position:absolute; left: ' + y * config.blockSize + 'px; '
					 + 		'background-color: ' + getColor(col) + '; '
					 +		'top: ' + x * config.blockSize + 'px; ">'
					 + '</div>';
				y++;
			});
			x++;
		});
		gameEl.innerHTML = html;
		self.refreshScoreAndLevel();
	}

	function getPieceEl(x, y) {
		return document.getElementById('piece-' + x + '-' + y);
	}

	function getColor(colorChoosed) {
		switch(colorChoosed) {
			case config.color.available.gray :
				return '#8a8583';
			break;
			case config.color.available.red :
				return '#cd8b62';
			break;
			case config.color.available.blue :
				return '#475c6c';
			break;
			case config.color.available.orange :
				return '#eed7a1';
			break;
			case config.color.available.yellow :
				return '#f7efd2';
			break;
			default:
				return 'none';
			break;
		}
	}

	self.refreshScoreAndLevel = function() {
		scoreEl.innerHTML = App.GameExecution.score;
		levelEl.innerHTML = App.GameExecution.currentLevel.num;
		setBackground();
	}

	var currentBackground = null;

	function setBackground() {
		if (!config.randomImage || !currentBackground) {
			currentBackground = config.pictures[0];
		} else {
			currentBackground = config.pictures[App.Util.getRandomInt(0, 3)];
		}
		var body = document.getElementsByTagName('body')[0];
		body.style['background'] = 'url("' + currentBackground + '")';
		body.style['background-position'] = 'center';
		body.style['background-size'] = 'cover';
		body.style['background-repeat'] = 'no-repeat';
	}

	/*
	** UI EVENTS
	*/

	function initSwithEvent(e) {
		e = e || window.event;
	}

	function initEvents(e) {
		e = e || window.event;
		//Avoid user interracting when no block moving yet
		if (!App.Block.currentBlock) {
			return;
		}
		if (event.keyCode >= 65 && event.keyCode <= 90) {
			App.Block.moveCurrentBlock(config.moves.ROTATE);
		} else {
			switch(e.keyCode) {
				case 37:	
					App.Block.moveCurrentBlock(config.moves.LEFT);
					break;
				case 39:			
					App.Block.moveCurrentBlock(config.moves.RIGHT);
					break;
				case 40:
					App.Block.moveCurrentBlock(config.moves.DOWN);
					break;
				default: 
					// don't move the block
					break;
			}
		}
	}

	return self;
})();

if (typeof exports !== 'undefined') {
   exports.AppUI = App.UI;
}