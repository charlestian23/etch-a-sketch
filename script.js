const DEFAULT_PEN_COLOR = '#333333'
const DEFAULT_BACKGROUND_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SHOW_GRID_LINES = false
const DEFAULT_SIZE = 10

let currentPenColor = DEFAULT_PEN_COLOR
let currentBackgroundColor = DEFAULT_BACKGROUND_COLOR
let currentMode = DEFAULT_MODE
let currentShowGridLines = DEFAULT_SHOW_GRID_LINES
let currentSize = DEFAULT_SIZE

function setColor(newColor) {
    currentPenColor = newColor
}

// function setMode(newMode) {
//     showPressedButton(newMode)
//     currentMode = newMode
// }

function setSize(newSize) {
    currentSize = newSize
}

const grid = document.getElementById("grid")
function setupGrid(rows, columns) {
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const square = document.createElement("div")
            square.classList.add("square")
            // square.addEventListener("mouseover", changeColor);
            // square.addEventListener("mousedown", changeColor)
            grid.appendChild(square)
        }
    }
}

setupGrid(DEFAULT_SIZE, DEFAULT_SIZE);
