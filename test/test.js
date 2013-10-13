"use strict"

var bo = require("../BoxOverlap.js")

require("tape")(function(t) {

	var b0 = [[0, 0], [1,1]];
	var b1 = [[0.5, 0.5], [0.75,0.75]];
	var b2 = [[2, 0], [3,1]];
	var b3 = [[2.5, -10], [2.75,10]];
	var b4 = [[5, 0], [4,1]];
	var b5 = [[4.5, 0.5], [5.5,1.5]];
	var b6 = [[0, 2], [1, 11 ]];
	var b7 = [[3, 0], [4,1]];
	var b8 = [[0, 0], [1,1]];
	var b9 = [[0, 0], [1,1]];

	
	var boxes = [b0, b1, b2, b3, b4, b5, b6, b7];
	t.same(bo(boxes),  [[0, 1],
						[2, 3],
						[2, 7],
						[4, 7],
						[4, 5]]);


	
	
	t.end();
	

})

