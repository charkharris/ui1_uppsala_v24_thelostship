/**
 * Created by Mumriken on 15-03-30.
 */

// This function draws a grid of colours, much like a boig palette of colours.
//
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');

    // The grid is 6 * 6 squares, i.e., six rows and six columns.
    //
    for (var i=0;i<6;i++){
        for (var j=0;j<6;j++){

            // The fillstyle (colour) will be recalculated for each square, as a combined product of the
            // row and columns counters + some constant numbers.
            //
            ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + Math.floor(255-42.5*j) + ',0)';
            ctx.fillRect(j*25,i*25,25,25);
        }
    }
}
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
