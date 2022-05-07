function ChessBoard(element, rows, cols) {
  this.rowLength = rows;
  this.colLength = cols;
  this.cells = [];
  // Generating chess board grid
  this.init(element, rows, cols);
}

ChessBoard.prototype.init = function (element, rows, cols) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < rows; i++) {
    const rowEle = document.createElement("div");
    rowEle.classList.add("row");
    for (let j = 0; j < cols; j++) {
      const colEle = document.createElement("div");
      colEle.dataset.pos = `${i}-${j}`;
      colEle.onclick = (event) => {
        this.onClickCell(event);
      };
      colEle.classList.add("col");
      this.fillChessCell(colEle, i, j);
      rowEle.appendChild(colEle);
    }
    fragment.appendChild(rowEle);
  }
  element.appendChild(fragment);
};

ChessBoard.prototype.onClickCell = function (event) {
  // Todo clean previous selected element & diagonals
  this.removePreviousDiagonalColos(this.cells);
  const currentEle = event.target;
  const [row, col] = currentEle.dataset.pos.split("-");
  this.cells = this.findDiagonals(Number(row), Number(col));
  console.log(this.cells);
  this.applyFocusColor(this.cells);
};

ChessBoard.prototype.fillChessCell = (element, row, col) => {
  if (row % 2 === 0) {
    if (col % 2 === 0) {
      element.style.backgroundColor = "white";
    } else {
      element.style.backgroundColor = "black";
    }
  } else {
    if (col % 2 === 0) {
      element.style.backgroundColor = "black";
    } else {
      element.style.backgroundColor = "white";
    }
  }
};

ChessBoard.prototype.findDiagonals = function (row, col) {
  const result = [];
  result.push(`${row}-${col}`);
  // First iagonal
  /*
    0  x  0  0
    0  0 [x] 0
    0  0  0  x
    0  0  0  0
  */
  // Top cells
  let cRow = row,
    cCol = col;
  while (
    cRow !== 0 &&
    cRow <= this.rowLength - 1 &&
    cCol !== 0 &&
    cCol <= this.colLength - 1
  ) {
    result.push(`${--cRow}-${--cCol}`);
  }

  // Bottom cells
  cRow = row;
  cCol = col;
  while (
    cRow >= 0 &&
    cRow !== this.rowLength - 1 &&
    cCol >= 0 &&
    cCol !== this.colLength - 1
  ) {
    result.push(`${++cRow}-${++cCol}`);
  }

  // Second Diagonal
  /*
    0  0  0  x
    0  0 [x] 0
    0  x  0  0
    x  0  0  0
  */

  // Top cells
  cRow = row;
  cCol = col;
  while (
    cRow !== 0 &&
    cRow <= this.rowLength - 1 &&
    cCol >= 0 &&
    cCol !== this.colLength - 1
  ) {
    result.push(`${--cRow}-${++cCol}`);
  }

  // Bottom cells
  cRow = row;
  cCol = col;
  while (
    cRow >= 0 &&
    cRow !== this.rowLength - 1 &&
    cCol !== 0 &&
    cCol <= this.colLength - 1
  ) {
    result.push(`${++cRow}-${--cCol}`);
  }

  return result;
};

ChessBoard.prototype.applyFocusColor = function (prevCells) {
  for (let cell of prevCells) {
    const cellEle = document.querySelector(`[data-pos='${cell}']`);
    cellEle.style.backgroundColor = "#B20600";
  }
};

ChessBoard.prototype.removePreviousDiagonalColos = function (prevCells) {
  for (let cell of prevCells) {
    const cellEle = document.querySelector(`[data-pos='${cell}']`);
    const [row, col] = cell.split("-");
    this.fillChessCell(cellEle, row, col);
  }
};

new ChessBoard(document.getElementById("board"), 8, 8);
