document.addEventListener('DOMContentLoaded', function() {
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
