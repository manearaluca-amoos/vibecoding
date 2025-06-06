/* ========================================================================
   WEB DEVELOPMENT KICKOFF - LEAD MAGNET INTERACTIVE JAVASCRIPT
   Modern form handling, validation, and animations using GSAP
   Using Hungarian notation for all variables and clean architecture
   ======================================================================== */

/* ========================================================================
   GLOBAL VARIABLES (Hungarian Notation)
   ======================================================================== */
let bIsFormSubmitted = false;           // Boolean: form submission state
let bIsEmailValid = false;              // Boolean: email validation state
let nAnimationDelay = 100;              // Number: animation timing delay
let sCurrentUserEmail = '';             // String: current user email
let oFormElement = null;                // Object: main form DOM element
let oSuccessElement = null;             // Object: success message DOM element
let aRequiredFields = [];               // Array: required form fields
let tlMainTimeline = null;              // Timeline: main GSAP animation timeline

/* ========================================================================
   DOM CONTENT LOADED EVENT
   Initializes all functionality when the DOM is ready
   ======================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeElements();
        initializeFormValidation();
        initializeAnimations();
        initializeScrollEffects();
        initializeAccessibility();
        
        console.log('Lead magnet page initialized successfully');
    } catch (error) {
        console.error('Error initializing lead magnet page:', error);
        // Fallback: ensure form still works without animations
        initializeBasicForm();
    }
});

/* ========================================================================
   ELEMENT INITIALIZATION
   Sets up DOM element references and initial states
   ======================================================================== */
function initializeElements() {
    oFormElement = document.getElementById('sLeadCaptureForm');
    oSuccessElement = document.getElementById('sSuccessMessage');
    
    // Get all required form fields - only email now
    aRequiredFields = [
        document.getElementById('sEmailInput')
    ];
    
    // Validate that all required elements exist
    if (!oFormElement || !oSuccessElement) {
        throw new Error('Required DOM elements not found');
    }
    
    // Set initial ARIA attributes for accessibility
    oFormElement.setAttribute('aria-label', 'Formular înregistrare ghid gratuit');
    oSuccessElement.setAttribute('aria-live', 'polite');
}

/* ========================================================================
   FORM VALIDATION INITIALIZATION
   Sets up real-time validation and submission handling
   ======================================================================== */
function initializeFormValidation() {
    // Add form submission handler
    oFormElement.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation for each required field
    aRequiredFields.forEach(function(oField) {
        if (oField) {
            // Input event for real-time validation
            oField.addEventListener('input', function() {
                validateField(oField);
                updateSubmitButtonState();
            });
            
            // Blur event for complete validation
            oField.addEventListener('blur', function() {
                validateField(oField, true);
            });
            
            // Focus event for better UX
            oField.addEventListener('focus', function() {
                clearFieldError(oField);
            });
        }
    });
}

/* ========================================================================
   FORM SUBMISSION HANDLER
   Processes form data and shows success state
   ======================================================================== */
function handleFormSubmission(oEvent) {
    oEvent.preventDefault();
    
    if (bIsFormSubmitted) {
        return;
    }
    
    // Validate all fields before submission
    let bFormIsValid = validateAllFields();
    
    if (bFormIsValid) {
        // Get form data - only email now
        sCurrentUserEmail = document.getElementById('sEmailInput').value.trim();
        
        // Show loading state
        showLoadingState();
        
        // Simulate API call delay (replace with actual API call)
        setTimeout(function() {
            processFormSubmission();
        }, 2000);
    } else {
        // Focus on first invalid field
        focusFirstInvalidField();
    }
}

/* ========================================================================
   FIELD VALIDATION FUNCTIONS
   Individual field validation with visual feedback
   ======================================================================== */
function validateField(oField, bShowError = false) {
    let bIsValid = false;
    let sErrorMessage = '';
    
    const sFieldValue = oField.value.trim();
    const sFieldType = oField.type;
    const sFieldId = oField.id;
    
    // Email field validation
    if (sFieldId === 'sEmailInput') {
        if (sFieldValue.length === 0) {
            sErrorMessage = 'Te rugăm să introduci adresa de email';
            bIsValid = false;
        } else if (!isValidEmailAddress(sFieldValue)) {
            sErrorMessage = 'Te rugăm să introduci o adresă de email validă';
            bIsValid = false;
        } else {
            bIsValid = true;
        }
        bIsEmailValid = bIsValid;
    }
    
    // Update field visual state
    updateFieldVisualState(oField, bIsValid, sErrorMessage, bShowError);
    
    return bIsValid;
}

