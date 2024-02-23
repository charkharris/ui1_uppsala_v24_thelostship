/**
 * In this file we have used the new representation of the ball. It has already earlier been
 * defined as a graphic object, and will now be used to create a number of instances. Also
 * the tickspeed and the drawing are now separated in two different methods for the object.
 *
 * This means that we can turn on and off either the drawing of the object and the moving of
 * the object independently of each other. This will be used later in the examples.
 */

// initialising the random colour variable.
let rndColour = "#FFFFFF";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// raf = Request Animation Frame
//
let raf;

// Initialise the program to the "not running" state.
//
let running = false;

// Converts the rgb numbers into the corresponding hex string.
//
function intToRGB(r, g, b){
    return ("#" +
    (r&0xFF).toString(16) +
    (g&0xFF).toString(16) +
    (b&0xFF).toString(16));

};

// Paints a new background over the old one. The alpha value determines the
// length of the trail after the objects.
//
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// Defining the Ball object
//
var Ball = function() {
    console.log("Ball created");

    // Initial values
    //
    this.x = 100;
    this.y = 100;
    this.vx = 5;
    this.vy = 1;
    this.radius = 25;
    this.color = randomColour(); // randomColour();  // Let's use different colours.
    console.log(this.color);
};

// Adding the drawing function. The drawing is made onto the canvas context defined above.
// Note the use of the "prototype" object property.
//
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
};

// Adding the tick function. The tick is used to move things (or other animations).
//
Ball.prototype.tick = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
        this.vy = -this.vy;
    }
    if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
        this.vx = -this.vx;
    }
};

// Adding accessors to change the position and speed.
//
Ball.prototype.setPos = function(x,y){
    this.x = x;
    this.y = y;
};

Ball.prototype.setSpeed = function(x,y) {
    this.vx = x;
    this.vy = y;
};

// Adding listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
//
// If the mouse moves over the Canvas, the balls start moving.
//
canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        raf = window.requestAnimationFrame(animate);
        running = true;
    }
});

// When the mouse is clicked, the animation is starting.
//
canvas.addEventListener("click",function(e){
    if (!running) {
        running = !running;
        raf = window.requestAnimationFrame(animate);

    }
});

// Stop the animation when the mouse leaves the Canvas.
//
canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
    running = false;
});

// This function is responsible for updating the drawing and the position of the object.
// The balls are stored in an array, and will be called each in turn. This is the beginning
// of the Animation manager.
//
function animate() {
    clear();
    console.log("Cleared!");
    len = balls.length;
    for (i= 0; i < len;i++) {
    balls[i].draw();
    balls[i].tick();
    };
    raf = window.requestAnimationFrame(animate);
};

// This new function initialises the system by  creating a number of instances of the Ball object.
//
function makeAnimates() {
    for (i=0; i<10 ;i++) {
        balls[i]= new Ball();
        balls[i].setPos(i*7,i*7);
        balls[i].setSpeed(i*4*Math.random(), i*4*Math.random());
        balls[i].draw();
    }
}

var balls = [];
makeAnimates();

// This function generatesrandom integers between the min and max levels.
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This function generates random colours for each call.
//
function randomColour () {

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);

    return "rgb(" + r + "," + g + "," + b + ")";
};

// =========================================================================
// END OF FILE
// =========================================================================