"use strict";


const Greedy = function (grid, heuristic) {
  this.grid = grid;
  this.heuristic = heuristic || function (a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };
}

Greedy.prototype = {
  search: function (start, goal) {
    const frontier = new PriorityQueue();
    frontier.add(start, 0);
    const cameFrom = {};
    cameFrom[this.keyify(start)] = null;

    while (frontier.size()) {
      const current = frontier.poll();

      if (current.x === goal.x && current.y === goal.y) {
        return this.getPath(goal, cameFrom);
      }

      const neighbors = grid.getNeighbors(current);  

      for (let i = 0; i < neighbors.length; i++) {
        if (!(this.keyify(neighbors[i]) in cameFrom)) {
          frontier.add(
            neighbors[i],
            this.heuristic(goal, neighbors[i])
          );
          cameFrom[this.keyify(neighbors[i])] = current;
        }
      }
    }
  },

  getPath: function (goal, cameFrom) {
    const path = [];
    let current = goal;
    
    while (cameFrom[this.keyify(current)]) {
      path.unshift(current);
      current = cameFrom[this.keyify(current)];
    }

    return path;
  },

  keyify: function (cell) {
    return cell.x + "_" + cell.y;
  }
};
