/**
 * Created by LOe on 07/04/15.
 * Modified by LOe on 03/02/20.
 * Modified by LOe on 15/02/23.
 */
/**
 * In this file we have used the new representation of the ball. It is now an object, that can be
 * created a number of times. Also the tickspeed and the drawing are now separated in two different
 * methods.
 *
 */

var rndColour = "#FFFFFF";

// Getting the drawing context of the Canvas
//
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// raf = Request Animation Frame. This is used to run the animation forward.
//
var raf;

// Initialise the program to the "not running" state. By changing this state we can make the
// Animation stop and start.
//
var running = false;

// We initialize the canvas by setting a white rectangle as the base. We also set the transparency
// (alpha) to a low value, giving the ball a slight trail.
//
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';        // By using a transparency factor we
                                                    // will have a trailing series of shadows.
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//=================================================================================================
// Object Definitions.
//=================================================================================================
// Defining the Ball object
//
var Ball = function(radiusdef) {

    // console.log("Ball created");

    // Initial values
    //
    this.x = 100;
    this.y = 100;
    this.vx = 5;                    // Speed values in pixels per frame.
    this.vy = 1;
    this.radius = radiusdef;        // The size of the ball is as an argument for added control.
    this.color = randomColour();    // Let's use different colours.
};

// Adding the drawing function. The drawing is made onto the canvas context defined above.
// Drawing on a Canvas relies on making a path (in this case a 360 degree arc) and
// then filling it.
//
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
};

// Adding the tick function. The tick is used to move things (or other animations). Note that
// The ticking is defined within the object, and called from the animation loop!
//
Ball.prototype.tick = function() {
    this.x += this.vx;              // Change position
    this.y += this.vy;

    // Collision detection - vertical
    //
    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
        this.vy = -this.vy;
    }
    // Horisontal
    //
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
// Object Star.
//=================================================================================================
// The star object is moving a bit erratically over the screen. This is achieved by a simple
// randomizer, which changes direction in 1 move out of 10 (statistically).
//
function Star (x,y) {
    Ball.call(this,0);
    this.xSize = x;
    this.ySize = y;
};

// We inherit the main parts from the Ball prototype.
//
Star.prototype = Object.create(Ball.prototype);
Star.prototype.constructor = Star;      // Rename the class to Star.

// The star is drawn as a longer path, made of single lines. .
//
Star.prototype.draw = function (){
    ctx.fillStyle = randomColour();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);         // Move to drawing position without drawing.
                                        // Without this line we will end up with a mess.
    ctx.lineTo(this.x+20,this.y+20);
    ctx.lineTo(this.x,this.y+10);
    ctx.lineTo(this.x+10,this.y);
    ctx.lineTo(this.x+10,this.y+20);
    ctx.lineTo(this.x,this.y);
    ctx.stroke();

};

// This is calculating the movement for each tick.
//
Star.prototype.tick = function() {

    // Here we calculate the randomness of the path.
    //
    if ( 100*Math.random() > 90 ) {this.vx = - this.vx; }
    if ( 100*Math.random() > 90 ) {this.vy = - this.vy; }

    this.x += this.vx;
    this.y += this.vy;

    // Collision detection
    // Vertical
    //
    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
        this.vy = -this.vy;
    }
    // Horisontal
    //
    if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
        this.vx = -this.vx;
    }
};

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
Rectangle.prototype.constructor = Rectangle;    // Change class name to Rectangle.

// Drawing is similar to the Ball.
//
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
// Inherit Rectangle to make a rectangle that changes color.
//
function ColourRectangle (x,y) {
    Rectangle.call(this,x,y);
}

ColourRectangle.prototype = Object.create(Rectangle.prototype);
ColourRectangle.prototype.constructor = ColourRectangle;

// The only difference from the normal rectangle is that we set the colour to a random colour value.
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
    // console.log("Cleared!");
    len = animates.length;
    for (i = 0; i < len; i++) {

        animates[i].draw();
        workers[i].tick();
    };
    raf = window.requestAnimationFrame(animate);
};

// We are able to create objects by specifying the type to add!
//
function addObject(kind) {
    console.log(animates.length);
    len = animates.length;
    animates[len] = createObject(kind);
    workers[len] = animates[len];
    worldObjects[len] = animates[len];
}

// Creates ten objects. If we provide the amount as an argument we can use a random number to have
// different amounts of objects in every run.
//
function makeAnimates() {
    for (var i=0; i<10 ;i++) {
        animates[i] = createObject(Math.random()*4, i);    // We add the new object to the list of
                                                            // drawable items.
        workers[i] = animates[i];                           // and to the list or workers (movable).
        worldObjects[i] = animates[i];                      // and to the list of all objects in the
                                                            // world.
    }
    ;
}

// We create an object based on the selected kind, give it a position and a random speed.
//
function createObject(kind, i) {
    var animate = selectObject(kind);
    animate.setPos(i*7,i*7);
    animate.setSpeed(i*3*Math.random(), i*3*Math.random());
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
makeAnimates();

// Functions to generate random colours. 
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate one colour at a time, and return the final RGB combination.
//
function randomColour () {

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};

// Somple Factory unit, used to generate different shapes depending on the argument
// The object types are indicated by random numbers:
//
// Ball < 0 < Rectangle < 1 < Colour rectangle < 2 < Star.
//
function selectObject(i) {
    if (i < 1) {
        console.log("Ball created");
        return new Ball(25 * Math.random() + 5);
        console.log("Ball created");
    } else if (i < 2) {
        console.log("Rectangle created");
        return new Rectangle(25 * Math.random() + 5, 25 * Math.random() + 5);

    } else if (i < 3) {
        console.log("CRectangle created");
        return new ColourRectangle(25,25);

    } else if (i < 4) {
        console.log("Star created");
        return new Star(300,200);
    };

};


// Adding Event listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
//
// If the mouse is moving over the Canvas, we change the setting of the "running" variable
// and the animates start moving.
//
canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        raf = window.requestAnimationFrame(animate);
        running = true;
    }
});

// When the mouse is clicked, the animation is toggled between running and
// not running.
//
canvas.addEventListener("click",function(e){
    if (!running) {
        running = !running;
        raf = window.requestAnimationFrame(animate);

    }
});

// Stop the animation when the mouse leaves the Canvas. No toggle function here.
//
canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
    running = false;
});

// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
