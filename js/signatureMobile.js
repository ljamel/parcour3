// Creer les objets qui seron appeller plus tard
function reserver(myCanvas, signaturePath) {
    this.myCanvas = myCanvas;
    this.signaturePath = signaturePath;

}
var canvas = new reserver(document.getElementById('mycanvas'), document.getElementById('mycanvas').getContext("2d"));

var lastPt = new Object();

var colours = ['blue', 'green', 'red', 'yellow', 'black'];

Mobs = {

    draw: function (e) {
        e.preventDefault();

        //Iterate over all touches
        for (var i = 0; i < e.touches.length; i++) {
            var id = e.touches[i].identifier;
            if (lastPt[id]) {
                canvas.signaturePath.beginPath();
                canvas.signaturePath.moveTo(lastPt[id].x, lastPt[id].y);
                canvas.signaturePath.lineTo(e.touches[i].pageX, e.touches[i].pageY);
                canvas.signaturePath.strokeStyle = colours[id];
                canvas.signaturePath.stroke();

            }
            // Store last point
            lastPt[id] = {
                x: e.touches[i].pageX,
                y: e.touches[i].pageY
            };
        }
    },

    end: function (e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var id = e.changedTouches[i].identifier;
            // Terminate this touch
            delete lastPt[id];
        }
    }

}


canvas.myCanvas.addEventListener("touchmove", Mobs.draw, false);
canvas.myCanvas.addEventListener("touchend", Mobs.end, false);
