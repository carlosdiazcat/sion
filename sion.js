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
var imageSection = document.querySelector('.slider-sol');
var image = document.querySelector('.slider-image-sol');
var observer = new IntersectionObserver(function(entries, observer) {
	entries.forEach(function(entry) {
		var ratio = entry.intersectionRatio;
		if (entry.isIntersecting) {
			var scaleValue = 1 + ratio * 0.7;
			image.style.transform = `scale(${scaleValue})`;
		} else {
			image.style.transform = 'scale(0.5)';
		}
	});
}, {
threshold: Array.from({length: 101}, (_, i) => i / 100)
});
observer.observe(imageSection);
// Define el umbral en el que la imagen comienza a encogerse (30% antes de llegar al borde superior)
const startShrinkPoint = window.innerHeight * 0.3;

// Función para ajustar la escala de la imagen durante el desplazamiento
function scaleImageOnScroll() {
    // Obtén la posición actual del scroll
    const scrollY = window.scrollY;

    // Calcula la distancia de la imagen al margen superior de la ventana
    const imageRect = image.getBoundingClientRect();
    const distanceToTop = imageRect.top;

    // Calcula la cantidad de reducción de la imagen en función de la distancia al borde superior
    let scaleValue = 1 - (startShrinkPoint - distanceToTop) / window.innerHeight;
    
    // Asegúrate de que la escala no sea menor a 0.3 (30%)
    scaleValue = Math.max(scaleValue, 0.3);

    // Aplica la transformación para reducir la escala
    image.style.transform = `scale(${scaleValue})`;
}

// Escucha el evento de desplazamiento
window.addEventListener('scroll', scaleImageOnScroll);

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

var texto = document.querySelectorAll('h2');
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