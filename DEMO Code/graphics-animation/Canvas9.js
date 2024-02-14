/**
 * Created by LOe on 30/03/15.
 */

// This is an attempt to make the one pixel line in previous sketch really black. Could not get this to
// work on my macBook, however.
//
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(5.5,5);
    ctx.lineTo(5.5,140);
    ctx.stroke();


    for (var i = 1; i < 10; i++){
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
