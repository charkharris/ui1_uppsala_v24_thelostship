/**
 * Created by LOe on 30/03/15.
 */

// In this file we introduce movement in the graphics.
//
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');              // Get the drawing context of the Canvas.

// raf = Request Animation Frame. This is used to run the animation forward.
//
var raf;

// Note that we use the OO concept of an object in JS here. The ball is an object JS-style.
//
var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: 'blue',

    // The ball has its own drawing function, applied to the drawing context.
    //
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

// The general draw-function prepares the scene for drawing the ball, and also moves it.
// The ball knows how to draw itself and where, but not when. This function sends the clock
// ticks implicitly through direct function calls on the object.
//
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    raf = window.requestAnimationFrame(draw);           // This makes the loop of the drawing.
}

// The eventlisteners are added to detect the mouse movement over the canvas.
//
// First we detect the mouse hovering over the canvas. If the mouse is over the canvas
// the animation runs.
//
canvas.addEventListener('mouseover', function(e){
    raf = window.requestAnimationFrame(draw);           // The function called is the global draw,
                                                        // not the local ball object.
});

// Then we detect when the mouse leaves the canvas area. In such case the running is
// interrupted.
//
canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
});

ball.draw();

// =====================================================================================================================
// END OF FILE
// =====================================================================================================================

