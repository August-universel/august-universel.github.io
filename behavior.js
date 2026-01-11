document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow > div');
    let slideTimer;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function autoNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Add event listeners for hover to pause/resume timer
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseover', () => {
        clearInterval(slideTimer);
    });
    slideshow.addEventListener('mouseout', () => {
        slideTimer = setInterval(autoNextSlide, 5000);
    });

    // Initialize first slide and start timer
    showSlide(0);
    slideTimer = setInterval(autoNextSlide, 5000);
});
