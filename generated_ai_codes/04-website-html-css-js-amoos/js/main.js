// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Initialize all Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    const toggleNavbarBg = () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('bg-dark-transparent');
            navbar.classList.add('bg-dark');
        } else {
            navbar.classList.add('bg-dark-transparent');
            navbar.classList.remove('bg-dark');
        }
    };

    window.addEventListener('scroll', toggleNavbarBg);
    toggleNavbarBg(); // Initial check

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 