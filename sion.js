document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");

    // Si el usuario ya ha aceptado o rechazado, no mostrar el banner
    if (localStorage.getItem("cookies-accepted") || localStorage.getItem("cookies-rejected")) {
        return;
    }

    // Mostrar el banner si no se ha guardado la preferencia
    cookieBanner.style.display = "block";

    // Función para guardar la preferencia del usuario
    function saveCookiePreference(preference) {
        localStorage.setItem("cookies-" + preference, "true");
        cookieBanner.style.display = "none";
    }

    // Si el usuario acepta las cookies
    acceptButton.addEventListener("click", function() {
        saveCookiePreference("accepted");
    });

    // Si el usuario rechaza las cookies
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
    // Obtén todos los elementos con la clase 'box'
    var boxes = document.querySelectorAll('.box');
    
    // Itera sobre todos los elementos
    boxes.forEach(function(box) {
        var boxTop = box.getBoundingClientRect().top; // Posición del elemento respecto a la ventana
        var windowHeight = window.innerHeight; // Altura de la ventana del navegador
        
        // Si el elemento está dentro de la ventana (una pequeña área antes de entrar también se puede animar)
        if (boxTop <= windowHeight - 100) {
            box.classList.add('visible'); // Añadir clase visible para activar la animación
        } else {
            box.classList.remove('visible'); // Opcional: eliminar la clase si el elemento ya no está en vista
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
//texto.innerHTML = texto.innerText.split(' ').map(word => {
//	return `<span class="palabra">${word.split('').map(letter => {
//        return `<span class="letras">${letter}</span>`;
//    }).join('')}</span>`;
//}).join(' ');

//document.querySelectorAll('.letras').forEach(letter => {
//	letter.addEventListener('mouseenter', function() {
//		letter.style.transform = 'translateY(-10px)';
//	});
//	letter.addEventListener('mouseleave', function() {
//		letter.style.transform = 'translateY(0)';
//	});
//});

var productos = document.querySelectorAll('.productos');
var imagenes = document.querySelectorAll('.slider-image-sol img');
var textos = document.querySelectorAll('.slider-sol-text');

var observer = new IntersectionObserver(function(entries, observer){
	entries.forEach(function(entry) {
		// Si la sección está en la vista (al menos un 30% de la sección es visible)
		if (entry.isIntersecting) {
			// Aplicamos la animación cuando la sección entra en la vista
			entry.target.style.opacity = 1;
			entry.target.style.transform = 'scale(1)';

			// Animación de imagen
			var imagen = entry.target.querySelector('..slider-sol');
			imagen.style.transform = 'scale(1.05)';

			// Animación del texto
			var texto = entry.target.querySelector('.slider-sol-text');
			texto.style.transform = 'translateX(0)';
		} else {
			// Si la sección ya no está en la vista, volvemos a su estado inicial
			entry.target.style.opacity = 0;
			entry.target.style.transform = 'scale(0.95)';

			// Restauramos imagen a su tamaño original
			var imagen = entry.target.querySelector('..slider-sol');
			imagen.style.transform = 'scale(1)';

			// Restauramos el texto a su posición inicial
			var texto = entry.target.querySelector('.slider-sol-text');
			texto.style.transform = 'translateX(-20px)';
		}
	});
}, {
	threshold: 0.3,  // Umbral de visibilidad del 30% de la sección
	rootMargin: '0px 0px -30% 0px'  // Empieza a animar un 30% antes de que la sección esté completamente visible
});

// Observar todas las secciones de productos
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
}, 10000); // Cambiar cada 3 segundos (3000 ms)
// Movimiento táctil en dispositivos móviles
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
// Función para cambiar la diapositiva
function changeSlide(slideIndex) {
	// Eliminar la clase "active" de la diapositiva actual e indicador
	slides[currentSlide].classList.remove('active');
	indicators[currentSlide].classList.remove('active');

	// Establecer la nueva diapositiva activa
	currentSlide = slideIndex;

	// Aplicar "active" a la nueva diapositiva e indicador
	slides[currentSlide].classList.add('active');
	indicators[currentSlide].classList.add('active');

	// Mover el contenedor de las diapositivas
	var slideWidth = slides[0].clientWidth;
	document.querySelector('.slider').style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}
// Función para manejar el clic en los indicadores
indicators.forEach((indicator, index) => {
	indicator.addEventListener('click', () => {
	  changeSlide(index);
	});
});

// Iniciar el slider con la primera diapositiva activa
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
// Mostrar el modal de preferencias
function showPreferences() {
	document.getElementById('cookie-banner').style.display = 'none';
	document.getElementById('cookie-modal').style.display = 'flex';
}
function formulario() {
	document.getElementById('formulario').style.display = 'block';
}
function cerrarform() {
	document.getElementById('formulario').style.display = 'none';
}
