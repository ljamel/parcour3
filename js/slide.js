//Méthodes PS: ma méthode préférer --- Objet literal ---
var Slidefor = {
	myIndex: 0,
	x: document.getElementsByClassName("mySlides"),
	slideIndex: 1,

	slidefor: function () {
		for (i = 0; i < Slidefor.x.length; i++) {
			Slidefor.x[i].style.display = "none";
		}
		Slidefor.x[Slidefor.myIndex - 1].style.display = "block";
	},

	// function des cursers
	showDivs: function (n) {
		Slidefor.myIndex++;
		if (Slidefor.myIndex > Slidefor.x.length) {
			Slidefor.myIndex = 1;
		}
		Slidefor.slidefor();
	},

	// Affiche des informations sur un événement clavier
	// Déplacement des images avec la touche directionnelle
	infosClavier: function (m) {
		// Déplacement ver la droite
		if (m.keyCode === 39 || Slidefor.myIndex === -1) {
			Slidefor.myIndex++;
			if (Slidefor.myIndex > Slidefor.x.length) {
				Slidefor.myIndex = 1;
				console.log(m.keyCode + "ok");
			}
			Slidefor.slidefor();
		}

		// Déplacement ver la gauche
		if (m.keyCode === 37) {
			Slidefor.myIndex--;
			if (Slidefor.myIndex < 1) {
				Slidefor.myIndex = 5;
			}
			Slidefor.slidefor();
		}
	},

	// Incremente la variable slideIndex pour passer a l'image suivante
	plusDivs: function (n) {
		Slidefor.showDivs(n);
		console.log(n);
	},
	plusDivsz: function (n) {
		Slidefor.myIndex--;
		if (Slidefor.myIndex < 1) {
			Slidefor.myIndex = 5;
		}
		Slidefor.slidefor();
	}
};

// Active le slide pour que la première image apparaisse
Slidefor.showDivs(Slidefor.slideIndex);

// Gestion de l'appui et du relâchement d'une touche du clavier
document.addEventListener("keydown", Slidefor.infosClavier);
