/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have created a new representation of the ball. It is now an object, that can be
 * created a number of times. Also the tickspeed and the drawing are now separated in two different
 * methods.
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// raf = Request Animation Frame - drives the animation
//
var raf;

// Initialise the program to the "not running" state.
//
var running = false;

// The clear function is used to reset the image background for each call to draw. Adding transparency
// provides a short trailing effect.
//
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
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
    this.color = 'blue';
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

// Adding listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
//
// If the mouse moves over the Canvas, the ball follows the mouse.
//
canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        ball1.x = e.clientX;
        ball1.y = e.clientY;
        ball1.draw();
    }
});

// When the mouse is clicked, the animation is starting.
//
canvas.addEventListener("click",function(e){
    if (!running) {
        raf = window.requestAnimationFrame(animate);
        running = true;
    }
});
// The function animate is now called as the central loop function, managing the
// details of the animation.
//
function animate() {
    clear();
    console.log("Cleared!")
    ball1.draw();
    ball1.tick();
    raf = window.requestAnimationFrame(animate);
}

var ball1 = new Ball();
ball1.draw();
