/**
 * Created by LOe on 30/03/15.
 */

// Here mostly the new parts of the code are commented, some lines are more documented
// in previous files
//
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

// The ball object, JS style.
//
var ball = {
    x: 100,
    y: 100,
    vx: 3,
    vy: 2,
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

// The global draw function. Here you can try various variations of the drawing by
// by commenting and uncommenting lines according to the instructions above the lines.
//
function draw() {

    // Adds a trailing path by filling it with a semi-transparent rectangle.
    // Remove comment to try the effect.
    //
    // ctx.fillStyle = 'rgba(255,255,255,0.1)';
    //
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // If you comment out this line, the Canvas will be filled with balls...
    //
    ctx.clearRect(0,0, canvas.width, canvas.height);


    // This checks for the borders, but in a very sloppy way... how can you improve it?
    //
    // First we check the vertical position and speed.
    //
    if (ball.y + ball.vy +25 > canvas.height || ball.y + ball.vy - 25 < 0) {
        ball.vy = -ball.vy;
    }

    // Then the check of horisontal position and speed is made.
    //
    if (ball.x + ball.vx > canvas.width -25 || ball.x + ball.vx - 25 < 0) {
        ball.vx = -ball.vx;
    }

    // Sets the new position
    //
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.draw();

    raf = window.requestAnimationFrame(draw);
}

// Adding Eventlisteners to the Canvas
//
canvas.addEventListener('mouseover', function(e){
    raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(raf);
});

// Tell the ball to draw itself.
//
ball.draw();

// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
