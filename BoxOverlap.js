//Michael Doescher
//October 10, 2013
//This program reports overlapping boxes
//Input = an array of box coordinates.  Each box is defined as an array of points.  The points represent the lower left and upper right corner.
//Output = A two dimensional array.  Each row contains two values indicating the index value of the boxes from the input that overlap

module.exports = function(boxes) {
	// if (!isInputOk(boxes)) {return null;}
	var events = generateEvents(boxes);
	events.sort(compare);
	overlaps = new Array();
	var overlaps = generateOvelapList(boxes, events, overlaps);
	return overlaps;
}


function isInputOk(boxes) {
	return true;
}

/*
[
	[[0, 0], [1, 1]], 			//box 1
	[[0.5, 0.5], [10, 10]]		//box 2
]
*/

function generateEvents(boxes) {
	var events = new Array();
	var event = new Object();
	
	for (i = 0; i < boxes.length; i++) {  // traverse the list of boxes
		var leftx = Math.min(boxes[i][0][0], boxes[i][1][0]);
		var rightx = Math.max(boxes[i][0][0], boxes[i][1][0]);
		
		event = new Object();
		event.x = leftx;
		event.type = "add";
		event.index = i;
		events.unshift(event);
		
		event = new Object();
		event.x = rightx;
		event.type = "remove";
		event.index = i;
		events.push(event);
	}
	return events;
}

function compare(a,b) {
  if (a.x < b.x)
     return -1;
  if (a.x > b.x)
    return 1;
  if (a.x == b.x && a.type == "add" && b.type == "remove") return -1;	// adding before removing allows for boxes that overlap
  if (a.x == b.x && a.type == "remove" && b.type == "add") return 1; 	// only on the edge to count as overlapping.
  return 0;
}

function generateOvelapList(boxes, events, overlaps) {
	var Q = new Array();					// a list of indices into the boxes array of boxes that intersect the sweeping plane
	var overlaps = new Array();				// pairs of boxes that overlap (indices into the boxes array
	
	for (i = 0; i < events.length; i++) {
		if (events[i].type == "add") {
			overlaps = findOverlap(Q, events[i].index, overlaps, boxes);
			Q.push(events[i].index);
		} 
		if (events[i].type == "remove") {
			var ind = Q.indexOf(events[i].index);
			Q.splice(ind, 1);
		}
	}
	return overlaps;
}

function findOverlap(Q, box, overlaps, boxes){
	if (Q.length == 0) {return overlaps;}
	for (j = 0; j<Q.length; j++) {
		var y1 = Math.min(boxes[Q[j]][0][1], boxes[Q[j]][1][1]);
		var y2 = Math.max(boxes[Q[j]][0][1], boxes[Q[j]][1][1]);
		var ey1 = Math.min(boxes[box][0][1], boxes[box][1][1]);
		var ey2 = Math.max(boxes[box][0][1], boxes[box][1][1]);
	
		var add = false;
		if (ey1 >= y1 && ey1 <= y2) { add = true; }
		if (ey2 >= y1 && ey2 <= y2) { add = true; }
		if (ey1  < y1 && ey2  > y2) { add = true; }
		
		if (add) {
			var overlap = [Math.min(Q[j],  box), Math.max(Q[j],  box)];
			overlaps.push(overlap);
		}
	}
	return overlaps;
}



