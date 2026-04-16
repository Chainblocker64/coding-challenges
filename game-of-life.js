function startGame(mode) {
  //Create 50*50 grid
  let grid = Array(50).fill(Array(50).fill("#"));
  grid = randomizeGrid(grid);
  console.log(render(grid));
  setInterval(() => {
    //Update grid with new generation and render
    grid = generationTick(grid);
  }, 2000);
}

function generationTick(grid) {
  let newGeneration = grid;

  //Iterate over each cell to count living neighbours and apply rules
  grid.forEach((row, rowIndex) => {
    row.forEach((cells, cellIndex) => {
      const currentCell = row[cellIndex];

      /**
       * Count living neighbours for the rows above and below the current one
       */
      let livingNeighbours = 0;

      const rowAbove = row[rowIndex - 1] || [];
      const rowBelow = row[rowIndex + 1] || [];

      livingNeighbours += countLivingNeighbours(rowAbove, cellIndex);
      livingNeighbours += countLivingNeighbours(rowBelow, cellIndex);

      /**
       * Count living neighbours in the current row
       */
      const leftCell = row[cellIndex - 1] || "";
      const rightCell = row[cellIndex - 1] || "";

      [leftCell, rightCell].forEach((cell) => {
        if (isAlive(cell)) {
          livingNeighbours++;
        }
      });

      /**
       * Apply rules to current cell
       */
      switch (livingNeighbours) {
        case 0:
        case 1:
        //Default = more than 3
        default:
          newGeneration[rowIndex][cellIndex] = ".";
          break;
        case 2:
          break;
        case 3:
          newGeneration[rowIndex][cellIndex] = "#";
          break;
      }
    });
  });
  console.clear();
  console.log(render(newGeneration));
  return newGeneration;
}

function countLivingNeighbours(row, cellIndex) {
  if (row.length == 0) {
    return 0;
  }

  let livingNeighbours = 0;

  /**
   * Maybe we don't have to read out manually but array.slice for example would wrap around to another cell if we are on the left-most
   * cell for example
   */
  const leftCell = row[cellIndex - 1] || "";
  const middleCell = row[cellIndex] || "";
  const rightCell = row[cellIndex + 1] || "";

  cellsToCheck = [leftCell, middleCell, rightCell];

  cellsToCheck.forEach((cell) => {
    if (isAlive(cell)) {
      livingNeighbours++;
    }
  });

  return livingNeighbours;
}

function isAlive(cell) {
  return cell == "#" ? true : false;
}

function render(grid) {
  let output = "";
  grid.forEach((row) => {
    output += row.join("") + "\n";
  });
  return output;
}

function applyMode(mode, grid) {
  //TODO logic for applying modes
  switch (mode) {
    case "":
  }
}

function randomizeGrid(grid) {
  grid.forEach((row, rowIndex) => {
    row.forEach((cells, cellIndex) => {
      rand = Math.random();

      if (rand >= 0.5) {
        grid[rowIndex][cellIndex] = ".";
      } else {
        grid[rowIndex][cellIndex] = "#";
      }
    });
  });

  return grid;
}
