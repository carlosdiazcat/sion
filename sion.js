(function() {
    document.addEventListener("DOMContentLoaded", function() {
        
        /* ─── 1. DATOS DEL SLIDER ─── */
        const slidesData = [
            { title: 'Iluminación', img: 'https://carlosdiazcat.github.io/sion/img/exterior.webp', href: 'https://carlosdiazcat.github.io/soluciones/#ilumincacion', text: 'La iluminación domótica transforma la manera en que interactuamos...' },
            { title: 'Protección solar', img: 'https://carlosdiazcat.github.io/sion/img/persianastoldos.webp', href: 'https://carlosdiazcat.github.io/soluciones/#persianas', text: 'Persianas, toldos y estores inteligentes...' },
            { title: 'Climatización', img: 'https://carlosdiazcat.github.io/sion/img/clima.webp', href: 'https://carlosdiazcat.github.io/soluciones/#clima', text: 'Control climático inteligente...' },
            { title: 'Alarmas y seguridad', img: 'https://carlosdiazcat.github.io/sion/img/alarmas.webp', href: 'https://carlosdiazcat.github.io/soluciones/#alarmas', text: 'Protección inteligente del hogar...' },
            { title: 'Energía', img: 'https://carlosdiazcat.github.io/sion/img/solar.webp', href: 'https://carlosdiazcat.github.io/soluciones/#consumo', text: 'Gestión inteligente de la producción...' },
            { title: 'Jardines y piscinas', img: 'https://carlosdiazcat.github.io/sion/img/jardinypiscina.webp', href: 'https://carlosdiazcat.github.io/soluciones/#jardin', text: 'Soluciones inteligentes para el riego...' },
            { title: 'Puertas y accesos', img: 'https://carlosdiazcat.github.io/sion/img/puertas.webp', href: 'https://carlosdiazcat.github.io/soluciones/#puertas', text: 'Cerraduras inteligentes y videoporteros...' },
            { title: 'Asistentes vocales', img: 'https://carlosdiazcat.github.io/sion/img/asistentevocal.webp', href: 'https://carlosdiazcat.github.io/soluciones/#asistentes', text: 'Integración con Alexa y Google Home...' },
            { title: 'Apartamentos de alquiler', img: 'https://carlosdiazcat.github.io/sion/img/apartamentos1.webp', href: 'https://carlosdiazcat.github.io/soluciones/#alquiler', text: 'Soluciones domóticas flexibles...' },
            { title: 'Segunda residencia', img: 'https://carlosdiazcat.github.io/sion/img/segunda.webp', href: 'https://carlosdiazcat.github.io/soluciones/#segunda', text: 'Control remoto y monitoreo a distancia...' }
        ];

        /* ─── 2. RENDERIZADO DEL SLIDER ─── */
        const inner = document.getElementById('slidesInner');
        const tabs = document.getElementById('sliderTabs');
        const dots = document.getElementById('sliderDots');
        const track = document.querySelector('.slider-track');

        if (inner && slidesData.length > 0) {
            inner.innerHTML = slidesData.map((s, i) => `
                <div class="slide-card">
                    <div class="slide-img">
                        <img src="${s.img}" alt="${s.title}" loading="${i === 0 ? 'eager' : 'lazy'}">
                        <span class="slide-num">${String(i+1).padStart(2,'0')} / ${String(slidesData.length).padStart(2,'0')}</span>
                    </div>
                    <div class="slide-content">
                        <h2>${s.title}</h2>
                        <p>${s.text}</p>
                        <a href="${s.href}" class="slide-link">Ver más</a>
                    </div>
                </div>
            `).join('');

            slidesData.forEach((s, i) => {
                if (tabs) {
                    const btn = document.createElement('button');
                    btn.className = `tab-btn ${i === 0 ? 'active' : ''}`;
                    btn.textContent = s.title;
                    btn.onclick = () => goTo(i);
                    tabs.appendChild(btn);
                }
                if (dots) {
                    const dot = document.createElement('button');
                    dot.className = `dot ${i === 0 ? 'active' : ''}`;
                    dot.onclick = () => goTo(i);
                    dots.appendChild(dot);
                }
            });
        }

        /* ─── 3. LÓGICA DE NAVEGACIÓN ─── */
        let current = 0;
        let autoTimer;

        function goTo(idx) {
            if (!inner) return;
            current = (idx + slidesData.length) % slidesData.length;
            inner.style.transform = `translateX(-${current * 100}%)`;
            
            document.querySelectorAll('.tab-btn').forEach((t, i) => t.classList.toggle('active', i === current));
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
            
            // CORRECCIÓN: Solo scroll horizontal para que no salte la página
            const activeTab = tabs?.children[current];
            if (activeTab) {
                tabs.scrollTo({
                    left: activeTab.offsetLeft - (tabs.offsetWidth / 2) + (activeTab.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }
            resetAuto();
        }

        function resetAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => goTo(current + 1), 6000);
        }

        document.getElementById('btnPrev')?.addEventListener('click', () => goTo(current - 1));
        document.getElementById('btnNext')?.addEventListener('click', () => goTo(current + 1));

        if (track) {
            let startX;
            track.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive: true});
            track.addEventListener('touchend', e => {
                const delta = startX - e.changedTouches[0].clientX;
                if (Math.abs(delta) > 50) goTo(current + (delta > 0 ? 1 : -1));
            }, {passive: true});
        }
        resetAuto();

        /* ─── 4. ANIMACIÓN DE LETRAS (RE-ACTIVADA) ─── */
        document.querySelectorAll('h1').forEach(h1 => {
            const words = h1.innerText.split(' ');
            h1.innerHTML = words.map(w => 
                `<span class="palabra">${w.split('').map(l => `<span class="letras" style="display:inline-block; transition: transform 0.2s; cursor:default;">${l}</span>`).join('')}</span>`
            ).join(' ');
        });

        // Asignamos los eventos después de crear las letras
        document.querySelectorAll('.letras').forEach(letter => {
            letter.addEventListener('mouseenter', () => {
                letter.style.transform = 'translateY(-10px)';
                letter.style.color = '#007bff'; // Puedes cambiar el color aquí
            });
            letter.addEventListener('mouseleave', () => {
                letter.style.transform = 'translateY(0)';
                letter.style.color = '';
            });
        });

        /* ─── 5. COOKIES Y OTROS ─── */
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner && !localStorage.getItem("cookies-accepted")) {
            cookieBanner.style.display = "block";
            document.getElementById("accept-cookies")?.addEventListener("click", () => {
                localStorage.setItem("cookies-accepted", "true");
                cookieBanner.style.display = "none";
            });
        }
    });

    // Funciones globales
    window.toggleMenu = () => document.getElementById('nav-links')?.classList.toggle('active');
    window.abrirform = () => { 
        const overlay = document.getElementById('overlay');
        if(overlay){ overlay.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    };
    window.cerrarform = () => { 
        const overlay = document.getElementById('overlay');
        if(overlay){ overlay.style.display = 'none'; document.body.style.overflow = 'auto'; }
    };
})();