/* ========================================================================
   EMAIL VALIDATION UTILITY
   Robust email address validation function
   ======================================================================== */
function isValidEmailAddress(sEmail) {
    const oEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bBasicValidation = oEmailRegex.test(sEmail);
    
    // Additional checks
    const bLengthCheck = sEmail.length <= 254;
    const bNoConsecutiveDots = !/\.\./.test(sEmail);
    const bValidTLD = /\.[a-zA-Z]{2,}$/.test(sEmail);
    
    return bBasicValidation && bLengthCheck && bNoConsecutiveDots && bValidTLD;
}

/* ========================================================================
   FIELD VISUAL STATE MANAGEMENT
   Updates field appearance based on validation state
   ======================================================================== */
function updateFieldVisualState(oField, bIsValid, sErrorMessage, bShowError) {
    const oFeedbackElement = oField.parentNode.querySelector('.invalid-feedback');
    
    // Remove existing validation classes
    oField.classList.remove('is-valid', 'is-invalid');
    
    if (oField.value.trim().length > 0) {
        if (bIsValid) {
            oField.classList.add('is-valid');
            if (oFeedbackElement) {
                oFeedbackElement.textContent = '';
            }
        } else if (bShowError) {
            oField.classList.add('is-invalid');
            if (oFeedbackElement) {
                oFeedbackElement.textContent = sErrorMessage;
            }
        }
    }
}

/* ========================================================================
   FORM STATE MANAGEMENT FUNCTIONS
   Handles form submission states and user feedback
   ======================================================================== */
function validateAllFields() {
    let bAllFieldsValid = true;
    
    aRequiredFields.forEach(function(oField) {
        if (oField) {
            const bFieldValid = validateField(oField, true);
            if (!bFieldValid) {
                bAllFieldsValid = false;
            }
        }
    });
    
    return bAllFieldsValid;
}

function updateSubmitButtonState() {
    const oSubmitButton = document.getElementById('sSubmitButton');
    const bFormValid = bIsEmailValid; // Only check email now
    
    if (oSubmitButton) {
        oSubmitButton.disabled = !bFormValid || bIsFormSubmitted;
        
        if (bFormValid && !bIsFormSubmitted) {
            oSubmitButton.classList.add('btn-ready');
        } else {
            oSubmitButton.classList.remove('btn-ready');
        }
    }
}

function showLoadingState() {
    const oSubmitButton = document.getElementById('sSubmitButton');
    const oCTAText = oSubmitButton.querySelector('.sCTAText');
    const oLoader = oSubmitButton.querySelector('.sCTALoader');
    
    bIsFormSubmitted = true;
    oSubmitButton.disabled = true;
    
    // Hide CTA text and show loader with animation
    if (typeof gsap !== 'undefined') {
        gsap.to(oCTAText, {
            duration: 0.3,
            opacity: 0,
            y: -10,
            onComplete: function() {
                oCTAText.classList.add('d-none');
                oLoader.classList.remove('d-none');
                gsap.fromTo(oLoader, 
                    { opacity: 0, y: 10 }, 
                    { duration: 0.3, opacity: 1, y: 0 }
                );
            }
        });
    } else {
        oCTAText.classList.add('d-none');
        oLoader.classList.remove('d-none');
    }
}

