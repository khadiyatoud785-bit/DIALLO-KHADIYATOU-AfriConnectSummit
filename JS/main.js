//==============================
// DARK MODE / LIGHT MODE
//==============================

const boutonTheme = document.getElementById("theme-toggle");


// récupérer le thème sauvegardé

let themeSauvegarde = localStorage.getItem("theme");


// appliquer le thème au chargement

if(themeSauvegarde === "dark"){
    document.documentElement.setAttribute("data-theme","dark");
}


// changement au clic

if(boutonTheme){

    boutonTheme.addEventListener("click",()=>{

        let themeActuel = document.documentElement.getAttribute("data-theme");


        if(themeActuel === "dark"){

            document.documentElement.removeAttribute("data-theme");

            localStorage.setItem("theme","light");

        }else{

            document.documentElement.setAttribute("data-theme","dark");

            localStorage.setItem("theme","dark");

        }

    });

}
const boutonHaut = document.getElementById("haut");

if(boutonHaut){

    window.addEventListener("scroll", function(){

        if(window.scrollY > 300){
            boutonHaut.style.display = "block";
        }
        else{
            boutonHaut.style.display = "none";
        }

    });


    boutonHaut.addEventListener("click", function(){

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}
//==============================
// NAVBAR DYNAMIQUE
//==============================

const navbar = document.querySelector("nav");

if (navbar) {

    window.addEventListener("scroll", function(){

        if(window.scrollY > 80){
            navbar.classList.add("scrolled");
        }else{
            navbar.classList.remove("scrolled");
        }

    });

}


//==============================
// MENU HAMBURGER MOBILE
//==============================

const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");


if(menuBtn){

    menuBtn.addEventListener("click", function(){

        menu.classList.toggle("active");

    });

}
//==============================
// COMPTE A REBOURS
//==============================

const joursElement = document.getElementById("jours");

if (joursElement) {

    const dateEvenement = new Date("August 20, 2026 00:00:00").getTime();

    setInterval(function(){

        const maintenant = new Date().getTime();
        const distance = dateEvenement - maintenant;

        const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
        const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("jours").textContent = jours;
        document.getElementById("heures").textContent = heures;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("secondes").textContent = secondes;

    }, 1000);

}
// ANIMATIONS AU SCROLL

const elementsAnimation = document.querySelectorAll(".animation");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold:0.2
});


elementsAnimation.forEach((element)=>{

    observer.observe(element);

});


//==============================
// COMPTEURS CHIFFRES CLES
//==============================

const compteurs = document.querySelectorAll(".compteurs");

compteurs.forEach((compteur)=>{

    const objectif = Number(compteur.dataset.target);
    let nombre = 0;

    const increment = objectif / 100;


    function augmenter(){

        if(nombre < objectif){

            nombre += increment;
            compteur.textContent = Math.floor(nombre);

            setTimeout(augmenter, 20);

        }else{

            compteur.textContent = objectif;

        }

    }


    augmenter();

});

// ONGLES PROGRAMME

const tabs = document.querySelectorAll(".tab");
const contenus = document.querySelectorAll(".planning");


tabs.forEach(tab => {

    tab.addEventListener("click", function(){

        // enlever active des boutons
        tabs.forEach(t => {
            t.classList.remove("active");
        });


        // cacher tous les tableaux
        contenus.forEach(contenu => {
            contenu.classList.remove("active");
        });


        // activer le bouton cliqué
        this.classList.add("active");


        // récupérer le jour
        let jour = this.getAttribute("data-jour");


        // afficher le bon tableau
        document.getElementById(jour).classList.add("active");

    });

});

// FILTRAGE INTERVENANTS

const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const cartesIntervenants = document.querySelectorAll(".carte-intervenant");


if (boutonsFiltre.length > 0) {

    boutonsFiltre.forEach(bouton => {

        bouton.addEventListener("click", ()=>{

            boutonsFiltre.forEach(btn=>{
                btn.classList.remove("active");
            });

            bouton.classList.add("active");

            let categorie = bouton.dataset.filtre;

            cartesIntervenants.forEach(carte=>{

                if(categorie === "tous"){
                    carte.style.display = "block";
                }
                else if(carte.classList.contains(categorie)){
                    carte.style.display = "block";
                }
                else{
                    carte.style.display = "none";
                }

            });

        });

    });

}


// VALIDATION FORMULAIRE

const formulaire = document.querySelector("#formulaire");

if(formulaire){

formulaire.addEventListener("submit", function(e){

    e.preventDefault();

    let valide = true;


    const nom = document.querySelector("#nom");
    const email = document.querySelector("#email");
    const telephone = document.querySelector("#telephone");
    const type = document.querySelector("#type");
    const pays = document.querySelector("#pays");
    const message = document.querySelector("#message");


    // supprimer anciennes couleurs
    document.querySelectorAll("#formulaire input, #formulaire select, #formulaire textarea")
    .forEach(champ=>{
        champ.classList.remove("erreur-champ");
        champ.classList.remove("correct-champ");
    });



    // Nom
    if(nom.value.trim() === ""){
        nom.classList.add("erreur-champ");
        valide = false;
    }
    else{
        nom.classList.add("correct-champ");
    }



    // Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(email.value)){
        email.classList.add("erreur-champ");
        valide = false;
    }
    else{
        email.classList.add("correct-champ");
    }



    // Téléphone
    if(telephone.value.length < 8){
        telephone.classList.add("erreur-champ");
        valide = false;
    }
    else{
        telephone.classList.add("correct-champ");
    }



    // Type participation
    if(type.value === "Choisir"){
        type.classList.add("erreur-champ");
        valide = false;
    }
    else{
        type.classList.add("correct-champ");
    }



    // Pays
    if(pays.value === "Choisir un pays"){
        pays.classList.add("erreur-champ");
        valide = false;
    }
    else{
        pays.classList.add("correct-champ");
    }



    // Message
    if(message.value.trim().length < 20){
        message.classList.add("erreur-champ");
        valide = false;
    }
    else{
        message.classList.add("correct-champ");
    }



    if(valide){

        alert("Inscription envoyée avec succès !");

        formulaire.reset();

    }


});

}

// ANNEE DYNAMIQUE FOOTER

const annee = document.querySelector("#annee");

if(annee){

    annee.textContent = new Date().getFullYear();

}
