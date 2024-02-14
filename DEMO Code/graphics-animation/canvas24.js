/**
 * Created by LOe on 07/04/15.
 */

/**
 * In this file we have used the new representation of the ball. It is now an object, that can be
 * created a number of times. Also the tickspeed and the drawing are now separated in two different
 * methods.
 *
 * Finally we add the possibility to click on an animated object and get some details about it
 * displayed in a separate area.
 *
 */

let rndColour = "#FFFFFF";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.addEventListener("click", onCanvasClick, false);
canvas.addEventListener("mousemove", onMouseMove, false);

let objectNumber = 1;

// raf = Request Animation Frame
//
let raf;

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
    this.diagonal = radiusdef * 2;
    this.radius = radiusdef;                  // The drawing origin is i
    this.color = randomColour(); // randomColour();  // Let's use different colours.
    this.objectNum = objectNumber++;
    // The object needs to know what it is.
    //
    this.type = "Ball";

};

// Adding the drawing function. The drawing is made onto the canvas context defined above.
//
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0 - Math.PI*.75,  Math.PI * 2 - Math.PI*0.74 , true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // Marking the corners of the objects
    //
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x - this.radius, this.y - this.radius, 3,3);
    // ctx.fillRect(this.x - this.radius, this.y + this.radius, 3,3);
    // ctx.fillRect(this.x + this.radius, this.y - this.radius, 3,3);
    // ctx.fillRect(this.x + this.radius, this.y + this.radius, 3,3);
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

//
// A VERY simple test for whether a point is within a certain object. It uses a square representation
// of the ball. However, it is useful for catching the moving object.
//
Ball.prototype.within = function(x,y) {
    if (x > this.x - this.radius &&
        x < this.x + this.radius &&
        y > this.y - this.radius &&
        y < this.y + this.radius) {
        return true;
    } else {
        return false;
    }
}

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
    this.diagonal = (x + y) / 2;    // Math.sqrt(x^2 + y^2);

    // The object needs to know what it is.
    //
    this.type = "Star";

};

Star.prototype = Object.create(Ball.prototype);
Star.prototype.constructor = Star;

// The star is drawn as a closed path, with a slightly skewed look.
//
Star.prototype.draw = function (){
    ctx.fillStyle = randomColour();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.xSize,this.y + this.ySize);
    ctx.lineTo(this.x,this.y + this.ySize/2);
    ctx.lineTo(this.x + this.xSize/2, this.y);
    ctx.lineTo(this.x + this.xSize/2,this.y + this.ySize);
    ctx.lineTo(this.x,this.y);
    ctx.stroke();

    // Marking the corners of the objects
    //
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, 3,3);
    // ctx.fillRect(this.x + this.diagonal, this.y + this.diagonal, 3,3);
    // ctx.fillRect(this.x, this.y + this.diagonal, 3,3);
    // ctx.fillRect(this.x  + this.diagonal, this.y, 3,3);
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

//
// A VERY simple test for whether a point is within a certain object. It uses a square representation
// of the star. However, it is useful for catching the moving object.
//
Star.prototype.within = function(x,y) {
    if (x > this.x && x < this.x + this.diagonal && y > this.y && y < this.y + this.diagonal) {
        return true;
    } else {
        return false;
    }
}


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
    this.diagonal = (x + y) /2;

    // The object needs to know what it is.
    //
    this.type = "rectangle";

};

Rectangle.prototype = Object.create(Ball.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.draw = function (){
    ctx.fillStyle = this.selectColour();
    ctx.fillRect(this.x,this.y, this.xsize,this.ysize);

    // Marking the corners of the objects
    //
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y + this.ysize, 3,3);
    // ctx.fillRect(this.x, this.y, 3,3);
    // ctx.fillRect(this.x + this.xSize, this.y, 3,3);
    // ctx.fillRect(this.x + this.xSize, this.y + this.ySize, 3,3);
};

Rectangle.prototype.selectColour = function() {
    return this.color;
}

