// mes objets
function Reserver() {
    this.sec = 59;
    this.minutes = 19;
    this.nameStation = sessionStorage.nameStation;

    // Initilisation et réinitialisation des minutes, seconde et nom de la station en cas de nouvelles résérvations
    this.finReserv = function () {
        $("#reservation").fadeIn().html("La réservation a été effectuée");
        $("#mob").fadeIn().html("La réservation a été effectuée");
    };


    // Minuteur
    this.decompte = function () {
        console.log(this.sec);


        if (this.minutes >= 0 && this.sec >= 0) {
            this.sec--;
            if (this.sec === 0 && this.minutes > 0) {
                this.sec = 59;
                this.minutes--;
                console.log('sec' + this.sec);
            }
            document.getElementById('timer').innerHTML = "1 vélo résérver à la station " + this.nameStation + " pour " + this.minutes + " minutes " + this.sec;

            var interv = setTimeout(function () {
                this.decompte();
            }.bind(this), 1000);

        }

        if (this.minutes === 0 && this.sec === 0) {

            clearTimeout(interv);
            $("#reservation").fadeIn().html("La réservation à éxpiré");
            $("#mob").fadeIn().html("La réservation à éxpiré");
            $("#timer").fadeIn().html("La réservation à éxpiré");
            console.log("fin");
        }
    };

}

// donner une valeurs a mes objets
Minuteur = new Reserver();
