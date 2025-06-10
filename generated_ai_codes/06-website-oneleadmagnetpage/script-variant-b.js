/**
 * VibeCoding Challenge - Variant B Interactive JavaScript
 * Gamified landing page with drag-and-drop coding challenge
 */

// ==============================================
// GAME STATE & CONFIGURATION
// ==============================================

const gameState = {
    timer: 120, // 2 minutes in seconds
    timerInterval: null,
    progress: 0,
    correctAnswers: 0,
    totalAnswers: 6,
    gameCompleted: false,
    gameStarted: false
};

const correctSolutions = {
    'dropZone1': 'title',
    'dropZone2': 'title', 
    'dropZone3': 'body',
    'dropZone4': 'h1',
    'dropZone5': 'h1',
    'dropZone6': 'body'
};

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    initializeDragAndDrop();
    initializeFormHandling();
    startGameAnimations();
});

function initializeGame() {
    console.log('🎮 VibeCoding Challenge initialized!');
    
    // Start timer
    startTimer();
    
    // Initialize progress
    updateProgress(0);
    
    // Add event listeners
    document.getElementById('checkSolutionBtn').addEventListener('click', checkSolution);
    
    // Animate initial elements
    gsap.from('.game-header', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'bounce.out'
    });
    
    gsap.from('.coding-challenge', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gameState.gameStarted = true;
}

// ==============================================
// TIMER FUNCTIONALITY
// ==============================================

function startTimer() {
    const timerElement = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        
        const minutes = Math.floor(gameState.timer / 60);
        const seconds = gameState.timer % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Visual warnings
        if (gameState.timer <= 30 && gameState.timer > 10) {
            timerContainer.classList.add('timer-warning');
        } else if (gameState.timer <= 10) {
            timerContainer.classList.remove('timer-warning');
            timerContainer.classList.add('timer-danger');
        }
        
        // Time's up
        if (gameState.timer <= 0) {
            clearInterval(gameState.timerInterval);
            showTimeUpModal();
        }
    }, 1000);
}

function showTimeUpModal() {
    // Create time's up overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-content">
            <div class="success-animation">
                <i class="bi bi-clock-fill" style="font-size: 5rem; color: #dc3545; margin-bottom: 1rem;"></i>
                <h2 style="color: #dc3545;">⏰ Timpul a expirat!</h2>
                <p>Dar nu-ți face griji! Poți accesa oricum workshop-ul gratuit...</p>
                <button class="btn btn-primary btn-lg mt-3" onclick="revealLandingPage()">
                    <i class="bi bi-arrow-right me-2"></i>
                    Continuă la workshop
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Animate overlay
    gsap.from(overlay, {
        duration: 0.5,
        opacity: 0,
        scale: 0.8
    });
}

// ==============================================
// DRAG AND DROP FUNCTIONALITY
// ==============================================

function initializeDragAndDrop() {
    const draggableElements = document.querySelectorAll('.draggable-element');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Initialize draggable elements
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    });
    
    // Initialize drop zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('click', handleDropZoneClick);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
    
    // Add dragging animation
    gsap.to(e.target, {
        duration: 0.2,
        scale: 1.1,
        rotation: 5
    });
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    
    // Reset dragging animation
    gsap.to(e.target, {
        duration: 0.2,
        scale: 1,
        rotation: 0
    });
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
    
    // Animate drop zone
    gsap.to(e.target, {
        duration: 0.2,
        scale: 1.05
    });
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
    
    // Reset drop zone animation
    gsap.to(e.target, {
        duration: 0.2,
        scale: 1
    });
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    if (draggedElement && !e.target.classList.contains('filled')) {
        const dropZoneId = e.target.id;
        const elementType = draggedElement.dataset.element;
        
        // Fill the drop zone
        e.target.textContent = elementType;
        e.target.classList.add('filled');
        e.target.dataset.filled = elementType;
        
        // Mark draggable element as used
        draggedElement.classList.add('used');
        draggedElement.draggable = false;
        
        // Animate successful drop
        gsap.from(e.target, {
            duration: 0.5,
            scale: 0.8,
            ease: 'bounce.out'
        });
        
        // Check if solution is correct
        if (correctSolutions[dropZoneId] === elementType) {
            gameState.correctAnswers++;
            e.target.style.borderColor = '#28a745';
            e.target.style.color = '#28a745';
            
            // Success animation
            gsap.to(e.target, {
                duration: 0.3,
                boxShadow: '0 0 20px rgba(40, 167, 69, 0.5)',
                repeat: 1,
                yoyo: true
            });
        } else {
            e.target.style.borderColor = '#dc3545';
            e.target.style.color = '#dc3545';
            
            // Error shake animation
            gsap.to(e.target, {
                duration: 0.1,
                x: -5,
                repeat: 5,
                yoyo: true,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(e.target, { x: 0 });
                }
            });
        }
        
        // Update progress
        updateProgress();
        
        // Check if all zones are filled
        const filledZones = document.querySelectorAll('.drop-zone.filled').length;
        if (filledZones === gameState.totalAnswers) {
            document.getElementById('checkSolutionBtn').disabled = false;
            
            // Animate check button
            gsap.to('#checkSolutionBtn', {
                duration: 0.5,
                scale: 1.1,
                ease: 'bounce.out'
            });
        }
    }
    
    // Reset drop zone animation
    gsap.to(e.target, {
        duration: 0.2,
        scale: 1
    });
}

