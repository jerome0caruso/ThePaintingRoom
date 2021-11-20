const canvas = document.querySelector("#canvas"); //grabs the drawing pad
const ctx = canvas.getContext("2d");//seting the canvas to 2D
const container = document.querySelector('.mainContainer');
const color = document.querySelector('.colorPicker');
//setting the canvas size to window size
canvas.width  = 1250;
canvas.height = 850;

document.addEventListener('click', () => {
    color.value
    console.log(typeof color.value)
})
ctx.strokeStyle = color.value;//starting color
ctx.lineJoin = "miter";//shape 
ctx.lineCap = "square";
ctx.lineWidth = 50;//size of pen
ctx.globalCompositeOperation = "multiply"; //  blend mode


//flags
let isDrawing = false;// to determine when mouse is (clicked)down
let direction = true;
//postions
let lastX = 0;
let lastY = 0;

let hue = 0;


function draw(e) { //event gives us X and Y axis
    if (!isDrawing) return; //stops when not mouse is down otherwise =>
    ctx.strokeStyle = color.value;// sets hue, saturation, lightness
    ctx.beginPath(); //starts the drawing
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY);//go to where mouse is
    ctx.stroke(); //calls method to allow drawing(req)
    [lastX, lastY] = [e.offsetX, e.offsetY];// updates where mouse is

    hue++; //increments the hue to go through range of spectrum
    if (hue >= 360) {
        hue = 0; //resets hue
    }
}
canvas.addEventListener("mousedown", (e) => { // mouse down to draw
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //updates the x and y istead of starting at (0, 0)
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);