const canvas = document.querySelector("#canvas"); //grabs the drawing pad
const ctx = canvas.getContext("2d");//seting the canvas to 2D
const container = document.querySelector('.mainContainer');
const innerContainer = document.querySelector('.innerContainer');
const color = document.querySelector('.colorPicker');
const squareShape = document.querySelector('.shape-square-container');
const circleShape = document.querySelector('.shape-circle-container');
const lineShape = document.querySelector('.shape-line-container');
const drawCircleBtn = document.querySelector('.draw-circle');
const drawSquareBtn = document.querySelector('.draw-square');
const clearBtn = document.querySelector('.clear')
const sizeInput = document.querySelector('.sizeInput');
const allShapes = [squareShape, circleShape, lineShape];
let size = 50;
let circle = {}

(function getResolution() {
    console.log(screen.width, "herer")
    console.log(screen.height)
})()

//checking screen res

//setting the canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    ctx.lineWidth = size;//size of pen
})


ctx.strokeStyle = color.value;//starting color
ctx.lineJoin = "round";//shape 
ctx.lineCap = "square";
ctx.lineWidth = size;//size of pen
//ctx.globalCompositeOperation = "multiply"; //  blend mode


//flags
let isDrawing = false;// to determine when mouse is (clicked)down
let direction = true;
let createCircle = false;
let createSquare = false;
//postions
let lastX = 0;
let lastY = 0;

//draw, mouse and click fn
function draw(e) { //event gives us X and Y axis
    if (!isDrawing || createCircle || createSquare) return; //stops when not mouse is down otherwise =>
    ctx.strokeStyle = color.value;// sets hue, saturation, lightness
    ctx.beginPath(); //starts the drawing
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY);//go to where mouse is
    ctx.stroke(); //calls method to allow drawing(req)
    [lastX, lastY] = [e.offsetX, e.offsetY];// updates where mouse is
}

//set flags for drawing shapes
function setDrawShapes(circle, square) {
    createCircle = circle;
    createSquare = square;
}

//creates the shape
function shapeStyle(shape) {
    console.log(shape)
    setDrawShapes(false, false, false);
    ctx.lineCap = shape;
}

//create circle
function drawCircle() {
    if(createCircle) {
        circle = {
            x: lastX,
            y: lastY,
            size: size
        }
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = color.value;
        ctx.fill();
    }
}
//create square
function drawSquare() {
    if(createSquare) {
        square = {
            x: lastX,
            y: lastY,
            size: size
        }
        ctx.fillStyle = color.value;
        ctx.fillRect(square.x - (size / 2), square.y - (size / 2), square.size, square.size)
    }
}

//sets the size of line
function adjustSize (e) {
    ctx.lineWidth = e.target.value;
    size = e.target.value;
}

//adds addEventListener to all elements
(function addListeners() {
    allShapes.forEach(shape => {
        const shapeKey = shape.getAttribute('data-key');
        shape.addEventListener('click', () => shapeStyle(shapeKey));
    })
})()

//track mouse
canvas.addEventListener("mousedown", (e) => { // mouse down to draw
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //updates the x and y istead of starting at (0, 0)
});

// add EventListeners 
document.addEventListener('click', () => color.value);
sizeInput.addEventListener('input', (e) => adjustSize(e))
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);   
drawCircleBtn.addEventListener('click', () => setDrawShapes(true, false));
drawSquareBtn.addEventListener('click', () => setDrawShapes(false, true));
clearBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)});
canvas.addEventListener('click', () => {
    drawCircle();
    drawSquare();
});



//nav 
canvas.addEventListener("touchmove", function (e) {
    document.body.classList.add("stop-scrolling");
    window.scrollBy(0,1);

    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX ,
      clientY: touch.clientY - 105
    });
    ctx.strokeStyle = color.value;// sets hue, saturation, lightness
    ctx.beginPath(); //starts the drawing
    ctx.moveTo(mouseEvent.clientX, mouseEvent.clientY); // start from
    ctx.lineTo(mouseEvent.clientX , mouseEvent.clientY);//go to where mouse is
    ctx.stroke(); //calls method to allow drawing(req)
    canvas.dispatchEvent(mouseEvent);
  }, false);

  canvas.addEventListener("touchend", () => document.body.classList.remove("stop-scrolling"))
  
