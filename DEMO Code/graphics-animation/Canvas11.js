/**
 * Created by LOe on 30/03/15.
 */

// The function draws a simple round shape on a canvas with a black outline (from the css-definition). No movement yet.
//
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Note that we use the OO concept of an object in JS here.
// The ball is an object JS-style.
// JS OO is based on using variables to store object info!
// Variables can contain functions (!)
//
var ball = {
    x: 100,
    y: 100,
    radius: 25,
    color: 'red',

    // This is a method of the object ball.
    //
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

ball.draw();

// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
