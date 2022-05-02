function PixelArt(el, rows, cols) {
  let selectedColor = "black";

  // Logic for generating grid layout
  let gridEle = document.querySelector(el);
  let fragment = document.createDocumentFragment();
  gridEle.style.grid = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
  for (let i = 0; i < rows * cols; i++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.addEventListener("click", applyColorOnClick);
    div.addEventListener("mousedown", onMouseDown);
    div.addEventListener("mousemove", onMouseMove);
    div.addEventListener("mouseup", onMouseUp);
    fragment.appendChild(div);
  }
  gridEle.appendChild(fragment);

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
    gridCellEle.style.backgroundColor = selectedColor;
  }

  // apply color on keydown hover
  let isMouseDown = false;
  function onMouseDown(event) {
    isMouseDown = true;
  }

  function onMouseMove(event) {
    if (isMouseDown) {
      let gridCellEle = event.target;
      gridCellEle.style.backgroundColor = selectedColor;
    }
  }

  function onMouseUp(event) {
    isMouseDown = false;
  }
}

new PixelArt("#grid", 10, 10);
