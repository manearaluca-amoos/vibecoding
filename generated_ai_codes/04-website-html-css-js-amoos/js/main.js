// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add glow effect to cards when they come into view
            if (entry.target.classList.contains('glow-card')) {
                entry.target.style.boxShadow = '0 0 30px var(--color-glow)';
                setTimeout(() => {
                    entry.target.style.boxShadow = '';
                }, 1000);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));

    // Add typing effect to code blocks
    typeCode();
    
    // Initialize pricing toggle
    initPricingToggle();
});

// Typing effect for code blocks
function typeCode() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    codeBlocks.forEach(block => {
        const text = block.textContent;
        block.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                block.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            } else {
                // Show Copilot suggestion after code is typed
                const suggestion = block.closest('.editor-content').querySelector('.copilot-suggestion');
                if (suggestion) {
                    suggestion.style.opacity = '0';
                    suggestion.style.display = 'block';
                    setTimeout(() => {
                        suggestion.style.opacity = '1';
                    }, 100);
                }
            }
        }
        
        setTimeout(typeWriter, 1000);
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleSpans = document.querySelectorAll('.pricing-toggle span');
    toggleSpans.forEach(span => {
        span.addEventListener('click', () => {
            toggleSpans.forEach(s => s.classList.remove('active'));
            span.classList.add('active');
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add glow effect to buttons on hover
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 0 20px var(--color-glow)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.style.boxShadow = '';
    });
});

// Code editor window controls animation
document.querySelectorAll('.window-controls .control').forEach(control => {
    control.addEventListener('click', () => {
        control.style.transform = 'scale(0.9)';
        setTimeout(() => {
            control.style.transform = '';
        }, 100);
    });
});

// Add floating animation to the editor window
const editorWindow = document.querySelector('.editor-window');
if (editorWindow) {
    let float = 0;
    function floatAnimation() {
        float += 0.02;
        editorWindow.style.transform = `translateY(${Math.sin(float) * 5}px)`;
        requestAnimationFrame(floatAnimation);
    }
    floatAnimation();
}

// Initialize glowing text effect
const glowText = document.querySelector('.glow-text');
if (glowText) {
    let glowIntensity = 0;
    function pulseGlow() {
        glowIntensity += 0.02;
        const glow = Math.sin(glowIntensity) * 10 + 10;
        glowText.style.textShadow = `0 0 ${glow}px var(--color-glow)`;
        requestAnimationFrame(pulseGlow);
    }
    pulseGlow();
} 