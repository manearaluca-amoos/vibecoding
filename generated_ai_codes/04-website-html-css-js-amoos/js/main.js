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

    // Highlight Modal Functionality
    initializeHighlightModal();

    // Scroll Animation Functionality
    initializeScrollAnimations();

    // Email Forms Functionality
    initializeEmailForms();

    // Scroll to Top Button Functionality
    initializeScrollToTop();

    // Smooth Scroll Animations
    initializeSmoothScrollAnimations();
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

// Highlight Modal Management
function initializeHighlightModal() {
    const clickableHighlights = document.querySelectorAll('.clickable-highlight');
    const modal = new bootstrap.Modal(document.getElementById('highlightModal'));
    const modalTitle = document.getElementById('highlightModalLabel');
    const modalBody = document.getElementById('highlightModalBody');

    // Define content for each highlight
    const highlightContent = {
        'ai': {
            title: '🤖 Inteligența Artificială în Programare',
            content: `
                <div class="row g-4">
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">Ce înseamnă AI în programare?</h5>
                        <p>Inteligența Artificială revoluționează modul în care dezvoltăm software-ul, oferindu-ne:</p>
                        <ul class="list-styled">
                            <li>Asistență în timpul scrierii codului</li>
                            <li>Generare automată de funcții</li>
                            <li>Debugging și optimizare</li>
                            <li>Documentare automată</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">Tool-uri AI pe care le vei învăța:</h5>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <span class="badge bg-primary-subtle text-primary px-3 py-2">GitHub Copilot</span>
                            <span class="badge bg-primary-subtle text-primary px-3 py-2">ChatGPT</span>
                            <span class="badge bg-primary-subtle text-primary px-3 py-2">Claude AI</span>
                            <span class="badge bg-primary-subtle text-primary px-3 py-2">Cursor AI</span>
                        </div>
                        <p class="text-muted">Aceste tool-uri te ajută să devii de 5-10x mai productiv în dezvoltarea de aplicații!</p>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-dark-transparent rounded">
                    <h6 class="text-warning">💡 Știai că:</h6>
                    <p class="mb-0">Programatorii care folosesc AI sunt cu 55% mai rapizi și scriu cod cu 27% mai puține bug-uri decât cei care nu folosesc aceste tehnologii.</p>
                </div>
            `
        },
        'vibe-coding': {
            title: '🎯 Vibe Coding - Programarea Modernă',
            content: `
                <div class="row g-4">
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">Ce este Vibe Coding?</h5>
                        <p>O metodologie modernă de programare care combină:</p>
                        <ul class="list-styled">
                            <li>Fluiditate în scrierea codului</li>
                            <li>Intuiție dezvoltată prin practică</li>
                            <li>Colaborare seamless cu AI</li>
                            <li>Focus pe rezultate rapide</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">Avantajele Vibe Coding:</h5>
                        <ul class="list-styled">
                            <li><strong>Învățare accelerată</strong> - rezultate în săptămâni, nu ani</li>
                            <li><strong>Creativitate sporită</strong> - focus pe soluții, nu pe sintaxă</li>
                            <li><strong>Adaptabilitate</strong> - ești pregătit pentru tehnologii noi</li>
                            <li><strong>Productivitate maximă</strong> - cu ajutorul AI</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-dark-transparent rounded">
                    <h6 class="text-success">🚀 În cursul nostru vei învăța:</h6>
                    <div class="row g-2 mt-2">
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">HTML5 & CSS3</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">JavaScript Modern</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">React Basics</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">API Integration</span></div>
                    </div>
                </div>
            `
        },
        'wordpress': {
            title: '🚀 WordPress - Platforma Web Nr. 1 Mondial',
            content: `
                <div class="row g-4">
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">De ce WordPress?</h5>
                        <p>WordPress alimentează peste 43% din toate website-urile de pe internet și este alegerea #1 pentru:</p>
                        <ul class="list-styled">
                            <li>Ușurință în utilizare - fără cod necesar</li>
                            <li>Flexibilitate maximă - mii de teme și plugin-uri</li>
                            <li>SEO optimizat din start</li>
                            <li>Comunitate masivă de suport</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">WordPress + AI = Superputere:</h5>
                        <ul class="list-styled">
                            <li><strong>Content AI</strong> - generare automată de conținut</li>
                            <li><strong>Design inteligent</strong> - layout-uri optimizate</li>
                            <li><strong>SEO automat</strong> - optimizare cu AI</li>
                            <li><strong>Chatbot-uri</strong> - suport client 24/7</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-dark-transparent rounded">
                    <h6 class="text-success">🎯 În cursul WordPress vei crea:</h6>
                    <div class="row g-2 mt-2">
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">Site de prezentare</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">Blog profesional</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">Magazin online</span></div>
                        <div class="col-sm-6"><span class="badge bg-success-subtle text-success w-100 py-2">Portofoliu personal</span></div>
                    </div>
                </div>
                <div class="mt-3 p-3 bg-dark-transparent rounded">
                    <h6 class="text-warning">⚡ Fakt rapid:</h6>
                    <p class="mb-0">Cu WordPress și AI poți crea un website complet funcțional în doar 2-3 ore, comparativ cu săptămâni de muncă folosind metode tradiționale!</p>
                </div>
            `
        }
    };

    // Add click event to each clickable highlight
    clickableHighlights.forEach(highlight => {
        highlight.addEventListener('click', (e) => {
            e.preventDefault();
            const highlightType = highlight.getAttribute('data-highlight');
            const content = highlightContent[highlightType];

            if (content) {
                modalTitle.textContent = content.title;
                modalBody.innerHTML = content.content;
                modal.show();
            }
        });
    });

    // Handle modal workshop button click
    const modalWorkshopBtn = document.getElementById('modalWorkshopBtn');
    modalWorkshopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close the modal first
        modal.hide();
        
        // Wait for modal to close, then scroll to workshops
        setTimeout(() => {
            const workshopsSection = document.querySelector('#workshops');
            if (workshopsSection) {
                workshopsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300); // Wait for modal close animation to complete
    });
}

