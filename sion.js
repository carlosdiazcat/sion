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

			var imagen = entry.target.querySelector('..slider-sol');
			imagen.style.transform = 'scale(1.05)';

			var texto = entry.target.querySelector('.slider-sol-text');
			texto.style.transform = 'translateX(0)';
		} else {
			entry.target.style.opacity = 0;
			entry.target.style.transform = 'scale(0.95)';

			var imagen = entry.target.querySelector('..slider-sol');
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
function formulario() {
	document.getElementById('formulario').style.display = 'block';
}
function cerrarform() {
	document.getElementById('formulario').style.display = 'none';
}
