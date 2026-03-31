document.addEventListener('DOMContentLoaded', () => {
    
    // --- FORÇAR VÍDEO NO MOBILE (VERSÃO ULTRA) ---
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Tenta o play imediato
        const promise = heroVideo.play();

        if (promise !== undefined) {
            promise.catch(() => {
                // Se falhar (bloqueio de navegador ou economia de energia)
                // O vídeo dará play assim que o usuário tocar em qualquer lugar do site
                console.log("Autoplay bloqueado. Aguardando interação do usuário...");
                
                const playOnInteraction = () => {
                    heroVideo.play();
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                };

                document.addEventListener('touchstart', playOnInteraction);
                document.addEventListener('click', playOnInteraction);
            });
        }
    }

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- REVEAL ON SCROLL (ANIMAÇÕES) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona os elementos para animar
    const animatedElements = document.querySelectorAll('.about-grid, .instagram-mural-wrapper, .plan-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});