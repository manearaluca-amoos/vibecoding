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

    // FAQ Functionality
    initializeFAQ();
});

// FAQ Management Functions
function initializeFAQ() {
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const categories = document.querySelectorAll('.faq-category');
    const categoryTitle = document.getElementById('faq-category-title');
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Category switching functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Update active category button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update category title
            categoryTitle.textContent = button.textContent;
            
            // Show target category, hide others
            categories.forEach(category => {
                if (category.getAttribute('data-category') === targetCategory) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });

            // Reset all FAQ items in the new category
            const activeCategoryItems = document.querySelectorAll(`.faq-category[data-category="${targetCategory}"] .faq-item`);
            activeCategoryItems.forEach(item => {
                item.classList.remove('active');
            });
        });
    });

    // FAQ accordion functionality
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentNode;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items in the same category
            const currentCategory = faqItem.closest('.faq-category');
            const allItemsInCategory = currentCategory.querySelectorAll('.faq-item');
            allItemsInCategory.forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
} 