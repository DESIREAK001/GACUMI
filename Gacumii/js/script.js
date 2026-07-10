document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("videoLightbox");
    const lightboxVideo = document.getElementById("lightboxVideo");
    const closeBtn = document.querySelector(".close-lightbox");
    const playTriggers = document.querySelectorAll(".play-trigger");
    const mainHeader = document.querySelector(".main-header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

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
            }
        });
    });

    const dismissLightbox = () => {
        if (lightbox && lightboxVideo) {
            lightbox.style.display = "none";
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
    };

    if (closeBtn) closeBtn.addEventListener("click", dismissLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) dismissLightbox();
        });
    }

    // 2. Navigation Active State Switcher & Scroll Animations
    const scrollEffectsHandler = () => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + 200; // Offset for accuracy

        // Toggle Header Background Color on Scroll
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
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollEffectsHandler);
    scrollEffectsHandler(); // Run once immediately on load
});