// A test for whether a point is within the rectangle.
//
Rectangle.prototype.within = function(x,y) {
    if (x > this.x && x < this.x + this.xsize && y > this.y && y < this.y + this.ysize) {
        return true;
    } else {
        return false;
    }
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
    this.color = randomColour();
    return this.color;
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
    len = animates.length;
    animates[len] = createObject(kind);
    workers[len] = animates[len];
    worldObjects[len] = animates[len];

    // This call generates the buttons used to control animation and drawing.
    //
    document.getElementById("drbuttons").innerHTML = aniButtons();
    document.getElementById("anbuttons").innerHTML = worButtons();
}


// Initial function that creates ten objects.
//
function makeAnimates() {
    for (i=0; i<10 ;i++) {
        animates[i] = createObject(Math.random()*4);
        workers[i] = animates[i];
        worldObjects[i] = animates[i];
    };
    // This call generates the buttons used to control animation and drawing.
    //
    document.getElementById("drbuttons").innerHTML = aniButtons();
    document.getElementById("anbuttons").innerHTML = worButtons();
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
    temp = animates[item-1];
    if (temp == null) {
        animates[item-1] = worldObjects[item-1];
    }
    else {
        animates[item-1] = null;
    }
}

// Then Toggle animation
//
function toggleMoving (item) {
    temp = workers[item-1];
    if (temp == null) {
        workers[item-1] = worldObjects[item-1];
    }
    else {
        workers[item-1] = null;
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
        return new Star(30,30);
    };

};


//===========================================================================
// Adding listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
//
// If the mouse moves over the Canvas, the animates start moving.
//
/*
canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        raf = window.requestAnimationFrame(animate);
        running = true;
    }
});
*/

// When the mouse is clicked, the animation is starting.
//
/*canvas.addEventListener("click",function(e){
    if (!running) {
        running = !running;
        raf = window.requestAnimationFrame(animate);

    }
});*/

// Stop the animation when the mouse leaves the Canvas.
//
canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
    running = false;
});

//===========================================================================
// Checking for Button clicks.
//===========================================================================

function aniButtons() {
    len = animates.length;
    htmlstring = "";
    for (i=0; i< len;i++) {
        inum = i+1;
        htmlstring += '<button class="ani" name="'+ inum + '" onclick="toggleDrawing(' + inum +');">'+ inum + '</button>';
    }
    //console.log(htmlstring);
    return htmlstring;
}

function worButtons () {
    len = workers.length;
    htmlstring = "";
    for (i=0; i< len;i++) {
        inum = i+1;
        htmlstring += '<button class="wor" name="'+ inum + '" onclick="toggleMoving(' + inum +');">' + inum+ '</button>';
    }
    //console.log(htmlstring);
    return htmlstring;
}


//===========================================================================
// Catching Canvas clicks...
//===========================================================================
// Variables that will follow the mouse positions.
//
var mouseX;
var mouseY;

// Catching the mouse movements (over the Canvas only!!!)
// The eventListener is added to the canvas, not the document.
//
function onMouseMove(e) {
    mouseX = e.clientX-canvas.offsetLeft;
    mouseY = e.clientY-canvas.offsetTop;
    document.getElementById("mouseCoordinates").innerHTML =
        "X: " + mouseX + ", Y: " + mouseY;

}

// Catching the mouse click. If the click is on an object, we will display
// details about the object in a specific div.
//
function onCanvasClick(e) {
    currentObject = getClickedObject();
    console.log("Object clicked!")
    if (currentObject == null) {
        return null;
    }
    obj = animates[currentObject];

    showObject(obj);
}
// When the mouse button is clicked, we check which object is under the mouse.
// The number of the object in the object array is returned.
//
function getClickedObject() {
    len = animates.length;
    for (i=0; i < len; i++ ) {
        item = animates[i];
        if (item != null && item.within(mouseX, mouseY)) {
            console.log("Type: " + item.type + " Num: " + item.objectNum);
            return[i];
        }
    }
    return null;
}

// One button to start the animation and one to stop it!
//
function startAnimation() {
    running = true;
    raf = window.requestAnimationFrame(animate);
}

function stopAnimation() {
    window.cancelAnimationFrame(raf);
    running = false;
}
// This function can be made as complex as is needed. Here we just display some
// interesting facts about the object.
//
function showObject (object) {
    document.getElementById("showObject").innerHTML =
        "Object type: " + object.type +
        "<br>Object position:" + Math.floor(object.x) + "," + Math.floor(object.y) +
        "<br>Object colour:" + object.color;

}



// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