function handleDropZoneClick(e) {
    if (e.target.classList.contains('filled')) {
        // Allow removing elements by clicking
        const elementType = e.target.dataset.filled;
        const draggableElement = document.querySelector(`[data-element="${elementType}"].used`);
        
        if (draggableElement) {
            // Reset draggable element
            draggableElement.classList.remove('used');
            draggableElement.draggable = true;
            
            // Reset drop zone
            e.target.textContent = '____';
            e.target.classList.remove('filled');
            e.target.removeAttribute('data-filled');
            e.target.style.borderColor = '#FFD700';
            e.target.style.color = '#FFD700';
            
            // Update progress
            const filledZones = document.querySelectorAll('.drop-zone.filled').length;
            if (filledZones < gameState.totalAnswers) {
                document.getElementById('checkSolutionBtn').disabled = true;
                
                gsap.to('#checkSolutionBtn', {
                    duration: 0.3,
                    scale: 1
                });
            }
            
            updateProgress();
        }
    }
}

// ==============================================
// PROGRESS TRACKING
// ==============================================

function updateProgress() {
    const filledZones = document.querySelectorAll('.drop-zone.filled').length;
    const progressPercentage = (filledZones / gameState.totalAnswers) * 100;
    
    const progressBar = document.getElementById('gameProgressBar');
    gsap.to(progressBar, {
        duration: 0.5,
        width: `${progressPercentage}%`,
        ease: 'power2.out'
    });
    
    gameState.progress = progressPercentage;
}

// ==============================================
// SOLUTION CHECKING
// ==============================================

function checkSolution() {
    const allCorrect = gameState.correctAnswers === gameState.totalAnswers;
    
    if (allCorrect) {
        gameCompleted();
    } else {
        showIncorrectSolution();
    }
}

function showIncorrectSolution() {
    // Show hint modal
    const incorrectCount = gameState.totalAnswers - gameState.correctAnswers;
    
    const hintModal = document.createElement('div');
    hintModal.className = 'success-overlay';
    hintModal.innerHTML = `
        <div class="success-content">
            <div class="success-animation">
                <i class="bi bi-exclamation-triangle-fill" style="font-size: 4rem; color: #ffc107; margin-bottom: 1rem;"></i>
                <h2 style="color: #ffc107;">🤔 Aproape acolo!</h2>
                <p>Ai ${incorrectCount} element${incorrectCount > 1 ? 'e' : ''} incorect${incorrectCount > 1 ? 'e' : ''}. Încearcă din nou!</p>
                <div style="margin: 1rem 0; color: #E6C200;">
                    <strong>💡 Hint:</strong> Gândește-te la structura de bază a unei pagini HTML:
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>• &lt;title&gt; aparține în &lt;head&gt;</li>
                        <li>• &lt;h1&gt; aparține în &lt;body&gt;</li>
                        <li>• &lt;body&gt; conține conținutul vizibil</li>
                    </ul>
                </div>
                <button class="btn btn-primary btn-lg mt-3" onclick="closeHintModal()">
                    <i class="bi bi-arrow-left me-2"></i>
                    Încearcă din nou
                </button>
            </div>
        </div>
    `;
    
    hintModal.id = 'hintModal';
    document.body.appendChild(hintModal);
    
    // Animate hint modal
    gsap.from(hintModal, {
        duration: 0.5,
        opacity: 0,
        scale: 0.8
    });
}