// Scroll Animation Management
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Once animated, we can stop observing this element
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe the hero lead text
    const heroLead = document.querySelector('.hero .lead');
    if (heroLead) {
        scrollObserver.observe(heroLead);
    }

    // Add staggered animation for highlighted words
    const highlightedWords = document.querySelectorAll('.hero .lead .highlight-code');
    highlightedWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.animation = `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            word.style.animationDelay = `${1.5 + (index * 0.2)}s`;
        }, 100);
    });
}

// Add CSS for highlighted words animation
const style = document.createElement('style');
style.textContent = `
    .hero .lead .highlight-code {
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Email Forms Functionality
function initializeEmailForms() {
    // WordPress Email Form
    const wordpressForm = document.getElementById('wordpressEmailForm');
    const wordpressModal = new bootstrap.Modal(document.getElementById('wordpressModal'));
    
    if (wordpressForm) {
        wordpressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('wordpressEmail').value;
            
            if (email) {
                // Show success message
                showEmailSuccess('WordPress Workshop', email);
                // Close modal
                wordpressModal.hide();
                // Reset form
                wordpressForm.reset();
            }
        });
    }

    // Vibe Coding Email Form
    const vibeCodingForm = document.getElementById('vibeCodingEmailForm');
    const vibeCodingModal = new bootstrap.Modal(document.getElementById('vibeCodingModal'));
    
    if (vibeCodingForm) {
        vibeCodingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('vibeCodingEmail').value;
            
            if (email) {
                // Show success message
                showEmailSuccess('Vibe Coding', email);
                // Close modal
                vibeCodingModal.hide();
                // Reset form
                vibeCodingForm.reset();
            }
        });
    }
}

// Show success message after email submission
function showEmailSuccess(workshopType, email) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 p-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <div class="toast show bg-dark-card border-success" role="alert">
            <div class="toast-header bg-dark-card border-secondary">
                <strong class="me-auto text-success">✅ Înregistrare reușită!</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body text-white">
                Mulțumim! Te-am înregistrat pentru <strong>${workshopType}</strong>.<br>
                Vei primi detaliile la <strong>${email}</strong> în următoarele 24 de ore.
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Console log for demo purposes (in production, this would be sent to your backend)
    console.log(`Email submitted for ${workshopType}: ${email}`);
}

// Scroll to Top Button Management
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    const toggleScrollButton = () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    };

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);

    // Initial check
    toggleScrollButton();
}

// Smooth Scroll Animations
function initializeSmoothScrollAnimations() {
    // Create intersection observer for smooth scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for cards in the same container
                const delay = entry.target.classList.contains('card') ? index * 100 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Stop observing once animated
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-apply scroll-animate class to elements that should animate
    const animatableElements = [
        '.section-title',
        '.card.bg-dark-card',
        '.lead',
        '.btn',
        '.list-unstyled',
        '.faq-item',
        '.badge',
        '.mentor-placeholder',
        'p:not(.text-muted):not(.small)'
    ];

    // Apply scroll-animate class and observe elements
    animatableElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Skip if already has scroll-animate class
            if (!element.classList.contains('scroll-animate')) {
                element.classList.add('scroll-animate');
                scrollObserver.observe(element);
            }
        });
    });

    // Special handling for cards with stagger effect
    const cardContainers = document.querySelectorAll('.row.g-4, .workshops-grid, .problem-grid');
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (!card.classList.contains('scroll-animate')) {
                card.classList.add('scroll-animate');
                // Add custom delay based on position
                card.style.transitionDelay = `${index * 0.1}s`;
                scrollObserver.observe(card);
            }
        });
    });

    // Special handling for list items
    const lists = document.querySelectorAll('.list-unstyled');
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Handle elements that are already in view on page load
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.scroll-animate');
        visibleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.classList.add('visible');
                scrollObserver.unobserve(element);
            }
        });
    }, 100);
} 