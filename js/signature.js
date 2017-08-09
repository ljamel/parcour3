Signature = {
	// Mes objets
	pixels: [],
	xyLast: {},
	xyAddLast: {},
	calculate: false,

	// Méthode evenement qui arrete la signature au relachement du bouton
	remove_event_listeners: function () {

		document.getElementById("newSignature").removeEventListener('mousemove', Signature.on_mousemove, false);
		document.getElementById("newSignature").removeEventListener('mouseup', Signature.on_mouseup, false);
		document.getElementById("newSignature").removeEventListener('touchmove', Signature.on_mousemove, false);
		document.getElementById("newSignature").removeEventListener('touchend', Signature.on_mouseup, false);

		document.body.removeEventListener('mouseup', Signature.on_mouseup, false);
		document.body.removeEventListener('touchend', Signature.on_mouseup, false);
	},

	get_coords: function (e) {
		var x, y;

		if (e.changedTouches && e.changedTouches[0]) {
			var offsety = document.getElementById("newSignature").offsetTop || 0;
			var offsetx = document.getElementById("newSignature").offsetLeft || 0;

			x = e.changedTouches[0].pageX - offsetx;
			y = e.changedTouches[0].pageY - offsety;
		} else if (e.layerX || 0 == e.layerX) {
			x = e.layerX;
			y = e.layerY;
		} else if (e.offsetX || 0 == e.offsetX) {
			x = e.offsetX;
			y = e.offsetY;
		}


		// Pour la compatibilité chrome
		if (navigator.vendor === "Google Inc.") {
			y = y + 130;
			x = x + 230;
			if (document.body.clientWidth > 1600) {
				y = y - 130;
				x = x - 270;
				console.log(document.body.clientWidth);
			}
		}


		return {
			x: x,
			y: y
		};
	},

	// Evenement qui actionne le stylo
	on_mousedown: function (e) {

		// annule l'evenement précédent
		e.preventDefault();
		e.stopPropagation();

		document.getElementById("newSignature").addEventListener('mouseup', Signature.on_mouseup, false);
		document.getElementById("newSignature").addEventListener('mousemove', Signature.on_mousemove, false);
		document.getElementById("newSignature").addEventListener('touchend', Signature.on_mouseup, false);
		document.getElementById("newSignature").addEventListener('touchmove', Signature.on_mousemove, false);
		document.body.addEventListener('mouseup', Signature.on_mouseup, false);
		document.body.addEventListener('touchend', Signature.on_mouseup, false);

		var xy = Signature.get_coords(e);
		document.getElementById("newSignature").getContext("2d").beginPath();
		Signature.pixels.push('moveStart');
		document.getElementById("newSignature").getContext("2d").moveTo(xy.x, xy.y);
		Signature.pixels.push(xy.x, xy.y);
		Signature.xyLast = xy;
	},

	on_mousemove: function (e, finish) {


		e.preventDefault();
		e.stopPropagation();

		var xy = Signature.get_coords(e);
		var xyAdd = {
			x: (Signature.xyLast.x + xy.x) / 2,
			y: (Signature.xyLast.y + xy.y) / 2
		};

		if (Signature.calculate) {
			var xLast = (Signature.xyAddLast.x + Signature.xyLast.x + xyAdd.x) / 3;
			var yLast = (Signature.xyAddLast.y + Signature.xyLast.y + xyAdd.y) / 3;
			Signature.pixels.push(xLast, yLast);
		} else {
			Signature.calculate = true;
		}

		document.getElementById("newSignature").getContext("2d").quadraticCurveTo(Signature.xyLast.x, Signature.xyLast.y, xyAdd.x, xyAdd.y);
		Signature.pixels.push(xyAdd.x, xyAdd.y);
		document.getElementById("newSignature").getContext("2d").stroke();
		document.getElementById("newSignature").getContext("2d").beginPath();
		document.getElementById("newSignature").getContext("2d").moveTo(xyAdd.x, xyAdd.y);
		Signature.xyAddLast = xyAdd;
		Signature.xyLast = xy;

	},

	on_mouseup: function (e) {
		Signature.remove_event_listeners();
		document.getElementById("newSignature").getContext("2d").stroke();
		Signature.pixels.push('e');
		Signature.calculate = false;
	},

	// Fenêtre de signature
	reservation: function () {
		if (window.matchMedia("(max-width: 700px)").matches) {
			// Mobile
			document.getElementById('mycanvas').style.display = "block";
			document.getElementById('mob').style.display = "block";
		} else {
			// ordinateur "efface lancienne fenêtre pour faire apparaitre la fenêtre de signature"
			$("#reservation").fadeIn().html("");

			document.getElementById('reservation1').style.display = "block";
			document.getElementById('reservation').style.display = "none";
		}

	},
}
document.getElementById("newSignature").addEventListener('touchstart', Signature.on_mousedown, false);
document.getElementById("newSignature").addEventListener('mousedown', Signature.on_mousedown, false);


document.getElementById("newSignature").getContext("2d").fillStyle = "#fff";
document.getElementById("newSignature").getContext("2d").strokeStyle = "#444";
document.getElementById("newSignature").getContext("2d").lineWidth = 1.5;
document.getElementById("newSignature").getContext("2d").lineCap = "round";
document.getElementById("newSignature").getContext("2d").fillRect(0, 0, document.getElementById("newSignature").width, document.getElementById("newSignature").height);