function closeHintModal() {
    const hintModal = document.getElementById('hintModal');
    if (hintModal) {
        gsap.to(hintModal, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            onComplete: () => {
                hintModal.remove();
            }
        });
    }
}

// ==============================================
// GAME COMPLETION
// ==============================================

function gameCompleted() {
    gameState.gameCompleted = true;
    clearInterval(gameState.timerInterval);
    
    // Show success overlay with confetti
    const successOverlay = document.getElementById('successOverlay');
    successOverlay.classList.remove('d-none');
    
    // Start confetti animation
    startConfetti();
    
    // Animate success overlay
    gsap.from(successOverlay, {
        duration: 0.8,
        opacity: 0,
        scale: 0.8,
        ease: 'bounce.out'
    });
    
    // Auto-transition to landing page after 3 seconds
    setTimeout(() => {
        revealLandingPage();
    }, 3000);
}

function revealLandingPage() {
    const gameSection = document.getElementById('gameSection');
    const successOverlay = document.getElementById('successOverlay');
    const mainLandingPage = document.getElementById('mainLandingPage');
    
    // Hide game and overlay
    gsap.to([gameSection, successOverlay], {
        duration: 0.8,
        opacity: 0,
        y: -50,
        onComplete: () => {
            gameSection.style.display = 'none';
            successOverlay.classList.add('d-none');
            mainLandingPage.classList.remove('d-none');
            
            // Animate landing page entry
            gsap.from(mainLandingPage, {
                duration: 1,
                opacity: 0,
                y: 30,
                ease: 'power2.out'
            });
            
            // Animate individual elements
            gsap.from('.completion-badge', {
                duration: 0.8,
                scale: 0,
                delay: 0.3,
                ease: 'bounce.out'
            });
            
            gsap.from('.winner-form', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.5,
                ease: 'power2.out'
            });
            
            // Focus on email input
            setTimeout(() => {
                document.getElementById('sWinnerEmailInput').focus();
            }, 1000);
        }
    });
}

// ==============================================
// CONFETTI ANIMATION
// ==============================================

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF', '#FF1493'];
    
    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.rotation += particle.rotationSpeed;
            
            // Draw particle
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            ctx.restore();
            
            // Remove particles that are off screen
            if (particle.y > canvas.height + 10) {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

// ==============================================
// FORM HANDLING
// ==============================================

function initializeFormHandling() {
    const winnerForm = document.getElementById('winnerEmailForm');
    if (winnerForm) {
        winnerForm.addEventListener('submit', handleWinnerFormSubmit);
    }
    
    // Add real-time email validation
    const emailInput = document.getElementById('sWinnerEmailInput');
    if (emailInput) {
        emailInput.addEventListener('input', validateWinnerEmail);
    }
}

function validateWinnerEmail() {
    const emailInput = document.getElementById('sWinnerEmailInput');
    const submitButton = document.getElementById('sWinnerSubmitButton');
    
    if (emailInput.value && emailInput.checkValidity()) {
        submitButton.disabled = false;
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    } else {
        submitButton.disabled = true;
        emailInput.classList.remove('is-valid');
        if (emailInput.value) {
            emailInput.classList.add('is-invalid');
        }
    }
}

function handleWinnerFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (!email || !email.includes('@')) {
        showFormError('Te rugăm să introduci o adresă de email validă');
        return;
    }
    
    // Show loading state
    const submitButton = document.getElementById('sWinnerSubmitButton');
    const ctaText = submitButton.querySelector('.sCTAText');
    const ctaLoader = submitButton.querySelector('.sCTALoader');
    
    ctaText.classList.add('d-none');
    ctaLoader.classList.remove('d-none');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showWinnerSuccess();
        
        // Track conversion (replace with actual analytics)
        console.log('🎯 Winner conversion tracked:', email);
        
        // Optional: Send to actual backend
        // submitToBackend(email);
        
    }, 2000);
}

