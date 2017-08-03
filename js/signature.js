// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
Signature = {
	mouseDown: 0,

	drawDot: function (ctx, x, y, size) {
		// Select a fill style
		ctx.fillStyle = "rgba(0, 0, 255 )";

		// Draw a filled circle
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	},

	// Fenêtre de signature
	reservation: function () {
		if (window.matchMedia("(max-width: 700px)").matches) {
			// Mobile
			document.getElementById('mycanvas').style.display = "block";
			document.getElementById('mob').style.display = "block";
		} else {
			// ordinateur
			// affiche une fenête pour signé
			$("#reservation").fadeIn().html("");

			document.getElementById('reservation1').style.display = "block";
			document.getElementById('reservation').style.display = "none";
		}

	},

	// Clear the canvas context using the canvas width and height
	clearCanvas: function (canvas, ctx) {
		ctx.clearRect(0, 0, document.getElementById('sketchpad').width, document.getElementById('sketchpad').height);
	},

	// Keep track of the mouse button being pressed and draw a dot at current location
	sketchpad_mouseDown: function () {
		Signature.mouseDown = 1;
		Signature.drawDot(ctx, mouseX, mouseY, 4);
	},

	// Keep track of the mouse button being released
	sketchpad_mouseUp: function () {
		Signature.mouseDown = 0;
	},

	// Keep track of the mouse position and draw a dot if mouse button is currently pressed
	sketchpad_mouseMove: function (e) {
		// Update the mouse co-ordinates when moved
		Signature.getMousePos(e);

		// Draw a dot if the mouse button is currently being pressed
		if (Signature.mouseDown == 1) {
			Signature.drawDot(ctx, mouseX, mouseY, 12);
		}
	},

	// Get the current mouse position relative to the top-left of the canvas
	getMousePos: function (e) {
		if (!e)
			var e = event;

		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
	},

	// Draw something when a touch start is detected
	sketchpad_touchStart: function () {
		// Update the touch co-ordinates
		getTouchPos();

		drawDot(ctx, touchX, touchY, 12);

		// Prevents an additional mousedown event being triggered
		event.preventDefault();
	},

	// Draw something and prevent the default scrolling when touch movement is detected
	sketchpad_touchMove: function (e) {
		// Update the touch co-ordinates
		getTouchPos(e);

		// During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
		drawDot(ctx, touchX, touchY, 12);

		// Prevent a scrolling action as a result of this touchmove triggering.
		event.preventDefault();
	},

	// Get the touch position relative to the top-left of the canvas
	// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
	// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
	// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
	getTouchPos: function (e) {
		if (!e)
			var e = event;

		if (e.touches) {
			if (e.touches.length == 1) { // Only deal with one finger
				var touch = e.touches[0]; // Get the information for finger #1
				touchX = touch.pageX - touch.target.offsetLeft;
				touchY = touch.pageY - touch.target.offsetTop;
			}
		}
	},

	// Set-up the canvas and add our event handlers after the page has loaded
	init: function () {
		// Get the specific canvas element from the HTML document
		canvas = document.getElementById('sketchpad');


		ctx = canvas.getContext('2d');


		// Check that we have a valid context to draw on/with before adding event handlers
		if (ctx) {
			// React to mouse events on the canvas, and mouseup on the entire document
			document.getElementById('sketchpad').addEventListener('mousedown', Signature.sketchpad_mouseDown, false);
			document.getElementById('sketchpad').addEventListener('mousemove', Signature.sketchpad_mouseMove, false);
			window.addEventListener('mouseup', Signature.sketchpad_mouseUp, false);

			// React to touch events on the canvas
			document.getElementById('sketchpad').addEventListener('touchstart', Signature.sketchpad_touchStart, false);
			document.getElementById('sketchpad').addEventListener('touchmove', Signature.sketchpad_touchMove, false);
		}
	}

};
