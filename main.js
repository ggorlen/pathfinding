"use strict";


const canvas = document.createElement("canvas");
canvas.height = canvas.width = Math.min(innerWidth, innerHeight) / 1.2;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
const gridSize = canvas.width / 30;
const lineWidth = Math.max(2, gridSize / 3 | 0);
const grid = new Grid(30, 30);
const mouse = {};

const init = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < grid.cells.length; i++) {
    for (let j = 0; j < grid.cells[i].length; j++) {
      if (Math.random() > 0.75) {
          grid.cells[i][j].empty = false; 
      }
    }
  }
  
  for (let i = 0; i < 4; i++) {
    grid.cells[i][0].empty = true;
    grid.cells[0][i].empty = true;
  }
  
  grid.draw(ctx, gridSize);
};

const handleMouse = e => {
  const newMouse = {
    x: e.offsetX / gridSize | 0,
    y: e.offsetY / gridSize | 0
  };

  if (grid.cells[newMouse.y] && 
      grid.cells[newMouse.y][newMouse.x]) {

    handleToggle(newMouse, mouse, grid);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw(ctx, gridSize);

    //drawPath(new Greedy(grid).search(
    //  grid.cells[0][0], 
    //  grid.cells[newMouse.y][newMouse.x]
    //), ctx, "rgba(0, 0, 255, 0.8)", gridSize, lineWidth);

    drawPath(new AStar(grid).search(
      grid.cells[0][0], 
      grid.cells[newMouse.y][newMouse.x]
    ), ctx, "rgba(0, 0, 0, 1)", gridSize, lineWidth);

    mouse.x = newMouse.x;
    mouse.y = newMouse.y;
  }
};

const handleToggle = (newMouse, mouse, grid) => {
  if (mouse.down && (newMouse.x !== mouse.x || newMouse.y !== mouse.y)) {
    grid.cells[newMouse.y][newMouse.x].empty = 
      !grid.cells[newMouse.y][newMouse.x].empty;
  }
};

const drawPath = (path, ctx, color, gridSize, lineWidth) => {
  if (path && path.length) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(
      path[0].x + gridSize / 2, 
      path[0].y + gridSize / 2
    );

    for (let i = 0; i < path.length; i++) {
      ctx.lineTo(
        path[i].x * gridSize + gridSize / 2, 
        path[i].y * gridSize + gridSize / 2
      );
    }

    ctx.stroke();
  }
};

canvas.addEventListener("mousemove", handleMouse);
canvas.addEventListener("mouseup", e => mouse.down = false);
canvas.addEventListener("mousedown", e => {
  mouse.down = true;
  handleMouse(e);
});

init();
