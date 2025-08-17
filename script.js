// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Scroll suave para todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.card-hover, .text-center');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('inicio');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Botones de acción
    const downloadButton = document.querySelector('.btn-descargar-app');
    // const infoButton = document.querySelector('button:contains("Más Información")'); // ya no se usa

    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Aquí se puede agregar la lógica para descargar la app
            alert('¡Gracias por tu interés en NIRA! Próximamente disponible para descarga.');
        });
    }

    // Contador animado para estadísticas (opcional)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Efecto hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navegación activa en el navbar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-gray-700');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-primary');
            }
        });
    });

    // Función para mostrar/ocultar el navbar al hacer scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de transparencia y blur basado en el scroll
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-transparent');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia abajo
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Transición suave para el navbar
    navbar.style.transition = 'all 0.3s ease-in-out';

    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Validación de formulario (si se agrega uno)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí se puede agregar la lógica de validación y envío
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        });
    });

    // Tooltip para elementos interactivos
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });

    // Scroll automático tras inactividad
    (function() {
        let inactivityTimeout;
        let autoScrollActive = false;
        let scrollInterval;
        let scrollBackTimeout;

        function startAutoScroll() {
            if (autoScrollActive) return;
            autoScrollActive = true;
            console.log('Scroll automático INICIADO');
            scrollInterval = setInterval(() => {
                window.scrollBy({ top: 3, behavior: 'smooth' }); // velocidad aumentada para pruebas
                // Si llegó al final
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
                    clearInterval(scrollInterval);
                    console.log('Scroll automático llegó al final, espera 5s');
                    scrollBackTimeout = setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        console.log('Scroll automático vuelve al inicio');
                        setTimeout(() => {
                            autoScrollActive = false;
                            resetInactivityTimer();
                        }, 1000); // Espera a que suba
                    }, 5000); // Espera 5s al final
                }
            }, 20); // Scroll más rápido
        }

        function stopAutoScroll() {
            if (autoScrollActive) console.log('Scroll automático DETENIDO por actividad');
            autoScrollActive = false;
            clearInterval(scrollInterval);
            clearTimeout(scrollBackTimeout);
        }

        function resetInactivityTimer() {
            clearTimeout(inactivityTimeout);
            if (autoScrollActive) stopAutoScroll();
            inactivityTimeout = setTimeout(startAutoScroll, 10000); // 10s
        }

        // Detectar actividad del usuario
        ['mousedown', 'keydown', 'touchstart'].forEach(evt => {
            window.addEventListener(evt, resetInactivityTimer, { passive: true });
        });

        // Iniciar timer al cargar
        resetInactivityTimer();
    })();

    console.log('NIRA - Página web cargada exitosamente');
}); 