function PixelArt(el, rows, cols) {
  let selectedColor = "black";
  let cellTrack = [];
  let cellTrackPosition = -1;

  // Logic for generating grid layout
  let gridEle = document.querySelector(el);
  const undoButton = document.getElementById("undo");
  const redoButton = document.getElementById("redo");
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < rows; i++) {
    let rowEle = document.createElement("div");
    rowEle.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let colEle = document.createElement("div");
      colEle.classList.add("box");
      colEle.dataset.position = `${i + 1}-${j + 1}`;
      rowEle.appendChild(colEle);
    }
    fragment.appendChild(rowEle);
  }
  gridEle.appendChild(fragment);

  // gridEle.addEventListener("click", applyColorOnClick);
  gridEle.addEventListener("mousedown", onMouseDown);
  gridEle.addEventListener("mousemove", onMouseMove);
  gridEle.addEventListener("mouseup", onMouseUp);

  // Undo
  const handleUndo = () => {
    if (cellTrackPosition >= 0) {
      let currentApplied = cellTrack[cellTrackPosition];
      let modifiedEle = document.querySelector(
        `[data-position='${currentApplied.row}-${currentApplied.col}']`
      );
      let prev = cellTrack.find((cell, index) => {
        return (
          index < cellTrackPosition &&
          cell.row === currentApplied.row &&
          cell.col === currentApplied.col
        );
      });
      if (prev) {
        modifiedEle.style.backgroundColor = prev.currentColor;
      } else {
        modifiedEle.style.backgroundColor = "transparent";
      }
      cellTrackPosition--;
    }
  };

  // Redo
  const handleRedo = () => {
    if (cellTrackPosition !== cellTrack.length - 1) {
      let nextToExec = cellTrack[cellTrackPosition + 1];
      let modifiedEle = document.querySelector(
        `[data-position='${nextToExec.row}-${nextToExec.col}']`
      );
      modifiedEle.style.backgroundColor = nextToExec.currentColor;
      cellTrackPosition++;
    }
  };

  // Color selection
  let colorBoxList = document.querySelectorAll(".color");
  for (let i = 0; i < colorBoxList.length; i++) {
    colorBoxList[i].addEventListener("click", selectColor);
  }
  function selectColor(event) {
    let dataset = event.target.dataset;
    selectedColor = dataset.color;
    toggleActiveColor();
    event.target.classList.add("active");
  }
  function toggleActiveColor() {
    for (let i = 0; i < colorBoxList.length; i++) {
      colorBoxList[i].classList.remove("active");
    }
  }

  // handleTrackingOfUserFlow
  const handleTrackingOfUserFlow = (row, col, currentColor) => {
    if (cellTrackPosition !== cellTrack.length - 1) {
      if (cellTrackPosition === -1) {
        cellTrack = cellTrack.slice(0);
      } else {
        cellTrack = cellTrack.slice(0, cellTrackPosition + 1);
      }
    }
    let prev = cellTrack[cellTrackPosition];
    if (prev) {
      // on mouse over on same cell
      let sameCell =
        prev.row === row &&
        prev.col === col &&
        prev.currentColor === currentColor;

      if (!sameCell) {
        cellTrack.push({
          row,
          col,
          currentColor,
        });
        cellTrackPosition++;
      }
    } else {
      cellTrack.push({
        row,
        col,
        currentColor,
      });
      cellTrackPosition++;
    }
  };

  // apply color on mouse down
  let isMouseDown = false;
  function onMouseDown(event) {
    isMouseDown = true;
    let gridCellEle = event.target;
    if (gridCellEle.dataset["position"]) {
      gridCellEle.style.backgroundColor = selectedColor;
      let position = gridCellEle.dataset["position"].split("-");
      handleTrackingOfUserFlow(
        position[0],
        position[1],
        gridCellEle.style.backgroundColor
      );
    }
  }

  // apply color on mouse hover
  function onMouseMove(event) {
    if (isMouseDown) {
      let gridCellEle = event.target;
      if (gridCellEle.dataset["position"]) {
        gridCellEle.style.backgroundColor = selectedColor;
        let position = gridCellEle.dataset["position"].split("-");
        handleTrackingOfUserFlow(
          position[0],
          position[1],
          gridCellEle.style.backgroundColor
        );
      }
    }
  }

  function onMouseUp(event) {
    isMouseDown = false;
  }

  undoButton.addEventListener("click", handleUndo);
  redoButton.addEventListener("click", handleRedo);
}

new PixelArt("#grid", 10, 10);
