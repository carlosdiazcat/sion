(function() { // Encapsulamos para evitar conflictos globales
    document.addEventListener("DOMContentLoaded", function() {
        
        /* ─── 1. COOKIES ─── */
        const cookieBanner = document.getElementById("cookie-banner");
        const acceptButton = document.getElementById("accept-cookies");
        const rejectButton = document.getElementById("reject-cookies");

        if (cookieBanner && !localStorage.getItem("cookies-accepted") && !localStorage.getItem("cookies-rejected")) {
            cookieBanner.style.display = "block";
            
            const savePreference = (pref) => {
                localStorage.setItem("cookies-" + pref, "true");
                cookieBanner.style.display = "none";
            };

            acceptButton?.addEventListener("click", () => savePreference("accepted"));
            rejectButton?.addEventListener("click", () => savePreference("rejected"));
        }

        /* ─── 2. CARGA Y LOGO ─── */
        const loading = document.getElementById("loading");
        const logo = document.getElementById('logo');
        
        // El loadstart suele dispararse antes de que el JS cargue, 
        // así que lo manejamos con lógica de estado.
        if (loading) loading.style.display = "none"; 

        logo?.addEventListener('click', () => location.reload());

        /* ─── 3. ANIMACIONES AL HACER SCROLL ─── */
        const animateOnScroll = () => {
            const boxes = document.querySelectorAll('.box');
            const windowHeight = window.innerHeight;
            boxes.forEach(box => {
                const boxTop = box.getBoundingClientRect().top;
                if (boxTop <= windowHeight - 100) {
                    box.classList.add('visible');
                } else {
                    box.classList.remove('visible');
                }
            });
        };
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Ejecución inicial

        /* ─── 4. INTERSECTION OBSERVER (PRODUCTOS) ─── */
        const productos = document.querySelectorAll('.productos');
        if (productos.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const img = entry.target.querySelector('.slider-sol');
                    const txt = entry.target.querySelector('.slider-sol-text');
                    
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'scale(1)';
                        if (img) img.style.transform = 'scale(1.05)';
                        if (txt) txt.style.transform = 'translateX(0)';
                    } else {
                        entry.target.style.opacity = 0;
                        entry.target.style.transform = 'scale(0.95)';
                        if (img) img.style.transform = 'scale(1)';
                        if (txt) txt.style.transform = 'translateX(-20px)';
                    }
                });
            }, { threshold: 0.3, rootMargin: '0px 0px -30% 0px' });

            productos.forEach(p => observer.observe(p));
        }

        /* ─── 5. TEXTO ANIMADO (H1) ─── */
        document.querySelectorAll('h1').forEach(h1 => {
            const words = h1.innerText.split(' ');
            h1.innerHTML = words.map(word => 
                `<span class="palabra">${word.split('').map(letter => 
                    `<span class="letras" style="display:inline-block; transition: transform 0.3s">${letter}</span>`
                ).join('')}</span>`
            ).join(' ');
        });

        document.querySelectorAll('.letras').forEach(letter => {
            letter.addEventListener('mouseenter', () => letter.style.transform = 'translateY(-10px)');
            letter.addEventListener('mouseleave', () => letter.style.transform = 'translateY(0)');
        });

        /* ─── 6. LÓGICA DEL FORMULARIO / MODAL ─── */
        window.abrirform = function() {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        window.cerrarform = function() {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        // Cerrar con Escape o clic fuera
        document.addEventListener('keydown', (e) => { if (e.key === "Escape") cerrarform(); });
        window.addEventListener('click', (e) => {
            const overlay = document.getElementById('overlay');
            if (e.target === overlay) cerrarform();
        });

    });

    /* ─── 7. FUNCIONES GLOBALES ─── */
    window.toggleMenu = function() {
        document.getElementById('nav-links')?.classList.toggle('active');
    };

    window.changeQty = function(id, delta) {
        const input = document.getElementById(id);
        if (input) {
            let val = (parseInt(input.value) || 0) + delta;
            input.value = val < 0 ? 0 : val;
            if (typeof calculatePrice === 'function') calculatePrice();
        }
    };

})();