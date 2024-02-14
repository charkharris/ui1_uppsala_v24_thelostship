/**
 * Created by LOe on 07/04/15.
 */

/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have used the new representations and the factory creations of the graphic objects.
 * Also the tickspeed and the drawing are now separated in two different
 * methods.
 *
 * In this file we have now also included the possibility to stop and restart the animation and/or
 * movements of the different individual objects.
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



function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';        // By using a transparency factor we
                                                    // will have a trailing series of shadows.
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//=================================================================================================
//=================================================================================================
// Defining the Ball object
//
var Ball = function(radiusdef) {

    // console.log("Ball created");

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
// Object Star.
//=================================================================================================

function Star (x,y) {
    Ball.call(this,0);
    console.log("Star created");
    this.xSize = x;
    this.ySize = y;
};

Star.prototype = Object.create(Ball.prototype);
Star.prototype.constructor = Star;

Star.prototype.draw = function (){
    ctx.fillStyle = randomColour();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x+20,this.y+20);
    ctx.lineTo(this.x,this.y+10);
    ctx.lineTo(this.x+10,this.y);
    ctx.lineTo(this.x+10,this.y+20);
    ctx.lineTo(this.x,this.y);
    ctx.stroke();
};


Star.prototype.tick = function() {

    if (100*Math.random() > 90 ) {this.vx = - this.vx; }
    if (100*Math.random() > 90 ) {this.vy = - this.vy; }

    this.x += this.vx;
    this.y += this.vy;


    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
        this.vy = -this.vy;
    }
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
        temp = animates[i];

        // In this version we will check for null items. A null item means that the object is
        // removed from the list.
        //
        if (temp != null) {
            temp.draw();
        }

        temp = workers[i];
        if (temp != null) {
            temp.tick();
        }
    };
    raf = window.requestAnimationFrame(animate);
};


function addObject(kind) {
    console.log(animates.length);
    len = animates.length;
    animates[len] = createObject(kind);
    workers[len] = animates[len];
    worldObjects[len] = animates[len];
}

// Creates ten objects.
//
function makeAnimates() {
    for (i=0; i<10 ;i++) {
        animates[i] = createObject(Math.random()*4);
        workers[i] = animates[i];
        worldObjects[i] = animates[i];
    }
    ;
}

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
makeAnimates();

// A simple mechanism to stop drawing and/or animating objects.
//
// First toggling drawing.
//
function toggleDrawing (item) {
    temp = animates[item];
    if (temp == null) {
        animates[item] = worldObjects[item];
    }
    else {
        animates[item] = null;
    }
}

// Then Toggle animation
//
function toggleMoving (item) {

    temp = workers[item];
    if (temp == null) {
        workers[item] = worldObjects[item];
    }
    else {
        workers[item] = null;
    }
}

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

// Somple Factory, used to generate shapes.
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


//===========================================================================
// Adding listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
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
