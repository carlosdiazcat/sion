(function() {
    document.addEventListener("DOMContentLoaded", function() {
        
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

        const inner = document.getElementById('slidesInner');
        const tabs = document.getElementById('sliderTabs');
        const dots = document.getElementById('sliderDots');
        const track = document.querySelector('.slider-track');

        if (inner && slidesData.length > 0) {
            inner.innerHTML = slidesData.map((s, i) => `
                <div class="slide-card">
                    <div class="slide-img">
                        <img src="${s.img}" alt="${s.title}" loading="${i === 0 ? 'eager' : 'lazy'}">
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

        let current = 0;
        let autoTimer;

        function goTo(idx) {
            if (!inner) return;
            current = (idx + slidesData.length) % slidesData.length;
            inner.style.transform = `translateX(-${current * 100}%)`;
            
            document.querySelectorAll('.tab-btn').forEach((t, i) => t.classList.toggle('active', i === current));
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
            
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

        document.querySelectorAll('h1').forEach(h1 => {
            const words = h1.innerText.split(' ');
            h1.innerHTML = words.map(w => 
                `<span class="palabra">${w.split('').map(l => `<span class="letras" style="display:inline-block; transition: transform 0.2s; cursor:default;">${l}</span>`).join('')}</span>`
            ).join(' ');
        });

        document.querySelectorAll('.letras').forEach(letter => {
            letter.addEventListener('mouseenter', () => {
                letter.style.transform = 'translateY(-10px)';
                letter.style.color = '#007bff80';
            });
            letter.addEventListener('mouseleave', () => {
                letter.style.transform = 'translateY(0)';
                letter.style.color = '';
            });
        });
		const video       = document.getElementById('heroVideo');
		const muteBtn     = document.getElementById('muteBtn');
		const iconMuted   = document.getElementById('iconMuted');
		const iconUnmuted = document.getElementById('iconUnmuted');
		
		if (muteBtn && video) {
			muteBtn.addEventListener('click', () => {
				video.muted = !video.muted;
				if (iconMuted)   iconMuted.style.display   = video.muted ? 'block' : 'none';
				if (iconUnmuted) iconUnmuted.style.display = video.muted ? 'none'  : 'block';
			});

			video.addEventListener('error', () => {
				video.style.display = 'none';
			});
		}
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner && !localStorage.getItem("cookies-accepted")) {
            cookieBanner.style.display = "block";
            document.getElementById("accept-cookies")?.addEventListener("click", () => {
                localStorage.setItem("cookies-accepted", "true");
                cookieBanner.style.display = "none";
            });
        }
    });
    window.toggleMenu = () => document.getElementById('nav-links')?.classList.toggle('active');
    window.abrirform = () => { 
        const overlay = document.getElementById('overlay');
        if(overlay){ overlay.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    };
    window.cerrarform = () => { 
        const overlay = document.getElementById('overlay');
        if(overlay){ overlay.style.display = 'none'; document.body.style.overflow = 'auto'; }
	};
	window.onload = function() {
		if (!localStorage.getItem('cookiesAccepted') === 'false') {
			document.getElementById('cookie-banner').style.display = 'block'; 
		} else {
			document.getElementById('cookie-banner').style.display = 'none';
		}
	}
	function acceptCookies() {
		localStorage.setItem('cookiesAccepted', 'true');
		localStorage.setItem('cookieAnalytics', true);
		localStorage.setItem('cookieMarketing', true);
		document.getElementById('cookie-banner').style.display = 'none';
		document.getElementById('cookie-modal').style.display = 'none';
	}
	function rejectCookies() {
		localStorage.setItem('cookiesAccepted', 'false');
		document.getElementById('cookie-banner').style.display = 'none';
		document.getElementById('cookie-modal').style.display = 'none';
	}
	function savePreferences() {
		let analytics = document.getElementById('cookie-analytics').checked;
		let marketing = document.getElementById('cookie-marketing').checked;
		localStorage.setItem('cookiesAccepted', 'true');
		localStorage.setItem('cookieAnalytics', analytics);
		localStorage.setItem('cookieMarketing', marketing);
		document.getElementById('cookie-banner').style.display = 'none';
		document.getElementById('cookie-modal').style.display = 'none';
	}
	window.changeQty = function(id, delta) {
		const input = document.getElementById(id);
		if (!input) return;

		const val = parseInt(input.value, 10) || 0;
		input.value = Math.max(0, val + delta);

		updatePrice();
	};
	function updatePrice() {
		const getVal = (id) => {
			const el = document.getElementById(id);
			return el ? (parseInt(el.value) || 0) : 0;
		};

		const p = [
			getVal("luces_smart"), getVal("persianas_smart"), getVal("camaras_seguridad"),
			getVal("sensores_movimiento"), getVal("termostatos_inteligentes"),
			getVal("ventiladores_inteligentes"), getVal("altavoces_inteligentes"),
			getVal("pantallas_inteligentes"), getVal("videoporteros"), getVal("cerradura")
		];

		const prices = [150, 150, 600, 150, 150, 150, 500, 450, 450, 450];
		
		const totalUnidades = p.reduce((a, b) => a + b, 0);
		const central = (totalUnidades >= 30) ? 1000 : 200;

		const total = p.reduce((acc, val, i) => acc + (val * prices[i]), 0) + central;

		const display = document.getElementById("totalPrice");
		if (display) display.textContent = total;

		return { total, totalUnidades };
	}

	const form = document.getElementById('orderForm');
	if (form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();

			const getVal = (id) => parseInt(document.getElementById(id).value) || 0;

			const p1 = getVal("luces_smart");
			const p2 = getVal("persianas_smart");
			const p3 = getVal("camaras_seguridad");
			const p4 = getVal("sensores_movimiento");
			const p5 = getVal("termostatos_inteligentes");
			const p6 = getVal("ventiladores_inteligentes");
			const p7 = getVal("altavoces_inteligentes");
			const p8 = getVal("pantallas_inteligentes");
			const p9 = getVal("videoporteros");
			const p10 = getVal("cerradura");
			const prices = [150, 150, 600, 150, 150, 150, 500, 450, 450, 450];
			
			const totalUnidades = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10;
			const central = (totalUnidades >= 30) ? 1000 : 200;

			const total = (p1 * prices[0]) + (p2 * prices[1]) + (p3 * prices[2]) + 
						(p4 * prices[3]) + (p5 * prices[4]) + (p6 * prices[5]) + 
						(p7 * prices[6]) + (p8 * prices[7]) + (p9 * prices[8]) + 
						(p10 * prices[9]) + central;

			if(document.getElementById("totalPrice")) {
				document.getElementById("totalPrice").textContent = total;
			}

			const formData = new FormData(form);
			formData.append('Total_Presupuesto_Estimado', total + "€");
			formData.append('Total_Unidades_Domoticas', totalUnidades);

			/*fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(response => {
				if (response.ok) {
					window.location.href = "https://www.proyectossion.com/";
				} else {
					alert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
				}
			})
			.catch(error => {
				alert('Error de conexión al enviar el formulario.');
			});*/
		});
	}
})();