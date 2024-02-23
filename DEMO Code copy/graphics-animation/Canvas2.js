/**
 * Created by Lars Oe on 15-03-30.
 */

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        // Draws a simple coloured square
        //
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        // Draws a semi-transparent, semi-overlapping rectangle over the previous square.
        //
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
    }
}
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
