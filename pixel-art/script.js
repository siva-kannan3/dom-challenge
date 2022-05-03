function PixelArt(el, rows, cols) {
  let selectedColor = "black";

  // Logic for generating grid layout
  let gridEle = document.querySelector(el);
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

  gridEle.addEventListener("click", applyColorOnClick);
  gridEle.addEventListener("mousedown", onMouseDown);
  gridEle.addEventListener("mousemove", onMouseMove);
  gridEle.addEventListener("mouseup", onMouseUp);

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

  // apply color on click
  function applyColorOnClick(event) {
    let gridCellEle = event.target;
    if (gridCellEle.dataset["position"]) {
      gridCellEle.style.backgroundColor = selectedColor;
    }
  }

  // apply color on keydown hover
  let isMouseDown = false;
  function onMouseDown(event) {
    isMouseDown = true;
  }

  function onMouseMove(event) {
    if (isMouseDown) {
      let gridCellEle = event.target;
      if (gridCellEle.dataset["position"]) {
        gridCellEle.style.backgroundColor = selectedColor;
      }
    }
  }

  function onMouseUp(event) {
    isMouseDown = false;
  }
}

new PixelArt("#grid", 16, 10);
