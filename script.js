// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }, index * 200);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las secciones con clase fade-in-up
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-in-up');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Control de reproductor de música
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const volumeSlider = document.getElementById('volumeSlider');

    // Configurar volumen inicial
    audioPlayer.volume = volumeSlider.value / 100;

    // Función para reproducir/pausar
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Control de volumen
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audioPlayer.volume = volume;
        
        // Actualizar el gradiente del slider
        const percentage = e.target.value;
        e.target.style.background = `linear-gradient(to right, var(--primary-pink) 0%, var(--primary-pink) ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
    });

    // Efecto parallax suave en el scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const background = document.querySelector('.background-blur');
                if (background) {
                    background.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Contador de tiempo desde que se conocieron
    const startDate = new Date('2025-08-07T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        // Calcular el tiempo transcurrido
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        // Calcular años y meses
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calcular días restantes después de años y meses
        const tempDate = new Date(startDate);
        tempDate.setFullYear(tempDate.getFullYear() + years);
        tempDate.setMonth(tempDate.getMonth() + months);
        const remainingDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
        
        // Actualizar el DOM
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = remainingDays;
        document.getElementById('hours').textContent = hours % 24;
        document.getElementById('minutes').textContent = minutes % 60;
        document.getElementById('seconds').textContent = seconds % 60;
    }

    // Actualizar cada segundo
    setInterval(updateCounter, 1000);
    updateCounter(); // Llamada inicial
});
