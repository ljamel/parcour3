// Creer les objets qui seron appeller plus tard --- Objet avec constructeur---
function Signature() {
	this.signaturePath = '';
	this.isDown = false;
	this.lastScrollTop = 0;
	this.scroll1 = 0;

	// Active la methode de signature au toucher
	this.isTouchEvent = function (e) {
		return e.type.match(/^touch/);
	}

	// fonction qui calcule les coordonnés de la souris pour dessiner
	this.getCoords = function (e) {
		if (isTouchEvent(e)) {
			return e.targetTouches[0].clientX + ',' + e.targetTouches[0].clientY;
		}
		return e.clientX + ',' + e.clientY;
	}

	// Fenêtre de signature
	this.reservation = function () {
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
		// fonction appeller au format ordinateur pour éviter les conflits
		if (window.matchMedia("(min-width: 700px)").matches) {
			// évenement qui active le stylo au clique et au mouvement

		}
		window.addEventListener('scroll', function (e) { // calcul la position du scroll pour s'aligner avec le curser
		});

	};

	this.down = function (e) {
		this.signaturePath += 'M' + this.getCoords + ' ';
		document.getElementById('myCanvas').setAttribute('d', this.signaturePath);
		this.isDown = true;
		if (this.isTouchEvent) e.preventDefault();
	};

	// Mouvment du stylo
	this.move = function (e) {
		if (this.isDown) {
			this.signaturePath += 'L' + this.getCoords + ' ';
			document.getElementById('myCanvas').setAttribute('d', this.signaturePath);
			// position du stylo pour signé
			document.getElementById('myCanvas').getContext("2d").arc(e.clientX - document.body.clientWidth + 280, e.clientY - 510 + document.documentElement.scrollTop, 1, 350, 250, 100, 20 * Math.PI);
			document.getElementById('myCanvas').getContext("2d").strokeStyle = "blue";
			document.getElementById('myCanvas').getContext("2d").stroke();

		}
		if (this.isTouchEvent) e.preventDefault();
	};

	this.up = function (e) {
		this.isDown = false;
		if (this.isTouchEvent) e.preventDefault();
	};

}

var final = new Signature();


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
