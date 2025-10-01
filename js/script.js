document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slideshowImages = [
        'images/slideshow/church-1.jpg',
        'images/slideshow/church-2.jpg',
        'images/slideshow/church-3.jpg',
        'images/slideshow/church-4.jpg'
    ];

    const slideshowContainer = document.querySelector('.slideshow-container');
    
    // Create slides
    slideshowImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `url(${image})`;
        
        // Make the first slide active
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
    
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Function to change slides
    function changeSlide() {
        if (!slides.length) return;
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide or back to first slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    if (slides.length) setInterval(changeSlide, 5000);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
    
    // Helper to safely get banner height (banner may not exist)
    function getBannerHeight() {
        const banner = document.querySelector('.live-stream-banner');
        return banner ? banner.offsetHeight : 0;
    }

    // Smooth scrolling for anchor links (internal only)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#top') {
                // Allow default for #top so native behavior triggers, then adjust manually
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            // Only handle in-page anchors that actually exist
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // let browser handle (maybe external hash)
            e.preventDefault();
            const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
            const totalOffset = headerHeight + getBannerHeight();
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handling
    const visitForm = document.getElementById('visit-form');
    
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(visitForm);
            const formDataObj = {};
            formData.forEach((value, key) => { formDataObj[key] = value; });
            console.log('Form submitted with data:', formDataObj);
            // You can handle AJAX submission here if needed
        });
    }
});
