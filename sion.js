document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");
    if (localStorage.getItem("cookies-accepted") || localStorage.getItem("cookies-rejected")) {
        return;
    }
    cookieBanner.style.display = "block";
    function saveCookiePreference(preference) {
        localStorage.setItem("cookies-" + preference, "true");
        cookieBanner.style.display = "none";
    }
    acceptButton.addEventListener("click", function() {
        saveCookiePreference("accepted");
    });
    rejectButton.addEventListener("click", function() {
        saveCookiePreference("rejected");
    });
});
window.addEventListener("loadstart", function() {
    document.getElementById("loading").style.display = "block";
});

function toggleMenu() {
	var navLinks = document.getElementById('nav-links');
	navLinks.classList.toggle('active');
}
window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";
});
document.getElementById('logo').addEventListener('click', function() {
	location.reload(); 
});

var animateOnScroll = function() {
    var boxes = document.querySelectorAll('.box');
        boxes.forEach(function(box) {
        var boxTop = box.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
		if (boxTop <= windowHeight - 100) {
            box.classList.add('visible');
        } else {
            box.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

animateOnScroll();

document.addEventListener('DOMContentLoaded', animateOnScroll);

var servicios = document.querySelectorAll('.servicio');

servicios.forEach(function(servicio) {
	servicio.addEventListener('mouseenter', function() {
		servicio.style.transform = 'scale(1)';
    });
	servicio.addEventListener('mouseleave', function() {
        servicio.style.transform = 'scale(1)';
    });
});
var texto = document.getElementById('texto');

var productos = document.querySelectorAll('.productos');
var imagenes = document.querySelectorAll('.slider-image-sol img');
var textos = document.querySelectorAll('.slider-sol-text');

var observer = new IntersectionObserver(function(entries, observer){
	entries.forEach(function(entry) {
		if (entry.isIntersecting) {
			entry.target.style.opacity = 1;
			entry.target.style.transform = 'scale(1)';

			var imagen = entry.target.querySelector('.slider-sol');
			imagen.style.transform = 'scale(1.05)';

			var texto = entry.target.querySelector('.slider-sol-text');
			texto.style.transform = 'translateX(0)';
		} else {
			entry.target.style.opacity = 0;
			entry.target.style.transform = 'scale(0.95)';

			var imagen = entry.target.querySelector('.slider-sol');
			imagen.style.transform = 'scale(1)';

			var texto = entry.target.querySelector('.slider-sol-text');
			texto.style.transform = 'translateX(-20px)';
		}
	});
}, {
	threshold: 0.3,
	rootMargin: '0px 0px -30% 0px'
});

productos.forEach(function(producto) {
	observer.observe(producto)
});

let currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var indicators = document.querySelectorAll('.indicator');
var totalSlides = slides.length;
function moveSlide(direction) {
	var slideWidth = slides[0].clientWidth;
	indicators[currentSlide].classList.remove('active');
	currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
	document.querySelector('.slider').style.transform = `translateX(-${slideWidth * currentSlide }px)`;
	indicators[currentSlide].classList.add('active');
}
setInterval(() => {
	moveSlide(1);
}, 10000);
let startX;
slider.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
	var moveX = e.touches[0].clientX - startX;
	if (moveX > 50) {
		moveSlide(-1);
		startX = e.touches[0].clientX;
	} else if (moveX < -50) {
		moveSlide(1);
		startX = e.touches[0].clientX;
	}
});
function changeSlide(slideIndex) {
	slides[currentSlide].classList.remove('active');
	indicators[currentSlide].classList.remove('active');

	currentSlide = slideIndex;

	slides[currentSlide].classList.add('active');
	indicators[currentSlide].classList.add('active');

	var slideWidth = slides[0].clientWidth;
	document.querySelector('.slider').style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}
indicators.forEach((indicator, index) => {
	indicator.addEventListener('click', () => {
	  changeSlide(index);
	});
});

changeSlide(0);

var texto = document.querySelectorAll('h1');
texto.forEach(texto => {
	texto.innerHTML = texto.innerText.split(' ').map(word => 
		`<span class="palabra">${word.split('').map(letter => 
			`<span class="letras">${letter}</span>`
		).join('')}</span>`
	).join(' ');

	document.querySelectorAll('.letras').forEach(letter => {
		letter.addEventListener('mouseenter', () => {
			letter.style.transform = 'translateY(-10px)';
		});
		letter.addEventListener('mouseleave', () => {
			letter.style.transform = 'translateY(0)';
		});
	});
});
function showPreferences() {
	document.getElementById('cookie-banner').style.display = 'none';
	document.getElementById('cookie-modal').style.display = 'flex';
}
/*function formulario() {
	document.getElementById('formulario').style.display = 'block';
}
function cerrarform() {
	document.getElementById('formulario').style.display = 'none';
}*/
// Función para ABRIR
function abrirform() {
	const overlay = document.getElementById('overlay');
	if (overlay) {
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden'; // Bloquea scroll fondo
	}
}

// Alias para compatibilidad con tus botones antiguos
function formulario() {
	abrirform();
}

// Función para CERRAR
function cerrarform() {
	const overlay = document.getElementById('overlay');
	if (overlay) {
		overlay.style.display = 'none';
		document.body.style.overflow = 'auto'; // Devuelve scroll fondo
	}
}

// Cerrar con Escape
document.addEventListener('keydown', function(event) {
	if (event.key === "Escape") {
		cerrarform();
	}
});

// Cerrar al hacer clic fuera (en el overlay)
window.onclick = function(event) {
	const overlay = document.getElementById('overlay');
	// Si el clic es exactamente en el overlay (el fondo difuminado)
	if (event.target == overlay) {
		cerrarform();
	}
}

// Lógica de botones +/-
function changeQty(id, delta) {
	const input = document.getElementById(id);
	if (input) {
		let val = parseInt(input.value) || 0;
		val += delta;
		if (val < 0) val = 0;
		input.value = val;
		
		// Si tienes función de cálculo de precio
		if (typeof calculatePrice === 'function') calculatePrice();
	}
}
  /* ─── Datos de los slides ─── */
  const slides = [
    {
      title:  'Iluminación',
      img:    'https://carlosdiazcat.github.io/sion/img/exterior.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#ilumincacion',
      text:   'La iluminación domótica transforma la manera en que interactuamos con las luces en nuestro hogar, optimizando el control de la luz en espacios interiores y exteriores. Control por voz, apps móviles y sensores automáticos para crear ambientes únicos en cada momento.'
    },
    {
      title:  'Protección solar',
      img:    'https://carlosdiazcat.github.io/sion/img/persianastoldos.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#persianas',
      text:   'Persianas, toldos y estores inteligentes que mejoran la comodidad, la eficiencia energética y la privacidad. Ajuste automático según las condiciones del entorno o las preferencias del usuario.'
    },
    {
      title:  'Climatización',
      img:    'https://carlosdiazcat.github.io/sion/img/clima.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#clima',
      text:   'Control climático inteligente para optimizar la temperatura, la humedad y la calidad del aire. Termostatos, aire acondicionado, ventiladores y sensores integrados en un solo sistema.'
    },
    {
      title:  'Alarmas y seguridad',
      img:    'https://carlosdiazcat.github.io/sion/img/alarmas.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#alarmas',
      text:   'Protección inteligente del hogar mediante la automatización de alarmas contra robos, cámaras de vigilancia, detectores de incendios y fugas de agua con monitoreo remoto.'
    },
    {
      title:  'Energía',
      img:    'https://carlosdiazcat.github.io/sion/img/solar.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#consumo',
      text:   'Gestión inteligente de la producción y consumo energético. Paneles solares, medidores inteligentes y electrodomésticos conectados para un hogar más eficiente y sostenible.'
    },
    {
      title:  'Jardines y piscinas',
      img:    'https://carlosdiazcat.github.io/sion/img/jardinypiscina.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#jardin',
      text:   'Soluciones inteligentes para la gestión del riego, iluminación, seguridad y mantenimiento de jardines y piscinas. Control remoto con apps y asistentes de voz.'
    },
    {
      title:  'Puertas y accesos',
      img:    'https://carlosdiazcat.github.io/sion/img/puertas.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#puertas',
      text:   'Cerraduras inteligentes, videoporteros, sistemas biométricos y automatización de puertas para gestionar el acceso de manera remota y segura desde cualquier lugar.'
    },
    {
      title:  'Asistentes vocales',
      img:    'https://carlosdiazcat.github.io/sion/img/asistentevocal.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#asistentes',
      text:   'Integración con Alexa, Google Home y Apple HomeKit. Controla toda tu domótica con simples comandos de voz, automatiza rutinas y disfruta de una experiencia verdaderamente manos libres.'
    },
    {
      title:  'Apartamentos de alquiler',
      img:    'https://carlosdiazcat.github.io/sion/img/apartamentos1.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#alquiler',
      text:   'Soluciones domóticas flexibles para apartamentos de alquiler. Mejora la experiencia del inquilino y facilita la gestión sin realizar cambios estructurales permanentes.'
    },
    {
      title:  'Segunda residencia',
      img:    'https://carlosdiazcat.github.io/sion/img/segunda.webp',
      href:   'https://carlosdiazcat.github.io/soluciones/#segunda',
      text:   'Control remoto, automatización de rutinas y monitoreo de tu segunda vivienda cuando no estás presente. Mayor seguridad, ahorro energético y total tranquilidad a distancia.'
    }
  ];
 
  /* ─── Renderizado ─── */
  const inner  = document.getElementById('slidesInner');
  const tabs   = document.getElementById('sliderTabs');
  const dots   = document.getElementById('sliderDots');
  const total  = document.getElementById('totalSlides');
  const curr   = document.getElementById('currentSlide');
  total.textContent = slides.length;
 
  slides.forEach((s, i) => {
    /* slide */
    inner.insertAdjacentHTML('beforeend', `
      <div class="slide-card">
        <div class="slide-img">
          <img src="${s.img}" alt="${s.title}" loading="${i === 0 ? 'eager' : 'lazy'}">
          <div class="slide-img-overlay"></div>
          <span class="slide-num">${String(i+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}</span>
        </div>
        <div class="slide-content">
          <span class="sec-eyebrow">Solución</span>
          <h2>${s.title}</h2>
          <p>${s.text}</p>
          <a href="${s.href}" class="slide-link">
            Ver más
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    `);
 
    /* tab */
    const tab = document.createElement('button');
    tab.className = 'tab-btn' + (i === 0 ? ' active' : '');
    tab.textContent = s.title;
    tab.addEventListener('click', () => goTo(i));
    tabs.appendChild(tab);
 
    /* dot */
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', s.title);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });
 
  /* ─── Lógica slider ─── */
  let current = 0;
  let autoTimer;
 
  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    inner.style.transform = `translateX(-${current * 100}%)`;
    curr.textContent = current + 1;
 
    document.querySelectorAll('.tab-btn').forEach((t,i) => t.classList.toggle('active', i === current));
    document.querySelectorAll('.dot').forEach((d,i)     => d.classList.toggle('active', i === current));
 
    /* scroll tab activo a la vista */
    const activeTab = tabs.children[current];
    activeTab.scrollIntoView({ block:'nearest', inline:'center', behavior:'smooth' });
 
    resetAuto();
  }
 
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }
 
  document.getElementById('btnPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('btnNext').addEventListener('click', () => goTo(current + 1));
 
  /* swipe táctil */
  let startX = 0;
  const track = document.querySelector('.slider-track');
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  track.addEventListener('touchend',   e => {
    const delta = startX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) goTo(current + (delta > 0 ? 1 : -1));
  });
 
  /* teclado */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
 
  resetAuto();