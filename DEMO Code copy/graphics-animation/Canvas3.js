/**
 * Created by Lars Oe on 15-03-30.
 */


function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // This shows the layered characteristics of Graphics on the Canvas. Experiment
        // by permuting the three statements below to see the result.
        //
        ctx.fillRect(25,25,100,100);
        ctx.clearRect(45,45,60,60);
        ctx.strokeRect(50,50,50,50);

    }
}
// =====================================================================================================================
// END OF FILE
// =====================================================================================================================
