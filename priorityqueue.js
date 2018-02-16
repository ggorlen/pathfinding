"use strict";


const PriorityQueue = function (comparator) {
	this._heap = new BinaryHeap([], comparator || 
    ((a, b) => a.priority - b.priority)
  );
};

PriorityQueue.prototype = {
	add: function (elem, priority) {
    return this._heap.push(
      new PriorityNode(elem, priority)
    );
  },
  
	poll: function () {
  	const node = this._heap.pop();
    return node && node.data ? node.data : null;
  },
  
  peek: function () {
  	return this._heap.peek().data;
  },
  
  size: function () {
  	return this._heap.size();
  },
  
  toArray: function () {
  	return this._heap
      .toArray()
      .map(e => e.data);
  },
  
  toString: function () {
  	return this.toArray().toString();
  }
};
