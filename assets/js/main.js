// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAztZScLs6oTL4ufRTCZvN5y-Z-rCVLAsU",
    authDomain: "portfolio-675de.firebaseapp.com",
    databaseURL: "https://portfolio-675de.firebaseio.com",
    projectId: "portfolio-675de",
    storageBucket: "portfolio-675de.appspot.com",
    messagingSenderId: "669750499059",
    appId: "1:669750499059:web:b1e7de1a3bd55debeec986",
    measurementId: "G-3CYZDP6K61"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference messages collection
let messagesRef = firebase.database().ref('messages');


/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if ( toggle && nav ) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    /*Active link*/
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    /*Remove menu mobile*/
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title', {});
sr.reveal('.button', { delay: 200 });
sr.reveal('.home__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal('.about__img', {});
sr.reveal('.about__subtitle', { delay: 400 });
sr.reveal('.about__text', { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {});
sr.reveal('.skills__text', {});
sr.reveal('.skills__data', { interval: 200 });
sr.reveal('.skills__img', { delay: 600 });

/*SCROLL WORK*/
sr.reveal('.work__img', { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal('.contact__input', { interval: 200 });


// Handle form Submission
$(function () {
    $("#contact__form").submit(function (e) {
        e.preventDefault();

        // Get Values
        let name = getInputVal("name");
        let email = getInputVal("email");
        // let file = getInputVal("file");
        let message = getInputVal("message");

        let $form = $(this);
        $.post($form.attr("action"), $form.serialize()).then(function () {
            //save message to firebase
            saveMessage(name, email, message);
            //trigger form input reset
            $("form").trigger("reset");
            //show success notification
            // $(".text__success").fadeIn().style.display = "block";
            document.querySelector('.text__success').style.display = 'block';
            //Hide notification after 3 seconds
            setTimeout(() => {
                // $(".text__success").fadeOut("slow").style.display = "none";
                document.querySelector('.text__success').style.display = 'none';
            }, 3000)
            console.log(name, email, message);
        });
    });
});

// get Id values from DOM
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({ name: name, email: email, message: message });
}


