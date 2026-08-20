document.addEventListener('DOMContentLoaded', () => {

    
    // 1. ANIMACIÓN DE ENTRADA (Hero)
    // Aparecen en cascada uno tras otro
    const heroElements = document.querySelectorAll('#hero .hidden');
    setTimeout(() => {
        heroElements.forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 400); // 400ms de retraso entre cada uno
        });
    }, 300);

    // 2. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
    // Hace que las secciones aparezcan suavemente al bajar
    const observerOptions = { 
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo se anima una vez para mejor rendimiento
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase 'hidden' dentro del main
    document.querySelectorAll('main .hidden').forEach(el => observer.observe(el));

    // 3. INTERACCIÓN DEL BOTÓN FINAL
    const btnSorpresa = document.getElementById('btn-sorpresa');
    const regaloFinal = document.getElementById('regalo-final');

    if (btnSorpresa && regaloFinal) {
        btnSorpresa.addEventListener('click', () => {
            // 🛠️ CONFIGURAR: Aquí puedes añadir tu lógica de JS (confeti, mostrar un video, etc.)
            
            // Ocultar botón con transición
            btnSorpresa.style.opacity = '0';
            setTimeout(() => {
                btnSorpresa.style.display = 'none';
                
                // Mostrar regalo final
                regaloFinal.style.display = 'block';
                // Pequeño timeout para permitir que el navegador procese el display:block antes de añadir la clase visible (para la transición CSS)
                setTimeout(() => {
                    regaloFinal.classList.add('visible');
                }, 50);
            }, 300);

            // 🛠️ CONFIGURAR EXTRA: Si quieres confeti, descomenta la siguiente línea y añade el script de canvas-confetti en tu HTML:
            // confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#ff758f', '#ff7eb3', '#ffffff'] });
        });
    }

    // 4. EFECTOS EN LA GALERÍA (Click)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 🛠️ CONFIGURAR: Aquí puedes abrir un modal (lightbox) con la imagen en grande
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            console.log('Abriendo imagen:', imgAlt, 'Ruta:', imgSrc);
            
            // Ejemplo simple: podrías crear un div modal dinámicamente aquí si lo deseas
        });
    });

});