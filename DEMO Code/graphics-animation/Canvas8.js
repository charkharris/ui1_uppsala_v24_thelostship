/**
 * Created by LOe on 30/03/15.
 */


// Draws a series of parallell vertical black lines with increasing line width.
// Note that the first line will not be black but greyish in coulour. Can you
// explain that?
//
// This is also an example on how to draw the lines on a histogram, by varying the
// y-coordinates of the lines. Just remember that the coordinate system is upside down!
//
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    for (var i = 0; i < 10; i++){
        ctx.lineWidth = 1+i;
        ctx.beginPath();
        ctx.moveTo(5+i*14,5);
        ctx.lineTo(5+i*14,140);
        ctx.stroke();
    }
}
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
