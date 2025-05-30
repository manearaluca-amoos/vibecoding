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