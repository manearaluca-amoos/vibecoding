/* ========================================================================
   AMOOS.RO - INTERACTIVE LANDING PAGE JAVASCRIPT
   Modern animations and interactions using GSAP and vanilla JavaScript
   Using Hungarian notation for all variables
   ======================================================================== */

/* ========================================================================
   GLOBAL VARIABLES (Hungarian Notation)
   ======================================================================== */
let bIsLoaded = false;                    // Boolean: page loaded state
let nScrollPosition = 0;                  // Number: current scroll position
let bFloatingCTAVisible = false;          // Boolean: floating CTA visibility state
let oNavbar = null;                       // Object: navbar DOM element
let oFloatingCTA = null;                  // Object: floating CTA DOM element
let aTriggerElements = [];                // Array: elements to animate on scroll
let tlMainTimeline = null;                // Timeline: main GSAP timeline
let nCounterAnimationSpeed = 2000;          // Number: counter animation speed

/* ========================================================================
   DOM CONTENT LOADED EVENT
   Initializes all functionality when the DOM is ready
   ======================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Immediate fallback - show critical elements right away
    const aCriticalElements = document.querySelectorAll('.sWorkshopDate, .sDateCard, .sHeroCTA .btn, .sMainHeadline, .sTagline');
    aCriticalElements.forEach(function(oElement) {
        oElement.style.opacity = '1';
        oElement.style.visibility = 'visible';
        oElement.style.transform = 'none';
    });
    
    try {
        initializeElements();
        initializeAnimations();
        initializeScrollEffects();
        initializeInteractions();
        initializeFormHandlers();
        initializeCounters();
        initializeFloatingCTA();
        initializeModalForm();
        
        bIsLoaded = true;
        console.log('Amoos.ro landing page initialized successfully');
    } catch (error) {
        console.error('Error initializing landing page:', error);
        // Fallback: ensure all elements are visible even if initialization fails
        showElementsWithoutAnimation();
    }
});

// Additional safety check - show elements after a short delay if they're still hidden
setTimeout(function() {
    const aHiddenElements = document.querySelectorAll('.sWorkshopDate[style*="opacity: 0"], .sDateCard[style*="opacity: 0"]');
    if (aHiddenElements.length > 0) {
        console.warn('Found hidden elements, forcing visibility');
        showElementsWithoutAnimation();
    }
}, 1000);

/* ========================================================================
   ELEMENT INITIALIZATION FUNCTIONS
   Sets up DOM element references and initial states
   ======================================================================== */
function initializeElements() {
    oNavbar = document.querySelector('.navbar');
    oFloatingCTA = document.getElementById('sFloatingCTA');
    
    // Get all elements that need scroll-triggered animations
    aTriggerElements = [
        ...document.querySelectorAll('.sProblemCard'),
        ...document.querySelectorAll('.sTestimonialCard'),
        ...document.querySelectorAll('.sPortfolioItem'),
        ...document.querySelectorAll('.sFeatureItem'),
        ...document.querySelectorAll('.sStatItem')
    ];
    
    // Set initial states for animated elements
    gsap.set(aTriggerElements, { 
        opacity: 0, 
        y: 50 
    });
    
    // Set initial state for floating CTA
    if (oFloatingCTA) {
        gsap.set(oFloatingCTA, { 
            opacity: 0, 
            scale: 0, 
            y: 100 
        });
    }
}

/* ========================================================================
   ANIMATION INITIALIZATION
   Sets up the main timeline and hero section animations
   ======================================================================== */
function initializeAnimations() {
    // Ensure GSAP is loaded before initializing animations
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, showing elements without animation');
        showElementsWithoutAnimation();
        return;
    }
    
    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Create main timeline for hero section
    tlMainTimeline = gsap.timeline();
    
    // Ensure critical elements are visible first
    gsap.set(['.sWorkshopDate', '.sDateCard', '.sHeroCTA .btn'], {
        opacity: 1,
        visibility: 'visible'
    });
    
    // Hero section animation with workshop date
    tlMainTimeline
        .from('.sMainHeadline', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        })
        .from('.sTagline', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.sWorkshopDate .sDateCard', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)',
            onComplete: function() {
                // Add floating animation to date card
                gsap.to('.sDateCard', {
                    duration: 3,
                    y: -10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut'
                });
            }
        }, '-=0.3')
        .from('.sHeroCTA .btn', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.4');

    // Section animations using ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        animateProblemSection();
        animateSolutionSection();
        animatePortfolioSection();
        animateTestimonialsSection();
        animateAboutSection();
        animateFAQSection();
        animateFinalCTASection();
    }
}

