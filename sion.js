// JavaScript Document
// Muestra el GIF de carga cuando empieza a cargar la página
window.addEventListener("loadstart", function() {
    document.getElementById("loading").style.display = "block";
});

// Oculta el GIF de carga una vez que la página ha terminado de cargar
window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";
});
// Función para animar elementos al entrar en la vista
const animateOnScroll = () => {
	const elements = document.querySelectorAll('.animatable');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const isVisible = elementTop < windowHeight * 1; // Se activa cuando el elemento está un 80% visible

        if (isVisible) {
            element.classList.add('visible');
        }
    });
};

// Añadir evento de scroll
window.addEventListener('scroll', animateOnScroll);

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Para el efecto de hover en las imágenes de servicios
const servicios = document.querySelectorAll('.servicio');

servicios.forEach(servicio => {
    servicio.addEventListener('mouseenter', () => {
        servicio.style.transform = 'scale(1)';
    });
    servicio.addEventListener('mouseleave', () => {
        servicio.style.transform = 'scale(1)';
    });
});

//slider
// con este funcionan los botones bien pero no va automaticamente ni es responsive y no van los botones de las flechas transparentes de los lados, estaba haciendo pruebas solo Carlos jaja
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const totalSlides = slides.length;
  let currentSlide = 0;

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
    const slideWidth = slides[0].clientWidth;
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
});
// aqui abajo esta todo lo tuyo XD
/* document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
        function showSlide(index) {
		if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
		const slider = document.querySelector('.slider');
		slider.style.transform = `translateX(-$(currentIndex*0.8)%)`;
		
		slides.forEach((slide, i) => {
			slide.style.display = (i === index) ? "flex" : "none";
		});

        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[currentIndex].classList.add('active');
    }

    document.querySelector('.next').addEventListener('click', function() {
		currentIndex = (currentIndex + 1) % slides.length;
    	showSlide(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1) % slides.length;
    	showSlide(currentIndex);
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(indicator.dataset.slide) - 1;
			currentIndex = (currentIndex + 1) % slides.length;
    		showSlide(currentIndex);
        });
    });
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
		  const slideIndex = parseInt(button.getAttribute('data-slide'));
		  goToSlide(slideIndex);
		});
	  });
    // Inicializar el primer slide
    showSlide(currentIndex);

    // Opcional: auto-play (cambiar de imagen cada 5 segundos)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
    	showSlide(currentIndex);
    }, 10000);
});
const slider = document.getElementById('slider');
let startX = 0; // Para guardar la posición inicial del toque
let scrollLeft = 0; // Para guardar la posición de desplazamiento actual

// Detectar el inicio del deslizamiento
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX; // Guardamos la posición inicial del toque
    scrollLeft = slider.scrollLeft; // Guardamos la posición de desplazamiento actual
}, { passive: true });

// Detectar el movimiento del deslizamiento
slider.addEventListener('touchmove', (e) => {
    if (!startX) return; // Si no hay un toque inicial, no hacer nada
    const moveX = e.touches[0].pageX; // Posición actual del toque
    const distance = moveX - startX; // Distancia entre la posición inicial y la actual
    slider.scrollLeft = scrollLeft - distance; // Ajustar la posición de desplazamiento del slider
}, { passive: true });*/