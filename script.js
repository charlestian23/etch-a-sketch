const DEFAULT_PEN_COLOR = '#333333'
const DEFAULT_BACKGROUND_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SHOW_GRID_LINES = true
const DEFAULT_ROWS = 15
const DEFAULT_COLUMNS = 15

let currentPenColor = DEFAULT_PEN_COLOR
let currentBackgroundColor = DEFAULT_BACKGROUND_COLOR
let currentMode = DEFAULT_MODE
let currentShowGridLines = DEFAULT_SHOW_GRID_LINES
let currentRows = DEFAULT_ROWS
let currentColumns = DEFAULT_COLUMNS

function setPenColor(newPenColor) {
    currentPenColor = newPenColor
}

function setBackgroundColor(newBackgroundColor) {
    currentBackgroundColor = newBackgroundColor
}

function setMode(newMode) {
    showPressedButton(newMode)
    currentMode = newMode
}

function setShowGridLines(newShowGridLines) {
    currentShowGridLines = newShowGridLines
}

function setRows(newRows) {
    currentRows = newRows
}

function setColumns(newColumns) {
    currentColumns = newColumns
}

const brushColorPicker = document.getElementById("brushColorPicker")
brushColorPicker.onInput = (e) => setPenColor(e.target.value)

const backgroundColorPicker = document.getElementById("backgroundColorPicker")
backgroundColorPicker.onInput = (e) => setBackgroundColor(e.target.value)

const gridLinesButton = document.getElementById("gridLinesButton")
gridLinesButton.onclick = () => toggleGridLines()
function toggleGridLines() {
    currentShowGridLines = !currentShowGridLines
    setGridLines()
}

function setGridLines() {
    let squares = document.querySelectorAll(".square")
    for (let i = 0; i < squares.length; i++) {
        console.log(squares)
        if (currentShowGridLines) {
            squares[i].style.borderTop = "0.1rem solid black"
            squares[i].style.borderRight = "0.1rem solid black"
        }
        else {
            squares[i].style.borderTop = "none"
            squares[i].style.borderRight = "none"
        }
    }

    for (let i = 0; i < currentColumns; i++) {
        squares[i].style.borderTop = "0.1rem solid black";
        squares[squares.length - 1 - i].style.borderBottom = "0.1rem solid black";
    }
    for (let i = 0; i < currentRows; i++) {
        squares[i * currentColumns].style.borderLeft = "0.1rem solid black";
        squares[(i + 1) * currentColumns - 1].style.borderRight = "0.1rem solid black";
    }
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

    setGridLines()
}

setupGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
