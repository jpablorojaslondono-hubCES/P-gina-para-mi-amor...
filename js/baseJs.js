// ==========================================
// LÓGICA DEL LOGIN CON LOCALSTORAGE
// ==========================================
const loginScreen = document.getElementById('login-screen');
const btnLogin = document.getElementById('btn-login');
const userInput = document.getElementById('login-user');
const passInput = document.getElementById('login-pass');
const errorMsg = document.getElementById('login-error');

// 1. Revisar si ya inició sesión antes
if (localStorage.getItem('jimenaLogin') === 'true') {
    loginScreen.classList.add('oculto');
} else {
    document.body.classList.add('bloqueado'); // Evita que haga scroll detrás del login
}

// 2. Función al hacer clic en "Entrar"
btnLogin.addEventListener('click', () => {
    // .trim() quita espacios accidentales. .toLowerCase() convierte a minúsculas para que "Jimena" o "jimena" funcionen.
    const user = userInput.value.trim().toLowerCase();
    const pass = passInput.value.trim().toLowerCase();

    // Validamos las credenciales
    // Validamos las credenciales
    if (user === 'jimena' && pass === 'amor') {
        // 1. Guardamos en la memoria
        localStorage.setItem('jimenaLogin', 'true');

        // 2. Ocultamos el formulario y el mensaje de error
        userInput.style.display = 'none';
        passInput.style.display = 'none';
        btnLogin.style.display = 'none';
        errorMsg.style.display = 'none';
        document.querySelector('.login-hint').style.display = 'none';
        document.querySelector('.login-box h2').style.display = 'none'; // Oculta el "Alto ahí"

        // 3. Mostramos el mensaje de éxito
        const successMsg = document.getElementById('success-message');
        successMsg.style.display = 'flex';

        // 4. ESPERAMOS 1.5 segundos (1500 ms) para que ella vea el "¡CORRECTO!"
        setTimeout(() => {
            // Ahora sí, ocultamos toda la pantalla de login
            loginScreen.classList.add('oculto');
            document.body.classList.remove('bloqueado');

            // Disparamos la animación del Hero
            const heroElements = document.querySelectorAll('#hero .hidden');
            heroElements.forEach((el, index) => {
                setTimeout(() => el.classList.add('visible'), index * 400);
            });
        }, 1500); // <--- Aquí está la magia del tiempo de espera

    } else {
        // ... (tu código de error se queda igual) ...
        // ¡Incorrecto! Mostramos error y sacudimos el input (opcional, pero se ve pro)
        errorMsg.style.display = 'block';
        passInput.value = ''; // Limpiamos solo la contraseña
        passInput.focus(); // Volvemos a poner el cursor ahí

        // Pequeña animación de error (sacudida)
        userInput.style.borderColor = '#ff4757';
        passInput.style.borderColor = '#ff4757';
        setTimeout(() => {
            userInput.style.borderColor = '#eee';
            passInput.style.borderColor = '#eee';
        }, 1000);
    }
});

// Permitir dar "Enter" en el teclado para enviar
passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnLogin.click();
});

// ==========================================
// AQUÍ COMIENZA TU CÓDIGO ORIGINAL DEL JS...
// (El del Intersection Observer, etc.)
// ==========================================

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