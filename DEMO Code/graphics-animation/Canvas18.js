/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have used the object representation of the ball. It can be
 * created a number of times. Also the tick speed and the drawing are now
 * separated in two different methods.
 *
 *  The functionality is also improved compared to the previous.
 */

var rndColour = "#FFFFFF";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// raf = Request Animation Frame
//
var raf;

// Initialise the program to the "not running" state.
//
var running = false;

// This function returns a string containing the colour code (#FF0000) for a RGB value (255,0,0).
//
function intToARGB(r,g,b){
    return ("#" +
    (r&0xFF).toString(16) +
    (g&0xFF).toString(16) +
    (b&0xFF).toString(16));

};


function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';        // By using a transparency factor we
                                                    // will have a trailing series of shadows.
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


// This function animates the balls and both draws them, and sends them ticks.
//
function animate() {
    clear();
    len = balls.length;
    for (i= 0; i < len;i++) {
        balls[i].draw();
        balls[i].tick();
    };
    raf = window.requestAnimationFrame(animate);
};

// We create set of Balls of different sizes and colours.
//
function makeAnimates() {
    for (i=0; i<10 ;i++) {
        balls[i]= new Ball();
        balls[i].setPos(i*7,i*7);
        balls[i].setSpeed(i*4*Math.random(), i*4*Math.random());
        balls[i].draw();
    }
}

// Use an array to keep track of the objects to draw and animate.
//
var balls = [];
makeAnimates();


// A standard function to return a random number within a specified interval.
// It also works with negative values.
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This function returns a random colour.
//
function randomColour () {

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);

    return "rgb(" + r + "," + g + "," + b + ")";
};