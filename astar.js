"use strict";


const AStar = function (grid, heuristic) {
  this.grid = grid;
  this.heuristic = heuristic || function (a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };
}

AStar.prototype = {
  search: function (start, goal) {
    const frontier = new PriorityQueue();
    const cameFrom = {};
    const costSoFar = {};

    frontier.add(start, 0);
    cameFrom[this.keyify(start)] = null;
    costSoFar[this.keyify(start)] = 0;

    while (frontier.size()) {
      const current = frontier.poll();
      const currKey = this.keyify(current);

      if (current.x === goal.x && current.y === goal.y) {
        return this.getPath(goal, cameFrom);
      }

      grid.getNeighbors(current).forEach(e => {  
        const neighborKey = this.keyify(e);
        const newCost = costSoFar[currKey] + 
          (this.grid.cost ? this.grid.cost(current, e) : 1);

        if (!(neighborKey in costSoFar) || 
            newCost < costSoFar[neighborKey]) {
          costSoFar[neighborKey] = newCost;
          frontier.add(e, this.heuristic(goal, e) + newCost);
          cameFrom[neighborKey] = current;
        }
      });
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

  keyify: function (cell) { return cell.x + "_" + cell.y; }
};
