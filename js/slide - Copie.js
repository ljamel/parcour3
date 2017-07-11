// Création d'un prototype Slide avec 2 objets
function Slide(image, myIndex, x) {
    this.slideIndex = image;
    this.myIndex = myIndex;
    this.x = x;

}

// Initialisation la valeurs des 3 objets
// Initialise la variable monSlide.slideIndex a 1 pour commencer par la première image puis monSlide.myIndex à 0.
monSlide = new Slide(1, 0, document.getElementsByClassName("mySlides"));


//méthodes
Slidefor = {

    // Initialise la variable slideIndex a 1 pour commecer par la première image.
    slideIndex: 1,

    slidefor: function () {
        for (i = 0; i < monSlide.x.length; i++) {
            monSlide.x[i].style.display = "none";
        }
        monSlide.x[monSlide.myIndex - 1].style.display = "block";
    },

    // function des cursers
    showDivs: function (n) {
        monSlide.myIndex++;
        if (monSlide.myIndex > monSlide.x.length) {
            monSlide.myIndex = 1;
        }
        Slidefor.slidefor();

    },

    // Affiche des informations sur un événement clavier
    // Déplacement des images avec la touche directionnelle
    infosClavier: function (m) {

        // Déplacement ver la droite
        if (m.keyCode === 39 || monSlide.myIndex === -1) {
            monSlide.myIndex++;
            if (monSlide.myIndex > monSlide.x.length) {
                monSlide.myIndex = 1;
            }
            Slidefor.slidefor();
        }

        // Déplacement ver la gauche
        if (m.keyCode === 37) {
            monSlide.myIndex--;
            if (monSlide.myIndex < 1) {
                monSlide.myIndex = 3;
            }
            Slidefor.slidefor();
        }

    }
};




Slidefor.showDivs(Slidefor.slideIndex);

// Incremente la variable slideIndex pour passer a l'image suivante
function plusDivs(n) {
    Slidefor.showDivs(Slidefor.slideIndex += n);

}


// Gestion de l'appui et du relâchement d'une touche du clavier
document.addEventListener("keydown", Slidefor.infosClavier);
