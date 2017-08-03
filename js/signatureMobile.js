var Mobs = {
	lastPt: [],
	draw: function (e) {
		e.preventDefault();
		//Iterate over all touches
		for (var i = 0; i < e.touches.length; i++) {
			var id = e.touches[i].identifier;
			if (Mobs.lastPt[id]) {
				document.getElementById('mycanvas').getContext("2d").beginPath();
				document.getElementById('mycanvas').getContext("2d").moveTo(Mobs.lastPt[id].x, Mobs.lastPt[id].y);
				document.getElementById('mycanvas').getContext("2d").lineTo(e.touches[i].pageX, e.touches[i].pageY);
				document.getElementById('mycanvas').getContext("2d").strokeStyle = 'blue';
				document.getElementById('mycanvas').getContext("2d").stroke();
			}
			// Store last point
			Mobs.lastPt[id] = {
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
			delete Mobs.lastPt[id];
		}
	}

}
// Evenement au toucher
document.getElementById('mycanvas').addEventListener("touchmove", Mobs.draw, false);
document.getElementById('mycanvas').addEventListener("touchend", Mobs.end, false);
