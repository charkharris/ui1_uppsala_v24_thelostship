/**
 * Created by LOe on 30/03/15.
 */

// The amount of space the dotted line moves each step.
//
var offset = 0;


// The function draws a rectangular marquee of dashes. The dashes "march" around the perimeter.
//
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        // Before each draw, we remove the old graphics.
        //
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.setLineDash([4, 2]);
        ctx.lineDashOffset = -offset;

        // Does this work with other shapes? Arcs? You try it out!
        //
        ctx.strokeRect(10, 10, 100, 100);
    }
}

// This is a simple recursive (!) function that causes small delays in the
// execution. This use is not recommended generally! Why?
//
function march() {

    // The offset is the amount that the dashes move along the perimeter.
    // The offset is repeated every 16 times in a cyclic fashion. What happens if you change
    // the number 16?
    //
    offset++;
    if (offset > 16) {
        offset = 0;
    }
    draw();

    // This function introduces a delay approximately 3/100 of a second long. Try changing the
    // number and see the effect.
    //
    setTimeout(march, 30); // 1000 = 1 second
}

// This call starts the animation of the dashes. Note that this excludes other actions.
// This should preferrably be run in a separate thread (but that is not in this course).
//
march();

// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
