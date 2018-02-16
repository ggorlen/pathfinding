"use strict";


const Grid = function (width, height) {
  this.init(width, height);
};

Grid.prototype = {
  init: function (width, height) {
    this.cells = [];

    for (let i = 0; i < height; i++) {
      this.cells.push([]);

      for (let j = 0; j < width; j++) {
        this.cells[i][j] = { 
          x: j,
          y: i,
          empty: true
        };
      }
    }
  },

  getNeighbors: function (cell) {
    const neighbors = [];
    [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ].forEach(e => {
      if (this.cells[cell.y+e.y] && 
          this.cells[cell.y+e.y][cell.x+e.x] && 
          this.cells[cell.y+e.y][cell.x+e.x].empty) {
        neighbors.push(this.cells[cell.y+e.y][cell.x+e.x]);
      }
    });
    return neighbors;
  },

  draw: function (ctx, size) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        ctx.fillStyle = this.cells[i][j].empty ? "#fff" : "#444";
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;
        ctx.fillRect(j * gridSize, i * gridSize, size, size);
        ctx.strokeRect(j * gridSize, i * gridSize, size, size);
      }
    }
  }
};
