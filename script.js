const DEFAULT_BRUSH_COLOR = '#000000'
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF'
const DEFAULT_MODE = "color"
const DEFAULT_SHOW_GRID_LINES = true
const DEFAULT_ROWS = 15
const DEFAULT_COLUMNS = 15

let currentBrushColor = DEFAULT_BRUSH_COLOR
let currentBackgroundColor = DEFAULT_BACKGROUND_COLOR
let currentMode = DEFAULT_MODE
let currentShowGridLines = DEFAULT_SHOW_GRID_LINES
let currentRows = DEFAULT_ROWS
let currentColumns = DEFAULT_COLUMNS

function setPenColor(newPenColor) {
    currentBrushColor = newPenColor
}

function setBackgroundColor(newBackgroundColor) {
    currentBackgroundColor = newBackgroundColor
}

function setCurrentMode(newMode) {
    showPressedButton(newMode)
    currentMode = newMode
}

function setCurrentShowGridLines(newShowGridLines) {
    currentShowGridLines = newShowGridLines
}

function setCurrentRows(newRows) {
    currentRows = newRows
}

function setCurrentColumns(newColumns) {
    currentColumns = newColumns
}

const brushColorPicker = document.getElementById("brushColorPicker")
const brushColorButton = document.getElementById("brushButton")
brushColorPicker.oninput = (e) => setPenColor(e.target.value)
brushColorButton.onclick = () => setCurrentMode("color")

const rainbowColorButton = document.getElementById("rainbowButton")
rainbowColorButton.onclick = () => setCurrentMode("rainbow")

const eraserButton = document.getElementById("eraserButton")
eraserButton.onclick = () => setCurrentMode("eraser")

function showPressedButton(newMode) {
    if (currentMode == "color")
        brushColorButton.classList.remove("active")
    else if (currentMode == "rainbow")
        rainbowColorButton.classList.remove("active")
    else if (currentMode == "eraser")
        eraserButton.classList.remove("active")

    if (newMode == "color")
        brushColorButton.classList.add("active")
    else if (newMode == "rainbow")
        rainbowColorButton.classList.add("active")
    else if (newMode == "eraser")
        eraserButton.classList.add("active")
}

const clearButton = document.getElementById("clearButton")
clearButton.onclick = () => reloadGrid()

const backgroundColorPicker = document.getElementById("backgroundColorPicker")
backgroundColorPicker.onInput = (e) => setBackgroundColor(e.target.value)

const gridLinesButton = document.getElementById("gridLinesButton")
gridLinesButton.onclick = () => toggleGridLines()
function toggleGridLines() {
    setCurrentShowGridLines(!currentShowGridLines)
    setGridLines()
}

function setGridLines() {
    let squares = document.querySelectorAll(".square")
    for (let i = 0; i < squares.length; i++) {
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
            square.addEventListener("mouseover", changeColor)
            square.addEventListener("mousedown", changeColor)
            grid.appendChild(square)
        }
    }

    setGridLines()
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
function changeColor(e) {
    if (e.type == "mouseover" && !mouseDown)
        return
    if (currentMode == "color") {
        e.target.style.backgroundColor = currentBrushColor
        // e.target.setAttribute("data-inked", "true")
    }
    else if (currentMode == "rainbow") {
        const randomRed = Math.floor(Math.random() * 256)
        const randomGreen = Math.floor(Math.random() * 256)
        const randomBlue = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
        // e.target.setAttribute("data-inked", "true")
    }
    else if (currentMode == "eraser")
    {
        e.target.style.backgroundColor = currentBackgroundColor
        // e.target.removeAttribute("data-inked")
    }
}

const rowSlider = document.getElementById("rowSlider")
rowSlider.onmousemove = (e) => updateRowsValue(e.target.value)
rowSlider.onchange = (e) => changeNumberOfRows(e.target.value)
function changeNumberOfRows(newRows) {
    setCurrentRows(parseInt(newRows))
    updateRowsValue(newRows)
    reloadGrid()
}

const columnSlider = document.getElementById("columnSlider")
columnSlider.onmousemove = (e) => updateColumnsValue(e.target.value)
columnSlider.onchange = (e) => changeNumberOfColumns(e.target.value)
function changeNumberOfColumns(newColumns) {
    setCurrentColumns(parseInt(newColumns))
    updateColumnsValue(newColumns)
    reloadGrid()
}

const sizeValue = document.getElementById("sizeValue")
function updateRowsValue(newRows) {
    sizeValue.innerHTML = `${newRows} &times ${currentColumns}`
}

function updateColumnsValue(newColumns) {
    sizeValue.innerHTML = `${currentRows} &times ${newColumns}`
}

function resizeSquares() {
    const grid = document.getElementById("grid")
    if (currentRows == currentColumns)
    {
        grid.style.width = "600px"
        grid.style.height = "600px"
    }
    else if (currentRows > currentColumns)
    {
        grid.style.height = "600px"
        const newWidth = 600 / currentRows * currentColumns
        grid.style.width = newWidth.toString() + "px"
    }
    else if (currentColumns > currentRows)
    {
        grid.style.width = "600px"
        const newHeight = 600 / currentColumns * currentRows
        grid.style.height = newHeight.toString() + "px"
    }
}

function reloadGrid() {
    deleteGrid()
    setupGrid(currentRows, currentColumns)
    resizeSquares()
}

function deleteGrid() {
    grid.innerHTML = ""
}

setupGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
showPressedButton(DEFAULT_MODE)