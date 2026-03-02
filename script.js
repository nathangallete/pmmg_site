document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins immediately
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Loading State ---
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        loaderBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(loader, {
                    y: '-100%',
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        loader.style.display = 'none';
                        document.body.classList.remove('is-loading');
                        initAnimations();
                    }
                });
            }, 500);
        }
    }, 200);

    // --- GSAP Animations ---
    function initAnimations() {
        // Hero Content Reveal
        const heroTl = gsap.timeline();
        heroTl.from('.hero-text h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        })
            .from('.hero-text p', {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, '-=0.5')
            .from('.hero-btns', {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, '-=0.4')
            .from('.visual-container', {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            }, '-=1');

        // Scroll reveals for sections
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Floating units animation
        gsap.to('.police-unit', {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.5
        });

        gsap.to('.fugitive-unit', {
            x: 20,
            y: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // --- SOS Simulation Logic (Inside initAnimations) ---
        const rescuePath = document.getElementById('rescue-path');
        if (rescuePath) {
            const pathData = "M100,100 L400,100 L400,350 L650,350";
            rescuePath.setAttribute('d', pathData);
            gsap.set(rescuePath, { strokeDasharray: 1000, strokeDashoffset: 1000 });

            ScrollTrigger.create({
                trigger: '#sos',
                start: 'top 60%',
                onEnter: () => {
                    gsap.to(rescuePath, {
                        strokeDashoffset: 0,
                        duration: 2.5,
                        ease: 'power2.inOut'
                    });
                    gsap.to('.sos-blink', {
                        animationDuration: '0.5s',
                        duration: 1
                    });
                },
                onLeaveBack: () => {
                    gsap.set(rescuePath, { strokeDashoffset: 1000 });
                }
            });
        }

        // Animate content in SOS section
        gsap.from('.sos-content > *', {
            scrollTrigger: {
                trigger: '#sos',
                start: 'top 70%'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
});
