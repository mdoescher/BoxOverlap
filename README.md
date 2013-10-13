BoxOverlap
=======
Takes an array of boxes and reports overlapping boxes.  The boxes are defined as arrays of two points representing opposite corners of the box.  Each point is an array of (x, y) coordinates.

## Install
Using npm:

		npm install boxoverlap

## Example

```javascript
var boxOverlap = require("boxoverlap")

var b0 = [[0, 0], [1,1]];
var b1 = [[0.5, 0.5], [0.75,0.75]];
var b2 = [[2, 0], [3,1]];
var b3 = [[2.5, -10], [2.75,10]];
var b4 = [[5, 0], [4,1]];
var b5 = [[4.5, 0.5], [5.5,1.5]];
var b6 = [[0, 2], [1, 11 ]];
var b7 = [[3, 0], [4,1]];
var boxes = [b0, b1, b2, b3, b4, b5, b6, b7];
var result = boxOverlap(boxes);
console.log(result);

//Prints:
//  [[0, 1], [2, 3], [2, 7], [4, 7], [4, 5]]
```

## API

### `require("boxoverlap")(boxes)`
Determines which boxes from a list overlap.

* `boxes` is an array of box coordinates
* the box coordinates are each composed of an array of two points representing opposite corners of the box
* the points are arrays of length 2 of numbers representing x and y coordinates.

**Returns** An array of length 2 arrays which indicate the index into the box array of every pair of overlapping boxes.

## Implementation 
Inspired by the plane sweep based segment - segment intersection from O'Rourke's Computational Geometry in C 2nd.

Implementation (c) 2013 Michael Doescher.  MIT License
