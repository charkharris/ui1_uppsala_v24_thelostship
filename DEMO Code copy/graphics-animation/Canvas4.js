/**
 * Created by Mumriken on 15-03-30.
 */

// Draws a smiley face using a series of graphic strokes.
//
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        // Start the drawing by declaring a the beginning of a drawing path.
        //
        ctx.beginPath();
        ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle

        // The moveTo command moves the "Pen" to a new point, from which the next stroke is made.
        // Se what happens if you comment out all the "nmoveTo" statements.
        //
        ctx.moveTo(100,103);

        // Two ways of drawing the mouth, what is the difference? Try by commenting and uncommenting
        // the following two lines.
        //
        //ctx.arc(75,110,25,0.2 ,Math.PI - 0.2,true);     // Mouth (anti-clockwise)

        ctx.arc(75,80,25,0.2 ,Math.PI -0.2,false);   // Mouth (clockwise)

        ctx.moveTo(65,65);
        ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
        ctx.moveTo(95,65);
        ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye

        // The resulting image is drawn last.
        //
        ctx.stroke();
    }
}
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
