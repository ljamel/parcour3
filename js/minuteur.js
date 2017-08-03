// mes objets
function Reserver() {
	this.sec = 59;
	this.minutes = 19;

	// Initilisation et réinitialisation des minutes, seconde et nom de la station en cas de nouvelles résérvations
	this.finReserv = function () {
		$("#reservation").fadeIn().html("La réservation a été effectuée");

		// remplacement de l'encien nom de station par le nouveau
		localStorage.newNameStation = localStorage.nameStation;
		window.location.reload();
		localStorage.min = 19;
		localStorage.sec = 60;
	};


	// Minuteur
	this.decompte = function () {

		if (this.minutes >= 0 && this.sec >= 0) {
			localStorage.sec--;
			if (localStorage.sec < 1) {
				localStorage.sec = 59;
				localStorage.min--;
			}

			document.getElementById('timer').innerHTML = "1 vélo résérver à la station " + localStorage.newNameStation + " pour <strong> " + localStorage.min + " Minutes " + localStorage.sec + " Secondes</strong> " + "<i class='fa fa-clock-o' aria-hidden='true'></i>";


			var interv = setTimeout(function () {
				this.decompte();
			}.bind(this), 1000);

		}

		if (localStorage.min < 0) {

			clearTimeout(interv);
			$("#reservation").fadeIn().html("La réservation à éxpiré");
			$("#mob").fadeIn().html("La réservation à éxpiré");
			$("#timer").fadeIn().html("La réservation à éxpiré");
			console.log("fin");
		}
	};
}

// donner une valeurs a mes objets
var minuteur = new Reserver();