function showWinnerSuccess() {
    const winnerForm = document.querySelector('.winner-form');
    const successMessage = document.getElementById('sWinnerSuccessMessage');
    
    // Hide form and show success
    gsap.to(winnerForm, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        onComplete: () => {
            winnerForm.classList.add('d-none');
            successMessage.classList.remove('d-none');
            
            // Animate success message
            gsap.from(successMessage, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: 'bounce.out'
            });
            
            // Trigger celebration animation
            celebrateWinner();
        }
    });
}

function celebrateWinner() {
    // Create floating celebration elements
    const celebrationElements = ['🎉', '🎊', '🏆', '🎯', '🚀', '⭐'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.textContent = celebrationElements[Math.floor(Math.random() * celebrationElements.length)];
            element.style.position = 'fixed';
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = '-50px';
            element.style.fontSize = '2rem';
            element.style.zIndex = '10000';
            element.style.pointerEvents = 'none';
            document.body.appendChild(element);
            
            gsap.to(element, {
                duration: 3,
                y: window.innerHeight + 100,
                x: (Math.random() - 0.5) * 200,
                rotation: 360,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    element.remove();
                }
            });
        }, i * 100);
    }
}

function resetWinnerForm() {
    const winnerForm = document.querySelector('.winner-form');
    const successMessage = document.getElementById('sWinnerSuccessMessage');
    const form = document.getElementById('winnerEmailForm');
    
    // Reset form
    form.reset();
    
    // Reset button state
    const submitButton = document.getElementById('sWinnerSubmitButton');
    const ctaText = submitButton.querySelector('.sCTAText');
    const ctaLoader = submitButton.querySelector('.sCTALoader');
    
    ctaText.classList.remove('d-none');
    ctaLoader.classList.add('d-none');
    submitButton.disabled = true;
    
    // Show form and hide success
    successMessage.classList.add('d-none');
    winnerForm.classList.remove('d-none');
    
    gsap.from(winnerForm, {
        duration: 0.5,
        opacity: 0,
        y: 20
    });
}

function showFormError(message) {
    // Create error toast
    const errorToast = document.createElement('div');
    errorToast.className = 'alert alert-danger position-fixed';
    errorToast.style.top = '20px';
    errorToast.style.right = '20px';
    errorToast.style.zIndex = '10001';
    errorToast.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(errorToast);
    
    // Animate toast
    gsap.from(errorToast, {
        duration: 0.5,
        x: 300,
        opacity: 0
    });
    
    // Auto-remove toast
    setTimeout(() => {
        gsap.to(errorToast, {
            duration: 0.5,
            x: 300,
            opacity: 0,
            onComplete: () => {
                errorToast.remove();
            }
        });
    }, 3000);
}

// ==============================================
// ANIMATION HELPERS
// ==============================================

function startGameAnimations() {
    // Floating elements animation
    gsap.to('.game-shape1', {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.game-shape2', {
        duration: 25,
        rotation: -360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.game-shape3', {
        duration: 15,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    // Logo glow effect is handled in CSS
    
    // Draggable elements hover effect
    const draggableElements = document.querySelectorAll('.draggable-element');
    draggableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('used')) {
                gsap.to(element, {
                    duration: 0.3,
                    scale: 1.05,
                    y: -5,
                    ease: 'power2.out'
                });
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('used')) {
                gsap.to(element, {
                    duration: 0.3,
                    scale: 1,
                    y: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Prevent accidental page refresh during game
window.addEventListener('beforeunload', (e) => {
    if (gameState.gameStarted && !gameState.gameCompleted) {
        e.preventDefault();
        e.returnValue = 'Ești sigur că vrei să părăsești jocul? Progresul tău va fi pierdut.';
    }
});

// Global functions for onclick handlers
window.revealLandingPage = revealLandingPage;
window.closeHintModal = closeHintModal;
window.resetWinnerForm = resetWinnerForm;

console.log('🚀 VibeCoding Challenge - Variant B loaded successfully!'); 