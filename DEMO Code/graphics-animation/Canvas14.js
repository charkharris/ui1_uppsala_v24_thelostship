/**
 * Created by LOe on 30/03/15.
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// raf = Request Animation Frame
//
var raf;

// Initialise the program to the "not running" state.
//
var running = false;

var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 25,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

// The clear function moves the trailing settings (alpha value) outside of the actual drawing
// function.
//
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// The draw function is the same as preciously.
//
function draw() {
    clear();
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}

// Adding listeners that will enable the ball to be controlled by the mouse.
//===========================================================================
//
// If the mouse moves over the Canvas, the ball follows the mouse.
//
canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        ball.x = e.clientX;                     // We set the coordinates of the ball to the current
        ball.y = e.clientY;                     // location of the mouse, if the animation is not running!
        ball.draw();                            // If the running variable is "True", then this event has no
                                                // effect.
    }
});

// When the mouse is clicked, the animation is starting.
//
canvas.addEventListener("click",function(e){
    if (!running) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
});

// Stop the animation when the mouse leaves the Canvas.
//
canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
    running = false;
});

ball.draw();

//
// Left as an exercise: How could you change this script to add more balls to the canvas?
//
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
