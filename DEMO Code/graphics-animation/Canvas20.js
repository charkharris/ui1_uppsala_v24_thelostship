/**
 * Created by LOe on 07/04/15.
 */

/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have used the new representation of the ball. It is now an object, that can be
 * created a number of times. Also the ticking and the drawing are now separated in two different
 * methods.
 *
 * We will differentiate the animation a bit more, by not only separating the ticking and the drawing
 * but also storing the objects in several arrays, that will enable us to make the animation even more
 * flexible. Then we only need to go through three arrays, one for animation, one for the movement and
 * possibly one for keeping track of all the objects together.
 *
 * Now we add a subclass of Rectangle, namely a coloured rectangle that can take on very different
 * colours at random.
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

// Resets the drawing area for each animation frame.
//
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';        // By using a transparency factor we
                                                    // will have a trailing series of shadows.
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//=================================================================================================
// OBJECT Definitions
//=================================================================================================
// Defining the Ball object
//
var Ball = function(radiusdef) {

    // Initial values
    //
    this.x = 100;
    this.y = 100;
    this.vx = 5;
    this.vy = 1;
    this.radius = radiusdef;
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

//==================================================================================================
// Accessors to keep encapsulation
//
Ball.prototype.setPos = function(x,y){
    this.x = x;
    this.y = y;
};

Ball.prototype.setSpeed = function(x,y) {
    this.vx = x;
    this.vy = y;
};
//=================================================================================================
// End of Object Ball.
//=================================================================================================

//=================================================================================================
// Object Rectangle.
//=================================================================================================
//
// Inherit Ball to make a rectangle
//
function Rectangle (x,y) {
    Ball.call(this,0);
    this.xsize = x;
    this.ysize = y;
};

Rectangle.prototype = Object.create(Ball.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.draw = function (){
    ctx.fillStyle = this.selectColour();
    ctx.fillRect(this.x,this.y, this.xsize,this.ysize);
};

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
// Inherit Rectangle to make a rectangle that changes color...
//
function ColourRectangle (x,y) {
    Rectangle.call(this,x,y);
}

ColourRectangle.prototype = Object.create(Rectangle.prototype);
ColourRectangle.prototype.constructor = ColourRectangle;

// The only thing that differs this from the standard rectangle is this function to set the colour
// to a random value.
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
    len = animates.length;
    for (i = 0; i < len; i++) {

        animates[i].draw();
        workers[i].tick();
    };
    raf = window.requestAnimationFrame(animate);
};

// Adds an object that has been created to the right arrays (for the animation).
//
function addObject(kind) {
    console.log(animates.length);
    len = animates.length;
    animates[len] = createObject(2);    // Add the drawn objects
    workers[len] = animates[len];           // Add the moving objects
    worldObjects[len] = animates[len];      // Add all objects (for book-keeping).
}

// Create ten objects of random type. The fixed number could be exchange to a random generator.
//
function makeAnimates() {
    for (i=0; i<10 ;i++) {
        animates[i] = createObject(Math.random()*3);
        workers[i] = animates[i];
        worldObjects[i] = animates[i];
    }
}

// Create a special kind of object. Note that this function does not know which objects are available. It just
// creates a object by calling the factory below, and then uses the accessors to change the properties.
//
function createObject(kind) {
    var animate = selectObject(kind);
    animate.setPos(i*7,i*7);
    animate.setSpeed(i*3*Math.random(), i*3*Math.random());
    animate.draw();
    return animate;
}

// Contains all the objects in the world.
//
var worldObjects = [];

// Contains all objects that should do something in the world.
//
var workers = [];

// Contains all the objects that should be drawn.
//
var animates = [];

// Let's initiate the array of objects.
//
makeAnimates();

//=================================================================================================
// Functions to generate random colours.
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomColour () {

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};


// This is an implementation of the factory pattern in OOP.
//
function selectObject(i) {                      // Depending on the given value, we select
                                                // the appropriate type of object.
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
// EVENT Listeners.
//=================================================================================================
// Adding listeners that will enable the ball to be controlled by the mouse.
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
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
