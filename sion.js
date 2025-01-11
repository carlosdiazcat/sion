window.addEventListener("loadstart", function() {
    document.getElementById("loading").style.display = "block";
});
function toggleMenu() {
	var navLinks = document.getElementById('nav-links');
	navLinks.classList.toggle('active');
}
// Oculta el GIF de carga una vez que la página ha terminado de cargar
window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";
});
document.getElementById('logo').addEventListener('click', function() {
	location.reload(); 
});
// Función para animar elementos al entrar en la vista
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

// Llamar a la función cuando el usuario haga scroll
window.addEventListener('scroll', animateOnScroll);

// Ejecutar la función inmediatamente para verificar la visibilidad al cargar la página
animateOnScroll();

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Para el efecto de hover en las imágenes de servicios
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
window.onload = function() {
	if (!localStorage.getItem('cookiesAccepted') === 'false') {
		document.getElementById('cookie-banner').style.display = 'block'; 
	} else {
		document.getElementById('cookie-banner').style.display = 'none';
	}
}

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
// Aceptar todas las cookies
function acceptCookies() {
	localStorage.setItem('cookiesAccepted', 'true');
	localStorage.setItem('cookieAnalytics', true);
	localStorage.setItem('cookieMarketing', true);
	document.getElementById('cookie-banner').style.display = 'none';
	document.getElementById('cookie-modal').style.display = 'none';
}

// Rechazar todas las cookies
function rejectCookies() {
	localStorage.setItem('cookiesAccepted', 'false');
	document.getElementById('cookie-banner').style.display = 'none';
	document.getElementById('cookie-modal').style.display = 'none';
}

// Guardar preferencias de cookies
function savePreferences() {
	let analytics = document.getElementById('cookie-analytics').checked;
	let marketing = document.getElementById('cookie-marketing').checked;

	localStorage.setItem('cookiesAccepted', 'true');
	localStorage.setItem('cookieAnalytics', analytics);
	localStorage.setItem('cookieMarketing', marketing);
	document.getElementById('cookie-banner').style.display = 'none';
	document.getElementById('cookie-modal').style.display = 'none';
}
		
