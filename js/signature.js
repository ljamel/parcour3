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
            $("#reservation").fadeIn().html("Signer ci-dessous pour finaliser la résérvation<br />" + "<br /><a href=#footer><button onclick='minuteur.finReserv();minuteur.decompte();' class='louer'>Cliquez ici</button ></a> <canvas id=myCanvas width=270 height=100 style='border:1px solid #000000;  background-color:#ffffdd;'>" + "</canvas >");
        }
        // fonction appeller au format ordinateur pour éviter les conflits
        if (window.matchMedia("(min-width: 700px)").matches) {
            // évenement qui active le stylo au clique et au mouvement
            document.getElementById('myCanvas').addEventListener('mousedown', this.down, false);
            document.getElementById('myCanvas').addEventListener('mousemove', this.move, false);
            document.getElementById('myCanvas').addEventListener('mouseup', this.up, false);
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
