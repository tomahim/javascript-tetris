var config = {
	blockSize : 30, // 1 block = 30 px * 30 px
	lines : 20,
	columns : 10,
	levels : {
		1 : {
			num : 1,
			scoreGoal : 0,
			gameSpeed : 500
		},
		2 : {
			num : 2,
			scoreGoal : 50,
			gameSpeed : 300
		},
		3 : {
			num : 3,
			scoreGoal : 100,
			gameSpeed : 200
		} 
	},
	color : {
		none : 0,
		available : {
			red : 1,
			blue : 2,
			orange : 3,
			yellow : 4,			
			gray : 5
		}
	},
	moves : {
		LEFT : 'LEFT',
		RIGHT : 'RIGHT',
		DOWN : 'DOWN',
		ROTATE : 'ROTATE'
	},
	pictures : [
		'resources/tetris.png'
	],
	randomImage: false,
	savedBoard : [
		/*[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 2, 2, 0, 0, 0, 0, 0],
		[2, 0, 0, 2, 2, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
		[0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
		[0, 1, 1, 0, 0, 1, 1, 1, 1, 0]*/
	]
};