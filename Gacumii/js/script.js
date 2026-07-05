document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("videoLightbox");
<<<<<<< HEAD
    const lightboxVideo = document.getElementById("cleanVideoPlayer"); 
    const videoSource = lightbox ? lightbox.querySelector("source") : null;
    const closeBtn = document.querySelector(".close-lightbox");

    // Unified selector for any asset meant to trigger the video player
    const playTriggers = document.querySelectorAll('.play-trigger, [order-number]');

    // 1. Lightbox functionality for triggers
    playTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            // Pick up the local path string assigned to the custom attribute
            const targetVideo = this.getAttribute("data-video");
            
            if (targetVideo && lightbox && lightboxVideo) {
                // Safely update or instantiate internal source element pointers
                let activeSource = lightboxVideo.querySelector("source");
                if (!activeSource) {
                    activeSource = document.createElement("source");
                    lightboxVideo.appendChild(activeSource);
                }
                
                activeSource.src = targetVideo;
                lightboxVideo.load();
                lightbox.style.display = "flex";
                lightboxVideo.play().catch(error => {
                    console.log("Playback interaction error protected by browser policies: ", error);
                });
=======
    const lightboxVideo = document.getElementById("lightboxVideo");
    const closeBtn = document.querySelector(".close-lightbox");
    const playTriggers = document.querySelectorAll(".play-trigger");

    // 1. Lightbox Controller
    playTriggers.forEach(trigger => {
        trigger.addEventListener("click", function(e) {
            e.preventDefault();
            const targetVideo = this.getAttribute("data-video");
            
            if (targetVideo && lightbox && lightboxVideo) {
                const source = lightboxVideo.querySelector("source");
                if (source) {
                    source.src = targetVideo;
                    lightboxVideo.load();
                    lightbox.style.display = "flex";
                    lightboxVideo.play().catch(error => {
                        console.log("Auto-play blocked by browser policy, waiting for user input.", error);
                    });
                }
>>>>>>> abae886 (Movies covers that will be added to the portfolio)
            }
        });
    });

<<<<<<< HEAD
    // Close Lightbox Window safely
    const dismissWindow = () => {
=======
    const dismissLightbox = () => {
>>>>>>> abae886 (Movies covers that will be added to the portfolio)
        if (lightbox && lightboxVideo) {
            lightbox.style.display = "none";
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
    };

<<<<<<< HEAD
    if (closeBtn) {
        closeBtn.addEventListener("click", dismissWindow);
    }
    
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) dismissWindow();
        });
    }

    // 2. Smooth Scroll Animation Observer (Reveal on Scroll)
    const scrollReveal = () => {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
=======
    if (closeBtn) closeBtn.addEventListener("click", dismissLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) dismissLightbox();
        });
    }

    // 2. Navigation Active State Switcher & Scroll Animations
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

const mainHeader = document.querySelector(".main-header");

    const scrollEffectsHandler = () => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + 200; // Offset for accuracy

        // --- NEW: Toggle Header Background Color ---
        if (window.scrollY > 10) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }

        // Active Navigation Tracker
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // Reveal Animations Trigger
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
>>>>>>> abae886 (Movies covers that will be added to the portfolio)
                element.classList.add("active");
            }
        });
    };
<<<<<<< HEAD

    window.addEventListener("scroll", scrollReveal);
    // Initial call to catch elements already in the viewport
    scrollReveal();
});
=======
    window.addEventListener("scroll", scrollEffectsHandler);
    scrollEffectsHandler(); // Run once immediately on load
});
>>>>>>> abae886 (Movies covers that will be added to the portfolio)
