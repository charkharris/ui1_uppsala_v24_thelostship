/**
 * Created by LOe on 30/03/15.
 */
// This file gives some examples of image manipulation. Inverting of colours, Colour to greyscale,
// and another colour exchange method.
//
var img = new Image();                          //The example image is loaded
img.src = 'rhino.png';
img.onload = function() {
    draw(this);
};

// The image is drawn on the Canvas as a pixelbased element.
//
function draw(img) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';

    // In order to be able to manipulate the image the Image data is stored in a variable.
    //
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;

    // Inverting the colours is equivalent to subtracting the value of each channel from 255 (the max value).
    //
    var invert = function() {
        for (var i = 0; i < data.length; i += 4) {
            data[i]     = 255 - data[i];     // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        // After the manipulation we put the changed image data back onto the image again.
        //
        ctx.putImageData(imageData, 0, 0);
    };

    // By setting the same value to all colour channels the result is a grey, which is dependent on the
    // brightness of the three colours "together". A simple way to make a grayscale picture.
    //
    var grayscale = function() {
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i +1] + data[i +2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        // After the manipulation we put the changed image data back onto the image again.
        //
        ctx.putImageData(imageData, 0, 0);
    };

    // This function rotates the values of the RGB channels and adds a transparency value based on the three.
    // It just shows that you have full control over the image values once you have stored them in a
    // variable. Feel free to change the manipulations here and see what happens.
    //
    // If you apply this function three times the original comes back.
    //
    //
    var switchcolour = function() {
        for (var i = 0; i < data.length; i += 4) {
            tempR = data[i];                // Value for red is stored temporarily!
            data[i] = data[i + 1];          // Value for green channel moved to red
            data[i + 1] = data[i + 2];      // Value for blue channel moved to green
            data[i + 2] = tempR;            // Red channel is moved to Blue
            // data[i+3] = (data[i] + data[i+1] + data[i+2]) / 3; // alpha value is
                                            // calculated from the mean.
        }
        // After the manipulation we put the changed image data back onto the image again.
        //
        ctx.putImageData(imageData, 0, 0);
    };

    // Add EventListeners to the buttons
    //
    var invertbtn = document.getElementById('invertbtn');
    invertbtn.addEventListener('click', invert);

    var sinebtn = document.getElementById('sinebtn');
    sinebtn.addEventListener('click', switchcolour);

    var grayscalebtn = document.getElementById('greybtn');
    grayscalebtn.addEventListener('click', grayscale);
}