/* ========================================================================
   FALLBACK FUNCTION FOR NO ANIMATION
   Shows elements without animation if GSAP fails to load
   ======================================================================== */
function showElementsWithoutAnimation() {
    const aElementsToShow = [
        '.sMainHeadline',
        '.sTagline', 
        '.sWorkshopDate',
        '.sDateCard',
        '.sHeroCTA .btn',
        '.sProblemCard',
        '.sTestimonialCard',
        '.sPortfolioItem',
        '.sSolutionCard'
    ];
    
    aElementsToShow.forEach(function(sSelector) {
        const aElements = document.querySelectorAll(sSelector);
        aElements.forEach(function(oElement) {
            oElement.style.opacity = '1';
            oElement.style.visibility = 'visible';
            oElement.style.transform = 'none';
        });
    });
}

function animateProblemSection() {
    gsap.from('.sProblemCard', {
        scrollTrigger: {
            trigger: '#sProblemSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
}

function animateSolutionSection() {
    gsap.from('.sSolutionCard', {
        scrollTrigger: {
            trigger: '#sSolutionSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        scale: 0.95,
        opacity: 0,
        ease: 'power2.out'
    });
}

function animatePortfolioSection() {
    gsap.from('.sPortfolioItem', {
        scrollTrigger: {
            trigger: '#sProofSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out'
    });
    
    gsap.from('.sClientLogo', {
        scrollTrigger: {
            trigger: '.sClientLogos',
            start: 'top 90%'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
}

function animateTestimonialsSection() {
    gsap.from('.sTestimonialCard', {
        scrollTrigger: {
            trigger: '#sTestimonialsSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
}

function animateAboutSection() {
    gsap.from('.sAboutImage img', {
        scrollTrigger: {
            trigger: '#sAboutSection',
            start: 'top 80%'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.sAboutContent > *', {
        scrollTrigger: {
            trigger: '#sAboutSection',
            start: 'top 80%'
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out'
    });
}

function animateFAQSection() {
    gsap.from('.sFAQItem', {
        scrollTrigger: {
            trigger: '#sFAQSection',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

function animateFinalCTASection() {
    gsap.from('.sFinalCTACard', {
        scrollTrigger: {
            trigger: '#sFinalCTA',
            start: 'top 80%'
        },
        duration: 1,
        scale: 0.95,
        opacity: 0,
        ease: 'back.out(1.2)'
    });
}

/* ========================================================================
   SCROLL EFFECTS INITIALIZATION
   Sets up navbar transparency and floating CTA visibility
   ======================================================================== */
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
}

/* ========================================================================
   SCROLL HANDLER
   Manages scroll-based effects like navbar transparency and floating CTA
   ======================================================================== */
function handleScroll() {
    nScrollPosition = window.pageYOffset;
    
    updateNavbarAppearance();
    updateFloatingCTA();
    updateScrollProgress();
}

/* ========================================================================
   NAVBAR APPEARANCE UPDATE
   Changes navbar background opacity based on scroll position
   ======================================================================== */
function updateNavbarAppearance() {
    if (!oNavbar) return;
    
    const nNavbarThreshold = 100;
    const rOpacity = Math.min(nScrollPosition / nNavbarThreshold, 1);
    
    if (nScrollPosition > nNavbarThreshold) {
        oNavbar.style.background = `rgba(0, 0, 0, ${0.95})`;
        oNavbar.style.backdropFilter = 'blur(20px)';
    } else {
        oNavbar.style.background = `rgba(0, 0, 0, ${0.7 + (rOpacity * 0.25)})`;
        oNavbar.style.backdropFilter = `blur(${10 + (rOpacity * 10)}px)`;
    }
}

/* ========================================================================
   FLOATING CTA UPDATE
   Shows/hides floating CTA based on scroll position
   ======================================================================== */
function updateFloatingCTA() {
    if (!oFloatingCTA) return;
    
    const oFinalCTASection = document.getElementById('sFinalCTA');
    const rFinalCTARect = oFinalCTASection.getBoundingClientRect();
    
    // Show floating CTA when scrolled down but hide when Final CTA is visible
    if (nScrollPosition > 800 && rFinalCTARect.top > 100) {
        if (oFloatingCTA.classList.contains('d-none')) {
            oFloatingCTA.classList.remove('d-none');
            gsap.fromTo(oFloatingCTA, {
                opacity: 0,
                scale: 0.8,
                y: 20
            }, {
                duration: 0.3,
                opacity: 1,
                scale: 1,
                y: 0,
                ease: 'back.out(1.7)'
            });
        }
    } else {
        if (!oFloatingCTA.classList.contains('d-none')) {
            gsap.to(oFloatingCTA, {
                duration: 0.3,
                opacity: 0,
                scale: 0.8,
                y: 20,
                ease: 'power2.out',
                onComplete: function() {
                    oFloatingCTA.classList.add('d-none');
                }
            });
        }
    }
}

/* ========================================================================
   SCROLL PROGRESS INDICATOR
   Updates a visual indicator of scroll progress (if implemented)
   ======================================================================== */
function updateScrollProgress() {
    const nDocumentHeight = document.body.scrollHeight - window.innerHeight;
    const rScrollPercent = (nScrollPosition / nDocumentHeight) * 100;
    
    // If you want to add a scroll progress bar, implement it here
    // Example: document.querySelector('.scroll-progress').style.width = rScrollPercent + '%';
}

/* ========================================================================
   INTERACTION HANDLERS
   Sets up click handlers and other user interactions
   ======================================================================== */
function initializeInteractions() {
    setupSmoothScrolling();
    setupButtonHoverEffects();
    setupCardHoverEffects();
    setupAccordionEnhancements();
}

/* ========================================================================
   SMOOTH SCROLLING SETUP
   Enhances anchor link scrolling with smooth animations
   ======================================================================== */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(oAnchor => {
        oAnchor.addEventListener('click', function(eEvent) {
            eEvent.preventDefault();
            
            const sTargetId = this.getAttribute('href');
            const oTargetElement = document.querySelector(sTargetId);
            
            if (oTargetElement) {
                const nTargetPosition = oTargetElement.offsetTop - 80;
                
                gsap.to(window, {
                    scrollTo: nTargetPosition,
                    duration: 1.2,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

/* ========================================================================
   BUTTON HOVER EFFECTS
   Adds enhanced hover animations to buttons
   ======================================================================== */
function setupButtonHoverEffects() {
    document.querySelectorAll('.btn').forEach(oButton => {
        oButton.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        oButton.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

/* ========================================================================
   CARD HOVER EFFECTS
   Adds subtle animations to card elements on hover
   ======================================================================== */
function setupCardHoverEffects() {
    const aCardSelectors = [
        '.sProblemCard',
        '.sTestimonialCard',
        '.sPortfolioItem',
        '.sSolutionCard'
    ];
    
    aCardSelectors.forEach(sSelector => {
        document.querySelectorAll(sSelector).forEach(oCard => {
            oCard.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            oCard.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    });
}

/* ========================================================================
   ACCORDION ENHANCEMENTS
   Adds smooth animations to FAQ accordion interactions
   ======================================================================== */
function setupAccordionEnhancements() {
    document.querySelectorAll('.accordion-button').forEach(oButton => {
        oButton.addEventListener('click', function() {
            const oTargetCollapse = document.querySelector(this.getAttribute('data-bs-target'));
            
            if (oTargetCollapse) {
                // Add a slight delay to ensure Bootstrap animation completes
                setTimeout(() => {
                    if (!this.classList.contains('collapsed')) {
                        gsap.fromTo(oTargetCollapse.querySelector('.accordion-body'), 
                            { opacity: 0, y: -20 },
                            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                        );
                    }
                }, 150);
            }
        });
    });
}

/* ========================================================================
   FORM HANDLERS
   Sets up form submission and validation handlers
   ======================================================================== */
function initializeFormHandlers() {
    // WhatsApp link click tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(oWhatsAppLink => {
        oWhatsAppLink.addEventListener('click', function() {
            // Track WhatsApp click event
            console.log('WhatsApp CTA clicked');
            
            // Add analytics tracking here if needed
            // gtag('event', 'whatsapp_click', { ... });
        });
    });
    
    // CTA button click tracking
    document.querySelectorAll('.btn-primary').forEach(oCTAButton => {
        oCTAButton.addEventListener('click', function() {
            // Add smooth pulse animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
            
            console.log('CTA button clicked:', this.textContent.trim());
        });
    });
}

/* ========================================================================
   RESIZE HANDLER
   Handles window resize events and updates responsive elements
   ======================================================================== */
function handleResize() {
    // Update floating CTA position if needed
    updateFloatingCTA();
    
    // Refresh ScrollTrigger positions
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

/* ========================================================================
   UTILITY FUNCTIONS
   Helper functions for common operations
   ======================================================================== */

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} oElement - The element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(oElement) {
    const oRect = oElement.getBoundingClientRect();
    return (
        oRect.top >= 0 &&
        oRect.left >= 0 &&
        oRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        oRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function to limit function execution frequency
 * @param {Function} fnFunction - Function to debounce
 * @param {number} nDelay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(fnFunction, nDelay) {
    let nTimeoutId;
    return function (...aArgs) {
        clearTimeout(nTimeoutId);
        nTimeoutId = setTimeout(() => fnFunction.apply(this, aArgs), nDelay);
    };
}

/* ========================================================================
   PERFORMANCE OPTIMIZATION
   Optimizes animations and interactions for better performance
   ======================================================================== */

// Use debounced scroll handler for better performance
const handleScrollDebounced = debounce(handleScroll, 10);
window.addEventListener('scroll', handleScrollDebounced, { passive: true });

// Preload critical images
function preloadImages() {
    const aImageUrls = [
        'https://via.placeholder.com/500x400/1d1d1f/ffffff?text=AI+Code',
        'https://via.placeholder.com/600x400/1d1d1f/ffffff?text=Live+Workshop'
    ];
    
    aImageUrls.forEach(sUrl => {
        const oImg = new Image();
        oImg.src = sUrl;
    });
}

// Initialize image preloading
preloadImages();

/* ========================================================================
   ERROR HANDLING
   Global error handling for smoother user experience
   ======================================================================== */
window.addEventListener('error', function(eEvent) {
    console.warn('JavaScript error caught:', eEvent.error);
    // Implement fallback behaviors if needed
});

/* ========================================================================
   EXPORT FOR TESTING
   Export functions for testing purposes if needed
   ======================================================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeElements,
        initializeAnimations,
        handleScroll,
        isInViewport,
        debounce
    };
}

/* ========================================================================
   COUNTER ANIMATIONS
   ======================================================================== */
function initializeCounters() {
    const aCounterElements = document.querySelectorAll('.sStatNumber');
    
    aCounterElements.forEach(function(oElement) {
        const sTargetText = oElement.textContent;
        const nTargetNumber = parseInt(sTargetText.replace(/\D/g, ''));
        const sSuffix = sTargetText.replace(/[0-9]/g, '');
        
        gsap.from(oElement, {
            scrollTrigger: {
                trigger: oElement,
                start: 'top 90%'
            },
            duration: 2,
            textContent: 0,
            snap: { textContent: 1 },
            ease: 'power2.out',
            onUpdate: function() {
                oElement.textContent = Math.ceil(this.targets()[0].textContent) + sSuffix;
            }
        });
    });
}

/* ========================================================================
   FLOATING CTA BUTTON
   ======================================================================== */
function initializeFloatingCTA() {
    oFloatingCTA = document.getElementById('sFloatingCTA');
}

/* ========================================================================
   MODAL FORM FUNCTIONALITY
   ======================================================================== */
function initializeModalForm() {
    const oWorkshopForm = document.getElementById('sWorkshopForm');
    const oEmailInput = document.getElementById('sEmailInput');
    const oSuccessMessage = document.getElementById('sSuccessMessage');
    const oRegistrationForm = document.querySelector('.sRegistrationForm');
    
    if (oWorkshopForm) {
        oWorkshopForm.addEventListener('submit', function(oEvent) {
            oEvent.preventDefault();
            handleFormSubmission(oEmailInput, oSuccessMessage, oRegistrationForm);
        });
    }
    
    // Email validation on input
    if (oEmailInput) {
        oEmailInput.addEventListener('input', function() {
            validateEmailInput(oEmailInput);
        });
    }
    
    // Reset form when modal is hidden
    const oWorkshopModal = document.getElementById('sWorkshopModal');
    if (oWorkshopModal) {
        oWorkshopModal.addEventListener('hidden.bs.modal', function() {
            resetModalForm(oWorkshopForm, oSuccessMessage, oRegistrationForm);
        });
        
        // Animate modal on show
        oWorkshopModal.addEventListener('shown.bs.modal', function() {
            gsap.from('.sModalContent', {
                duration: 0.3,
                scale: 0.9,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        });
    }
}

function validateEmailInput(oEmailInput) {
    const sEmailValue = oEmailInput.value.trim();
    const bIsValidEmail = isValidEmail(sEmailValue);
    
    if (sEmailValue.length > 0) {
        if (bIsValidEmail) {
            oEmailInput.classList.remove('is-invalid');
            oEmailInput.classList.add('is-valid');
        } else {
            oEmailInput.classList.remove('is-valid');
            oEmailInput.classList.add('is-invalid');
        }
    } else {
        oEmailInput.classList.remove('is-valid', 'is-invalid');
    }
}

function isValidEmail(sEmail) {
    const oEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return oEmailRegex.test(sEmail);
}

function handleFormSubmission(oEmailInput, oSuccessMessage, oRegistrationForm) {
    const sEmailValue = oEmailInput.value.trim();
    const oTermsCheckbox = document.getElementById('sAgreeTerms');
    const bIsFormValid = validateForm(sEmailValue, oTermsCheckbox);
    
    if (bIsFormValid) {
        // Simulate form submission
        showLoadingState(oRegistrationForm);
        
        // Simulate API call delay
        setTimeout(function() {
            showSuccessMessage(oSuccessMessage, oRegistrationForm, sEmailValue);
        }, 1500);
    }
}

function validateForm(sEmailValue, oTermsCheckbox) {
    let bIsValid = true;
    
    // Validate email
    if (!sEmailValue || !isValidEmail(sEmailValue)) {
        const oEmailInput = document.getElementById('sEmailInput');
        oEmailInput.classList.add('is-invalid');
        bIsValid = false;
    }
    
    // Validate terms checkbox
    if (!oTermsCheckbox.checked) {
        oTermsCheckbox.classList.add('is-invalid');
        bIsValid = false;
    } else {
        oTermsCheckbox.classList.remove('is-invalid');
    }
    
    return bIsValid;
}

function showLoadingState(oRegistrationForm) {
    const oSubmitButton = oRegistrationForm.querySelector('.sSubmitBtn');
    const sOriginalText = oSubmitButton.innerHTML;
    
    oSubmitButton.disabled = true;
    oSubmitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Se înregistrează...';
    
    // Store original text for later
    oSubmitButton.setAttribute('data-original-text', sOriginalText);
}

function showSuccessMessage(oSuccessMessage, oRegistrationForm, sEmailValue) {
    // Hide registration form with animation
    gsap.to(oRegistrationForm, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: 'power2.out',
        onComplete: function() {
            oRegistrationForm.style.display = 'none';
            
            // Show success message
            oSuccessMessage.classList.remove('d-none');
            gsap.from(oSuccessMessage, {
                duration: 0.8,
                scale: 0.8,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
            
            // Store email for tracking (if needed)
            console.log('Workshop registration:', sEmailValue);
            
            // Optional: Send data to your backend here
            // sendRegistrationData(sEmailValue);
        }
    });
}

function resetModalForm(oWorkshopForm, oSuccessMessage, oRegistrationForm) {
    if (oWorkshopForm) {
        oWorkshopForm.reset();
    }
    
    // Reset all validation classes
    const aInputElements = document.querySelectorAll('#sWorkshopModal .form-control, #sWorkshopModal .form-check-input');
    aInputElements.forEach(function(oInput) {
        oInput.classList.remove('is-valid', 'is-invalid');
    });
    
    // Reset submit button
    const oSubmitButton = oRegistrationForm.querySelector('.sSubmitBtn');
    if (oSubmitButton && oSubmitButton.hasAttribute('data-original-text')) {
        oSubmitButton.disabled = false;
        oSubmitButton.innerHTML = oSubmitButton.getAttribute('data-original-text');
    }
    
    // Hide success message and show form
    if (!oSuccessMessage.classList.contains('d-none')) {
        oSuccessMessage.classList.add('d-none');
        oRegistrationForm.style.display = 'block';
        oRegistrationForm.style.opacity = '1';
        oRegistrationForm.style.transform = 'translateY(0)';
    }
}

/* ========================================================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ======================================================================== */
function initializeSmoothScrolling() {
    const aAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    aAnchorLinks.forEach(function(oLink) {
        oLink.addEventListener('click', function(oEvent) {
            const sHref = this.getAttribute('href');
            const oTargetElement = document.querySelector(sHref);
            
            if (oTargetElement && sHref !== '#') {
                oEvent.preventDefault();
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: oTargetElement,
                        offsetY: 80
                    },
                    ease: 'power2.out'
                });
            }
        });
    });
}

/* ========================================================================
   UTILITY FUNCTIONS
   ======================================================================== */
function sendRegistrationData(sEmailValue) {
    // This function would handle sending data to your backend
    // Example implementation:
    /*
    fetch('/api/workshop-registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: sEmailValue,
            workshop: 'Vibe Coding cu AI',
            date: '2025-07-03',
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registration successful:', data);
    })
    .catch(error => {
        console.error('Registration error:', error);
    });
    */
}

// Initialize smooth scrolling when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
}); 