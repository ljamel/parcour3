// Creer les objets qui seron appeller plus tard
function reserver(myCanvas, signaturePath, isDown, lastScrollTop, scroll1, signaturePath) {
    this.myCanvas = myCanvas;
    this.signaturePath = signaturePath;
    this.isDown = isDown;
    this.lastScrollTop = lastScrollTop;
    this.scroll1 = scroll1;
}

function reservation() {
    if (window.matchMedia("(max-width: 700px)").matches) {
        // Mobile
        document.getElementById('mycanvas').style.display = "block";
        document.getElementById('mob').style.display = "block";
    } else {
        // ordinateur
        // affiche une fenête pour signé
        $("#reservation").fadeIn().html("Signer ci-dessous pour finaliser la résérvation<br />" + "<br /><a href=#footer><button onclick='Minuteur.finReserv();Minuteur.decompte();' class='louer'>Cliquez ici</button ></a> <canvas id=myCanvas width=270 height=100 style='border:1px solid #000000; background-color:#ffffdd;'>" + "</canvas >");
    }


    // donne une valeurs a mes objets précédement creer
    maSignature = new reserver(document.getElementById('myCanvas'), '', false, 0, 0);


    // calcul la position du scroll
    $(window).on("scroll", function () {
        maSignature.scroll1 = $(this).scrollTop();
    });

    function isTouchEvent(e) {
        console.log('ll');
        return e.type.match(/^touch/);

    }

    // fonction qui calcule les coordonnés de la souris pour dessiner
    function getCoords(e) {
        if (isTouchEvent(e)) {
            return e.targetTouches[0].clientX + ',' + e.targetTouches[0].clientY;
        }
        return e.clientX + ',' + e.clientY;
    }


    // ma méthode
    Sign = {

        down: function (e) {
            maSignature.signaturePath += 'M' + getCoords(e) + ' ';
            maSignature.myCanvas.setAttribute('d', maSignature.signaturePath);
            maSignature.isDown = true;
            if (isTouchEvent(e)) e.preventDefault();
        },

        move: function (e) {
            if (maSignature.isDown) {

                maSignature.signaturePath += 'L' + getCoords(e) + ' ';
                document.getElementById('myCanvas').setAttribute('d', maSignature.signaturePath);
                // position du stylo pour signé
                document.getElementById('myCanvas').getContext("2d").arc(e.clientX - document.body.clientWidth + 280, e.clientY - 510 + maSignature.scroll1, 1, 35, 250, 0, 2 * Math.PI);
                document.getElementById('myCanvas').getContext("2d").stroke(); // dessiner
                console.log(e.clientX - document.body.clientWidth + 280);
            }
            if (isTouchEvent(e)) e.preventDefault();
        },

        up: function (e) {
            maSignature.isDown = false;
            if (isTouchEvent(e)) e.preventDefault();
        }

    };

    // fonction appeller au format ordinateur pour éviter les conflits
    if (window.matchMedia("(min-width: 700px)").matches) {
        // évenement qui active le stylo au clique et au mouvement
        maSignature.myCanvas.addEventListener('mousedown', Sign.down, false);
        maSignature.myCanvas.addEventListener('mousemove', Sign.move, false);
        maSignature.myCanvas.addEventListener('mouseup', Sign.up, false);

    }

}
