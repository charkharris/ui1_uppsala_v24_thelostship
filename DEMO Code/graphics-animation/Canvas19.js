/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have reused the new representation of the ball. It is now an object, that can be
 * created a number of times and also inherited by other shapes, such as a rectangle, and a rectangle
 * that can change colour.
 *
 * The ticking and the drawing inside of the ball are separated in two different
 * methods, which can be overridden in inheriting classes.
 *
 * The main change here is that we have now introduced the concept of different graphic objects, by
 * adding a rectangle, which inherits most of the properties from the ball, but has a completely different
 * visual appearance. But essentially these two types of object move in the same way so that part of the
 * definitions do not need to be changed
 */

var rndColour;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// raf = Request Animation Frame
//
var raf;

// Initialise the program to the "not running" state.
//
var running = false;


function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';        // By using a transparency factor we
                                                    // will have a trailing series of shadows.
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//=================================================================================================
// Object definitions
// =================================================================================================
// Defining the Ball object. The argument is the radius of the ball to create.
//
var Ball = function(radiusdef) {

    // Initial values
    //
    this.x = 100;
    this.y = 100;
    this.vx = 5;
    this.vy = 1;
    this.radius = radiusdef;
    this.color = randomColour();  // Let's use different colours.

};

// Adding the drawing function. The drawing is made onto the canvas context defined above.
//
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;  // This is the colour set in the initiation.
    ctx.fill();
};

// Adding the tick function. The tick is used to move things (or to provide for other animations).
//
Ball.prototype.tick = function() {
    this.x += this.vx;
    this.y += this.vy;

    // Detection of the walls. This is not perfect, so it is left as an exercise to improve it.
    //
    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
        this.vy = -this.vy;
    }
    if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
        this.vx = -this.vx;
    }
};

//==================================================================================================
// Accessors to enable some kind of encapsulation. This is not a prohibitive encapsulation, but
// rather a presciptive. How can we make the encapsulation stronger?
//
Ball.prototype.setPos = function(x,y){
    this.x = x;
    this.y = y;
};

Ball.prototype.setSpeed = function(x,y) {
    this.vx = x
    i
    this.vy = y;
};
//=================================================================================================
// End of Object Ball.
//=================================================================================================


//=================================================================================================
// Object Rectangle.
//=================================================================================================
//
// Inherit Ball to make a rectangle. We inherit most functions from the parent code, but we
// only override the necessary functions and variables.
//
function Rectangle (x,y) {
    Ball.call(this,0);
    this.xsize = x;
    this.ysize = y;
};

Rectangle.prototype = Object.create(Ball.prototype);    // Inherit the Rectangle from the Ball class.
Rectangle.prototype.constructor = Rectangle;            // Rename the new definition.

// In the draw function the specifics of the object are defined. Note that we use a special
// function to set the colour of the rectangle. This is made in order to make the inheritance
// easier for the ColourRectangle object.
//
Rectangle.prototype.draw = function (){
    ctx.fillStyle = this.selectColour();  // Dummy call
    ctx.fillRect(this.x,this.y, this.xsize,this.ysize);
};

// Since the movements are similar to the ones of the ball, we do not need to repeat the move() function!
//

// In this case the selectColour function just returns the initial color.
//
Rectangle.prototype.selectColour = function() {
    return this.color;
}
//=================================================================================================
// End of Object Rectangle.
//=================================================================================================

//=================================================================================================
// Object ColourRectangle.
//=================================================================================================
//
// Inherit Rectangle to make a rectangle that changes color with each tick.
//
function ColourRectangle (x,y) {
    Rectangle.call(this,x,y);
}

ColourRectangle.prototype = Object.create(Rectangle.prototype);
ColourRectangle.prototype.constructor = ColourRectangle;

// Here we redefine the selectColour function to set the colour to a random colour. How would you
// create a version that runs over all colours in some specific order? Rainbow...
//
// In this way we do not have to redefine the draw() function for this object (which would of course
// not have been very difficult, but in this way the code becomes cleaner).
//
ColourRectangle.prototype.selectColour = function () {
    return randomColour();
}

//=================================================================================================
// Animation Engine
//=================================================================================================
// This function is the heart of the animation. It provides both ticks and the functions needed for drawing the
// animated character on the screen.
//
function animate() {
    clear();
    console.log("Cleared!");
    len = animates.length;
    for (i = 0; i < len; i++) {
        animates[i].draw();
        animates[i].tick();
    };
    raf = window.requestAnimationFrame(animate);
};

function makeAnimates() {
    for (i=0; i<10 ;i++) {
        animates[i]= selectObject(Math.random()*3);
        animates[i].setPos(i*7,i*7);
        animates[i].setSpeed(i*3*Math.random(), i*3*Math.random());
        animates[i].draw();
    }
}

var animates = [];
makeAnimates();

//=================================================================================================
// Functions to generate random colours. 
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generates a completely random colour.
//
function randomColour () {

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);

    return "rgb(" + r + "," + g + "," + b + ")";
};

// This function is not used, but left for reference.
//
function intToARGB(r,g,b){
    return ("#" +
    (r&0xFF).toString(16) +
    (g&0xFF).toString(16) +
    (b&0xFF).toString(16));

};

//=================================================================================================
// A simple shape factory. The function does not know which shape to create, but just returns the
// correct shape, according to the selector.
//
function selectObject(i) {
    if (i < 1) {
        return new Ball(25 * Math.random() + 5);
    };
    if (i < 2) {
        return new Rectangle(25 * Math.random() + 5, 25 * Math.random() + 5);
    };
    if (i < 3) {
        return new ColourRectangle(25,25);
    };
};

//=================================================================================================
// Adding listeners that will enable the ball to be controlled by the mouse.
//=================================================================================================
//
// If the mouse moves over the Canvas, the animates start moving.
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


//=================================================================================================
// END of File
//=================================================================================================
