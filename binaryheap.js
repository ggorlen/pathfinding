/*
 * References:
 * - http://faculty.cs.niu.edu/~freedman/340/340notes/340heap.htm
 * - https://www.geeksforgeeks.org/heap-sort/
 * - https://jsfiddle.net/GRIFFnDOOR/A73x5/
 * - http://eloquentjavascript.net/1st_edition/appendix2.html
 * - https://codeburst.io/implementing-a-complete-binary-heap-in-javascript-the-priority-queue-7d85bd256ecf
 * - https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82
 */

"use strict";


const BinaryHeap = function (data, comparator) {
  this.compare = comparator || ((a, b) => a - b);
  this.heapify(data);
};

BinaryHeap.prototype = {
  heapify: function (data) {
    this._data = JSON.parse(JSON.stringify(data));
    this._data.unshift(null);
    
    // starting with the left child of the root
    for (let i = this._data.length / 2 | 0; i >/*=*/ 0; i--) {
      this._sink(i);
    }
  },
  
  peek: function () {
  	return this._data[1];
  },

  pop: function () {
    if (this.size() === 1) {
    	return this._data.pop();
    }
    
    else if (this.size() > 1) {
      const popped = this._data[1];
      this._data[1] = this._data.pop();
      this._sink(1);
	    return popped;
    }
  },
  
  push: function (elem) {
    this._bubble(this._data.push(elem) - 1);
  },
  
  size: function () {
    return this._data.length - 1;
  },

  sort: function () {
  	let i = this.size();

    while (i > 1) {
      this._swap(1, i);
      i--;
      this._sink(1, i);
    }
  },
  
	toArray: function () {
  	return this._data.slice(1);
  },
  
  toString: function () {
  	return this.toArray().toString();
  },

  _bubble: function (i) {
    let parentIdx = i / 2 | 0;
  	
    while (parentIdx > 0 && 
      this.compare(this._data[i], this._data[parentIdx]) < 0) {
      this._swap(parentIdx, i);
      i = parentIdx;
      parentIdx = i / 2 | 0;
    }
  },

  _sink: function (parentIdx, endIdx) {
    parentIdx = parentIdx || 1;     // root index
    endIdx = endIdx || this.size(); // last element index in the data array
    let childIdx = parentIdx * 2;   // left child index of root

    while (childIdx <= endIdx) {

      // switch to right child if it is smaller than the left
      if (childIdx < endIdx && 
          this.compare(this._data[childIdx+1], this._data[childIdx]) < 0) {
        childIdx++;
      }
    
      // swap parent and child or exit the loop
      if (this.compare(this._data[childIdx], this._data[parentIdx]) < 0) {
        this._swap(parentIdx, childIdx);

        // make largest child the new parent and find its left child
        parentIdx = childIdx;
        childIdx = parentIdx * 2;
      }
      else {
        break;
      }
    }
  },
  
  _swap: function (a, b) {
    const temp = this._data[a];
    this._data[a] = this._data[b];
    this._data[b] = temp;
  },
};
