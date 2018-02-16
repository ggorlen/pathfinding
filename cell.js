"use strict";


const Cell = function (x, y, empty) {
  this.x = x;
  this.y = y;
  this.empty = empty || true;
  this.neighbors = [];
};

Cell.prototype = {
  setNeighbors: function (grid) {
    [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ].forEach(e => {
      if (grid[this.y+e.y] && 
          grid[this.y+e.y][this.x+e.x] && 
          grid[this.y+e.y][this.x+e.x].empty) {
        this.neighbors.push(grid[this.y+e.y][this.x+e.x]);
      }
    });
  }
};
