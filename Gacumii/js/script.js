document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("videoLightbox");
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
            }
        });
    });

    // Close Lightbox Window safely
    const dismissWindow = () => {
        if (lightbox && lightboxVideo) {
            lightbox.style.display = "none";
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
    };

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
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollReveal);
    // Initial call to catch elements already in the viewport
    scrollReveal();
});