function processFormSubmission() {
    // Here you would normally send data to your backend
    // For now, we'll simulate a successful submission
    
    console.log('Form submitted:', {
        email: sCurrentUserEmail,
        timestamp: new Date().toISOString()
    });
    
    // Track conversion (replace with your analytics)
    trackConversion();
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    if (typeof gsap !== 'undefined') {
        // Hide form with animation
        gsap.to(oFormElement, {
            duration: 0.5,
            opacity: 0,
            y: -30,
            ease: 'power2.out',
            onComplete: function() {
                oFormElement.classList.add('d-none');
                
                // Show success message
                oSuccessElement.classList.remove('d-none');
                gsap.fromTo(oSuccessElement, 
                    { opacity: 0, scale: 0.9, y: 30 },
                    { duration: 0.6, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' }
                );
            }
        });
    } else {
        // Fallback without animations
        oFormElement.classList.add('d-none');
        oSuccessElement.classList.remove('d-none');
    }
    
    // Set focus for accessibility
    setTimeout(function() {
        const oSuccessTitle = oSuccessElement.querySelector('.sSuccessTitle');
        if (oSuccessTitle) {
            oSuccessTitle.focus();
        }
    }, 600);
}

/* ========================================================================
   FORM RESET FUNCTIONALITY
   Allows users to return to the form from success state
   ======================================================================== */
function resetForm() {
    // Reset form variables
    bIsFormSubmitted = false;
    bIsEmailValid = false;
    sCurrentUserEmail = '';
    
    // Reset form fields
    oFormElement.reset();
    
    // Clear validation states
    aRequiredFields.forEach(function(oField) {
        if (oField) {
            clearFieldError(oField);
        }
    });
    
    // Reset submit button
    const oSubmitButton = document.getElementById('sSubmitButton');
    const oCTAText = oSubmitButton.querySelector('.sCTAText');
    const oLoader = oSubmitButton.querySelector('.sCTALoader');
    
    oSubmitButton.disabled = true;
    oSubmitButton.classList.remove('btn-ready');
    oCTAText.classList.remove('d-none');
    oLoader.classList.add('d-none');
    
    // Show form and hide success message
    if (typeof gsap !== 'undefined') {
        gsap.to(oSuccessElement, {
            duration: 0.3,
            opacity: 0,
            scale: 0.9,
            onComplete: function() {
                oSuccessElement.classList.add('d-none');
                oFormElement.classList.remove('d-none');
                
                gsap.fromTo(oFormElement,
                    { opacity: 0, y: 30 },
                    { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }
                );
            }
        });
    } else {
        oSuccessElement.classList.add('d-none');
        oFormElement.classList.remove('d-none');
    }
    
    // Focus on first field
    setTimeout(function() {
        if (aRequiredFields[0]) {
            aRequiredFields[0].focus();
        }
    }, 500);
}

/* ========================================================================
   UTILITY FUNCTIONS
   Helper functions for form validation and UX
   ======================================================================== */
function clearFieldError(oField) {
    oField.classList.remove('is-invalid', 'is-valid');
    const oFeedbackElement = oField.parentNode.querySelector('.invalid-feedback');
    if (oFeedbackElement) {
        oFeedbackElement.textContent = '';
    }
}

function focusFirstInvalidField() {
    for (let i = 0; i < aRequiredFields.length; i++) {
        const oField = aRequiredFields[i];
        if (oField && oField.classList.contains('is-invalid')) {
            oField.focus();
            break;
        }
    }
}

function trackConversion() {
    // Google Analytics 4 tracking (replace with your tracking ID)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'lead_capture', {
            'event_category': 'form_submission',
            'event_label': 'web_development_guide',
            'value': 1
        });
    }
    
    // Facebook Pixel tracking (replace with your pixel code)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: '5 Lucruri de Știut Înainte să Înveți Programare Web',
            content_category: 'lead_magnet'
        });
    }
    
    // Generic tracking function - customize as needed
    console.log('Conversion tracked: Lead magnet download');
}

/* ========================================================================
   ANIMATION INITIALIZATION
   Sets up GSAP animations for enhanced user experience
   ======================================================================== */
function initializeAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, skipping animations');
        return;
    }
    
    // Create main timeline
    tlMainTimeline = gsap.timeline();
    
    // Initial animations for page load
    fnPageLoadAnimation();
    setupFloatingElementsAnimation();
    setupInteractionAnimations();
}

/**
 * Main page load animation sequence
 * Orchestrates the entrance animations for all elements
 */
function fnPageLoadAnimation() {
    const sMainLogo = document.getElementById('logoImage');
    const sMainTitle = document.getElementById('titleMain');
    const sSubTitle = document.getElementById('titleSub');
    const sValueProp = document.getElementById('propositionValue');
    const sFormContainer = document.getElementById('containerForm');
    const sVideoContainer = document.getElementById('containerVideo');
    const asTrustElements = document.querySelectorAll('.element-trust');
    const asProofElements = document.querySelectorAll('.badge-proof');

    // Set initial states for animation
    gsap.set([sMainLogo, sMainTitle, sSubTitle, sValueProp, sFormContainer, sVideoContainer], {
        opacity: 0,
        y: 30
    });

    gsap.set([asTrustElements, asProofElements], {
        opacity: 0,
        scale: 0.8
    });

    // Main animation timeline
    const oTimeline = gsap.timeline({ delay: 0.2 });

    oTimeline
        .to(sMainLogo, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to(sValueProp, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to(sMainTitle, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .to(sSubTitle, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .to(sVideoContainer, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .to(sFormContainer, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .to(asTrustElements, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.2')
        .to(asProofElements, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.1');
}

function setupFloatingElementsAnimation() {
    // Animate floating elements
    gsap.to('.sFloatingElement', {
        duration: 3,
        y: -15,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
    });
}

function setupInteractionAnimations() {
    // Form field focus animations
    aRequiredFields.forEach(function(oField) {
        if (oField) {
            oField.addEventListener('focus', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            });
            
            oField.addEventListener('blur', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        }
    });
}

/* ========================================================================
   SCROLL EFFECTS
   Subtle scroll-based animations and interactions
   ======================================================================== */
function initializeScrollEffects() {
    // Only register ScrollTrigger if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for background shapes
    gsap.to('.sShape', {
        scrollTrigger: {
            trigger: '#sHeroSection',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        opacity: 0.5,
        ease: 'none'
    });
    
    // Social proof section animation
    gsap.from('.sStatBadge', {
        scrollTrigger: {
            trigger: '#sSocialProofSection',
            start: 'top 80%'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

/* ========================================================================
   ACCESSIBILITY ENHANCEMENTS
   Keyboard navigation and screen reader support
   ======================================================================== */
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Initialize modal and brand badge functionality
    initializeModalFunctionality();
    initializeBrandBadgeScroll();
}

function handleKeyboardNavigation(oEvent) {
    // Handle Enter key on form submission
    if (oEvent.key === 'Enter' && oEvent.target.closest('#sLeadCaptureForm')) {
        const oSubmitButton = document.getElementById('sSubmitButton');
        if (oSubmitButton && !oSubmitButton.disabled) {
            oSubmitButton.click();
        }
    }
    
    // Handle Escape key to reset form if in success state
    if (oEvent.key === 'Escape' && !oSuccessElement.classList.contains('d-none')) {
        resetForm();
    }
}

function enhanceFocusManagement() {
    // Ensure proper focus order and visibility
    const aFocusableElements = document.querySelectorAll(
        'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    aFocusableElements.forEach(function(oElement) {
        oElement.addEventListener('focus', function() {
            // Ensure focused element is visible
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

/* ========================================================================
   MODAL FUNCTIONALITY
   Handle modal interactions and cross-modal navigation
   ======================================================================== */
function initializeModalFunctionality() {
    // Web Development modal trigger
    const oWebDevTrigger = document.getElementById('sWebDevModal');
    if (oWebDevTrigger) {
        oWebDevTrigger.addEventListener('click', function() {
            const oModal = new bootstrap.Modal(document.getElementById('webDevModal'));
            oModal.show();
        });
    }
    
    // AI modal trigger
    const oAITrigger = document.getElementById('sAIModal');
    if (oAITrigger) {
        oAITrigger.addEventListener('click', function() {
            const oModal = new bootstrap.Modal(document.getElementById('aiModal'));
            oModal.show();
        });
    }
    
    // VibeCoding modal trigger
    const oVibecodingTrigger = document.getElementById('sVibecodingModal');
    if (oVibecodingTrigger) {
        oVibecodingTrigger.addEventListener('click', function() {
            const oModal = new bootstrap.Modal(document.getElementById('vibecodingModal'));
            oModal.show();
        });
    }
    
    // Modal link handlers for smooth scrolling to form
    document.addEventListener('click', function(oEvent) {
        if (oEvent.target.matches('.sModalLink[href="#sLeadCaptureForm"]')) {
            oEvent.preventDefault();
            setTimeout(function() {
                scrollToForm();
            }, 300); // Wait for modal to close
        }
    });
}

/* ========================================================================
   BRAND BADGE SCROLL FUNCTIONALITY
   Smooth scroll to form when brand badge is clicked
   ======================================================================== */
function initializeBrandBadgeScroll() {
    const oBrandBadge = document.getElementById('sBrandBadgeClickable');
    if (oBrandBadge) {
        oBrandBadge.addEventListener('click', function() {
            scrollToForm();
        });
        
        // Add hover effect
        oBrandBadge.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            }
        });
        
        oBrandBadge.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    }
}

function scrollToForm() {
    const oFormElement = document.getElementById('sLeadCaptureForm');
    if (oFormElement) {
        oFormElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Focus on email input after scroll
        setTimeout(function() {
            const oEmailInput = document.getElementById('sEmailInput');
            if (oEmailInput) {
                oEmailInput.focus();
            }
        }, 800);
    }
}

/* ========================================================================
   CROSS-MODAL NAVIGATION FUNCTIONS
   Functions to open modals from within other modals
   ======================================================================== */
function openWebDevModal() {
    // Close current modal first
    const oCurrentModals = document.querySelectorAll('.modal.show');
    oCurrentModals.forEach(function(oModal) {
        const oModalInstance = bootstrap.Modal.getInstance(oModal);
        if (oModalInstance) {
            oModalInstance.hide();
        }
    });
    
    // Open Web Dev modal after a brief delay
    setTimeout(function() {
        const oModal = new bootstrap.Modal(document.getElementById('webDevModal'));
        oModal.show();
    }, 300);
}

function openAIModal() {
    // Close current modal first
    const oCurrentModals = document.querySelectorAll('.modal.show');
    oCurrentModals.forEach(function(oModal) {
        const oModalInstance = bootstrap.Modal.getInstance(oModal);
        if (oModalInstance) {
            oModalInstance.hide();
        }
    });
    
    // Open AI modal after a brief delay
    setTimeout(function() {
        const oModal = new bootstrap.Modal(document.getElementById('aiModal'));
        oModal.show();
    }, 300);
}

function openVibecodingModal() {
    // Close current modal first
    const oCurrentModals = document.querySelectorAll('.modal.show');
    oCurrentModals.forEach(function(oModal) {
        const oModalInstance = bootstrap.Modal.getInstance(oModal);
        if (oModalInstance) {
            oModalInstance.hide();
        }
    });
    
    // Open VibeCoding modal after a brief delay
    setTimeout(function() {
        const oModal = new bootstrap.Modal(document.getElementById('vibecodingModal'));
        oModal.show();
    }, 300);
}

/* ========================================================================
   FALLBACK FUNCTIONALITY
   Basic form handling if advanced features fail
   ======================================================================== */
function initializeBasicForm() {
    console.log('Initializing basic form functionality');
    
    if (oFormElement) {
        oFormElement.addEventListener('submit', function(oEvent) {
            oEvent.preventDefault();
            
            const sEmail = document.getElementById('sEmailInput').value.trim();
            
            if (sEmail && isValidEmailAddress(sEmail)) {
                alert('Mulțumim! Ghidul va fi trimis la adresa de email introdusă.');
                this.reset();
            } else {
                alert('Te rugăm să completezi corect toate câmpurile.');
            }
        });
    }
}

/* ========================================================================
   ERROR HANDLING
   Global error handling for smoother user experience
   ======================================================================== */
window.addEventListener('error', function(oEvent) {
    console.warn('JavaScript error caught:', oEvent.error);
    
    // If there's a critical error, ensure basic form still works
    if (!bIsFormSubmitted && oFormElement) {
        initializeBasicForm();
    }
});

/* ========================================================================
   PERFORMANCE OPTIMIZATION
   Optimize animations and interactions for better performance
   ======================================================================== */

// Debounce utility function
function debounce(fnFunction, nDelay) {
    let nTimeoutId;
    return function(...aArgs) {
        clearTimeout(nTimeoutId);
        nTimeoutId = setTimeout(() => fnFunction.apply(this, aArgs), nDelay);
    };
}

// Throttle utility function
function throttle(fnFunction, nDelay) {
    let bThrottled = false;
    return function(...aArgs) {
        if (!bThrottled) {
            fnFunction.apply(this, aArgs);
            bThrottled = true;
            setTimeout(() => bThrottled = false, nDelay);
        }
    };
}

// Optimize scroll events
const handleOptimizedScroll = throttle(function() {
    // Handle scroll-based optimizations here
}, 16); // ~60fps

window.addEventListener('scroll', handleOptimizedScroll, { passive: true });

/* ========================================================================
   EXPORT FOR TESTING
   Export functions for testing purposes if needed
   ======================================================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmailAddress,
        validateField,
        resetForm,
        handleFormSubmission
    };
} 