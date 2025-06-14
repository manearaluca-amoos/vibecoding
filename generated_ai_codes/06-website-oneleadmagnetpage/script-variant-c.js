/**
 * VibeCoding Website Builder - Variant C Interactive JavaScript
 * Visual website builder with drag-and-drop HTML elements and live preview
 */

// ==============================================
// BUILDER STATE & CONFIGURATION
// ==============================================

const builderState = {
    timer: 180, // 3 minutes in seconds
    timerInterval: null,
    elementsUsed: 0,
    minElementsRequired: 5,
    droppedElements: [],
    builderCompleted: false,
    builderStarted: false
};

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    optimizeForMobile();
    initializeBuilder();
    initializeDragAndDrop();
    initializeFormHandling();
    startBuilderAnimations();
});

function initializeBuilder() {
    console.log('🎨 VibeCoding Website Builder initialized!');
    
    // Start timer
    startTimer();
    
    // Initialize progress
    updateProgress();
    
    // Add event listeners
    document.getElementById('checkWebsiteBtn').addEventListener('click', checkWebsite);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllElements);
    
    // Animate initial elements
    gsap.from('.builder-header', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'bounce.out'
    });
    
    gsap.from('.elements-panel', {
        duration: 1.2,
        x: -50,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.drop-zone-panel', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.from('.preview-panel', {
        duration: 1.2,
        x: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    builderState.builderStarted = true;
}

// ==============================================
// TIMER FUNCTIONALITY
// ==============================================

function startTimer() {
    const timerElement = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');
    
    builderState.timerInterval = setInterval(() => {
        builderState.timer--;
        
        const minutes = Math.floor(builderState.timer / 60);
        const seconds = builderState.timer % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Visual warnings
        if (builderState.timer <= 60 && builderState.timer > 30) {
            timerContainer.classList.add('timer-warning');
        } else if (builderState.timer <= 30) {
            timerContainer.classList.remove('timer-warning');
            timerContainer.classList.add('timer-danger');
        }
        
        // Time's up
        if (builderState.timer <= 0) {
            clearInterval(builderState.timerInterval);
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
                <i class="bi bi-clock-fill" style="font-size: 5rem; color: #ffc107; margin-bottom: 1rem;"></i>
                <h2 style="color: #ffc107;">⏰ Timpul s-a terminat!</h2>
                <p>Dar nu-ți face griji! Poți accesa oricum workshop-ul gratuit...</p>
                <div style="margin: 1rem 0;">
                    <strong>Ai construit ${builderState.elementsUsed} elemente din ${builderState.minElementsRequired} necesare!</strong>
                </div>
                <button class="btn btn-primary btn-lg mt-3" onclick="revealBuilderLandingPage()">
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
// DRAG AND DROP FUNCTIONALITY (Desktop + Mobile)
// ==============================================

function initializeDragAndDrop() {
    const draggableElements = document.querySelectorAll('.draggable-html-element');
    const dropZone = document.getElementById('webpageDropZone');
    
    // Initialize draggable elements for both desktop and mobile
    draggableElements.forEach(element => {
        // Desktop drag events
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
        
        // Mobile touch events
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    // Initialize drop zone for desktop
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
}

let draggedElement = null;
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;
let isTouchDragging = false;
let touchClone = null;

// ==============================================
// DESKTOP DRAG HANDLERS (Existing)
// ==============================================

function handleDragStart(e) {
    draggedElement = e.target.closest('.draggable-html-element');
    e.target.style.opacity = '0.5';
    
    // Add dragging animation
    gsap.to(draggedElement, {
        duration: 0.2,
        scale: 1.05,
        rotation: 2
    });
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    
    // Reset dragging animation
    gsap.to(draggedElement, {
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
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    // Only remove drag-over if we're actually leaving the drop zone
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (draggedElement && !draggedElement.classList.contains('used')) {
        const elementType = draggedElement.dataset.element;
        const elementHTML = draggedElement.dataset.html;
        
        // Add element to drop zone
        addElementToDropZone(elementType, elementHTML);
        
        // Mark draggable element as used
        draggedElement.classList.add('used');
        draggedElement.draggable = false;
        
        // Update progress
        builderState.elementsUsed++;
        updateProgress();
        
        // Update live preview
        updateLivePreview();
        
        // Hide placeholder if this is the first element
        if (builderState.elementsUsed === 1) {
            hideDropZonePlaceholder();
        }
        
        // Enable check button if minimum elements reached
        if (builderState.elementsUsed >= builderState.minElementsRequired) {
            document.getElementById('checkWebsiteBtn').disabled = false;
            
            // Animate check button
            gsap.to('#checkWebsiteBtn', {
                duration: 0.5,
                scale: 1.1,
                ease: 'bounce.out'
            });
        }
        
        // Success animation for draggable element
        gsap.to(draggedElement, {
            duration: 0.3,
            backgroundColor: 'rgba(40, 167, 69, 0.3)',
            borderColor: 'rgba(40, 167, 69, 0.6)',
            yoyo: true,
            repeat: 1
        });
    }
}

// ==============================================
// MOBILE TOUCH HANDLERS (New)
// ==============================================

function handleTouchStart(e) {
    if (e.target.closest('.draggable-html-element').classList.contains('used')) {
        return;
    }
    
    draggedElement = e.target.closest('.draggable-html-element');
    const touch = e.touches[0];
    
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchCurrentX = touch.clientX;
    touchCurrentY = touch.clientY;
    
    // Prevent scrolling while dragging
    e.preventDefault();
    
    // Trigger haptic feedback
    triggerHapticFeedback('light');
    
    // Add touch feedback
    gsap.to(draggedElement, {
        duration: 0.1,
        scale: 0.95,
        ease: 'power2.out'
    });
    
    // Show mobile drag hint
    showMobileDragHint();
}

function handleTouchMove(e) {
    if (!draggedElement || draggedElement.classList.contains('used')) {
        return;
    }
    
    const touch = e.touches[0];
    touchCurrentX = touch.clientX;
    touchCurrentY = touch.clientY;
    
    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;
    
    // Start dragging if moved more than 10px
    if (!isTouchDragging && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
        startTouchDrag(e);
    }
    
    if (isTouchDragging) {
        e.preventDefault();
        
        // Update clone position
        if (touchClone) {
            touchClone.style.left = touchCurrentX - 50 + 'px';
            touchClone.style.top = touchCurrentY - 30 + 'px';
        }
        
        // Check if over drop zone
        const elementBelow = document.elementFromPoint(touchCurrentX, touchCurrentY);
        const dropZone = document.getElementById('webpageDropZone');
        
        if (dropZone.contains(elementBelow)) {
            dropZone.classList.add('drag-over');
        } else {
            dropZone.classList.remove('drag-over');
        }
    }
}

function handleTouchEnd(e) {
    if (!draggedElement) {
        return;
    }
    
    hideMobileDragHint();
    
    if (isTouchDragging) {
        // Check if dropped on drop zone
        const elementBelow = document.elementFromPoint(touchCurrentX, touchCurrentY);
        const dropZone = document.getElementById('webpageDropZone');
        
        if (dropZone.contains(elementBelow) && !draggedElement.classList.contains('used')) {
            // Successfully dropped
            const elementType = draggedElement.dataset.element;
            const elementHTML = draggedElement.dataset.html;
            
            // Add element to drop zone
            addElementToDropZone(elementType, elementHTML);
            
            // Mark draggable element as used
            draggedElement.classList.add('used');
            draggedElement.draggable = false;
            
            // Update progress
            builderState.elementsUsed++;
            updateProgress();
            
            // Update live preview
            updateLivePreview();
            
            // Hide placeholder if this is the first element
            if (builderState.elementsUsed === 1) {
                hideDropZonePlaceholder();
            }
            
            // Enable check button if minimum elements reached
            if (builderState.elementsUsed >= builderState.minElementsRequired) {
                document.getElementById('checkWebsiteBtn').disabled = false;
                
                // Animate check button
                gsap.to('#checkWebsiteBtn', {
                    duration: 0.5,
                    scale: 1.1,
                    ease: 'bounce.out'
                });
            }
            
            // Success animation
            gsap.to(draggedElement, {
                duration: 0.3,
                backgroundColor: 'rgba(40, 167, 69, 0.3)',
                borderColor: 'rgba(40, 167, 69, 0.6)',
                yoyo: true,
                repeat: 1
            });
            
            // Show success feedback
            showMobileDragSuccess();
        }
        
        endTouchDrag();
    } else {
        // Reset scale if just tapped
        gsap.to(draggedElement, {
            duration: 0.2,
            scale: 1,
            ease: 'power2.out'
        });
    }
    
    // Clean up
    dropZone.classList.remove('drag-over');
    draggedElement = null;
    isTouchDragging = false;
}

function startTouchDrag(e) {
    isTouchDragging = true;
    
    // Trigger medium haptic feedback when drag starts
    triggerHapticFeedback('medium');
    
    // Create visual clone for dragging
    touchClone = draggedElement.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '10000';
    touchClone.style.width = isMobileDevice() ? '180px' : '200px';
    touchClone.style.height = 'auto';
    touchClone.style.transform = 'rotate(5deg)';
    touchClone.style.opacity = '0.9';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.left = touchCurrentX - 50 + 'px';
    touchClone.style.top = touchCurrentY - 30 + 'px';
    
    document.body.appendChild(touchClone);
    
    // Fade original element
    gsap.to(draggedElement, {
        duration: 0.2,
        opacity: 0.3,
        scale: 0.9
    });
    
    // Animate clone appearance
    gsap.from(touchClone, {
        duration: 0.3,
        scale: 0.8,
        ease: 'bounce.out'
    });
}

function endTouchDrag() {
    // Remove clone
    if (touchClone) {
        gsap.to(touchClone, {
            duration: 0.3,
            scale: 0.8,
            opacity: 0,
            onComplete: () => {
                if (touchClone && touchClone.parentNode) {
                    touchClone.parentNode.removeChild(touchClone);
                }
                touchClone = null;
            }
        });
    }
    
    // Reset original element
    gsap.to(draggedElement, {
        duration: 0.3,
        opacity: 1,
        scale: 1,
        ease: 'power2.out'
    });
}

// ==============================================
// MOBILE UI HELPERS
// ==============================================

function showMobileDragHint() {
    // Show hint only on first drag attempt
    if (!localStorage.getItem('vibecoding_mobile_hint_shown')) {
        const hint = document.createElement('div');
        hint.id = 'mobileDragHint';
        hint.className = 'mobile-drag-hint';
        hint.innerHTML = `
            <div class="hint-content">
                <i class="bi bi-hand-index-thumb"></i>
                <span>Ține apăsat și trage în zona de construcție</span>
            </div>
        `;
        
        document.body.appendChild(hint);
        
        gsap.from(hint, {
            duration: 0.5,
            y: 50,
            opacity: 0,
            ease: 'bounce.out'
        });
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            hideMobileDragHint();
            localStorage.setItem('vibecoding_mobile_hint_shown', 'true');
        }, 3000);
    }
}

function hideMobileDragHint() {
    const hint = document.getElementById('mobileDragHint');
    if (hint) {
        gsap.to(hint, {
            duration: 0.3,
            y: 50,
            opacity: 0,
            onComplete: () => {
                hint.remove();
            }
        });
    }
}

function showMobileDragSuccess() {
    // Trigger success haptic feedback
    triggerHapticFeedback('success');
    
    const success = document.createElement('div');
    success.className = 'mobile-drag-success';
    success.innerHTML = `
        <div class="success-content">
            <i class="bi bi-check-circle-fill"></i>
            <span>Element adăugat!</span>
        </div>
    `;
    
    document.body.appendChild(success);
    
    gsap.from(success, {
        duration: 0.4,
        scale: 0,
        ease: 'bounce.out'
    });
    
    // Auto-remove
    setTimeout(() => {
        gsap.to(success, {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            onComplete: () => {
                success.remove();
            }
        });
    }, 1500);
}

// ==============================================
// LIVE PREVIEW FUNCTIONALITY
// ==============================================

function updateLivePreview() {
    const previewContainer = document.getElementById('websitePreview');
    
    if (builderState.droppedElements.length === 0) {
        // Show empty state
        previewContainer.innerHTML = `
            <div class="preview-placeholder">
                <div class="placeholder-browser">
                    <div class="browser-bar">
                        <div class="browser-buttons">
                            <span class="browser-btn red"></span>
                            <span class="browser-btn yellow"></span>
                            <span class="browser-btn green"></span>
                        </div>
                        <div class="browser-url">mypagesite.ro</div>
                    </div>
                    <div class="browser-content">
                        <div class="empty-page">
                            <div class="empty-icon">🌐</div>
                            <p>Pagina ta va apărea aici...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Generate live preview HTML
        let previewHTML = '';
        builderState.droppedElements.forEach(element => {
            previewHTML += element.html;
        });
        
        // Update preview with actual content
        previewContainer.innerHTML = `
            <div class="preview-placeholder">
                <div class="placeholder-browser">
                    <div class="browser-bar">
                        <div class="browser-buttons">
                            <span class="browser-btn red"></span>
                            <span class="browser-btn yellow"></span>
                            <span class="browser-btn green"></span>
                        </div>
                        <div class="browser-url">mypagesite.ro</div>
                    </div>
                    <div class="browser-content">
                        <div class="live-preview-content">
                            ${previewHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Animate preview update
    gsap.from(previewContainer, {
        duration: 0.3,
        scale: 0.98,
        ease: 'power2.out'
    });
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function hideDropZonePlaceholder() {
    const placeholder = document.querySelector('.drop-zone-placeholder');
    if (placeholder) {
        gsap.to(placeholder, {
            duration: 0.3,
            opacity: 0,
            scale: 0.9,
            onComplete: () => {
                placeholder.style.display = 'none';
            }
        });
    }
}

function showDropZonePlaceholder() {
    const dropZone = document.getElementById('webpageDropZone');
    const placeholder = document.querySelector('.drop-zone-placeholder');
    
    if (!placeholder) {
        const newPlaceholder = document.createElement('div');
        newPlaceholder.className = 'drop-zone-placeholder';
        newPlaceholder.innerHTML = `
            <div class="placeholder-icon">🎯</div>
            <div class="placeholder-text">
                <h5>Începe să construiești!</h5>
                <p>Trage elementele din stânga aici pentru a-ți crea pagina web</p>
            </div>
        `;
        dropZone.appendChild(newPlaceholder);
        
        gsap.from(newPlaceholder, {
            duration: 0.3,
            opacity: 0,
            scale: 0.9
        });
    } else {
        placeholder.style.display = 'flex';
        gsap.to(placeholder, {
            duration: 0.3,
            opacity: 1,
            scale: 1
        });
    }
}

function updateProgress() {
    const progressPercentage = (builderState.elementsUsed / builderState.minElementsRequired) * 100;
    const clampedProgress = Math.min(progressPercentage, 100);
    
    const progressBar = document.getElementById('builderProgressBar');
    const elementsUsedSpan = document.getElementById('elementsUsed');
    
    gsap.to(progressBar, {
        duration: 0.5,
        width: `${clampedProgress}%`,
        ease: 'power2.out'
    });
    
    elementsUsedSpan.textContent = builderState.elementsUsed;
}

function getElementDisplayName(elementType) {
    const displayNames = {
        'header': 'Titlu Principal',
        'paragraph': 'Paragraf Text',
        'button': 'Buton Acțiune',
        'image': 'Imagine',
        'list': 'Listă Beneficii',
        'contact': 'Secțiune Contact'
    };
    return displayNames[elementType] || elementType;
}

function getElementDescription(elementType) {
    const descriptions = {
        'header': 'Un titlu mare și atrăgător',
        'paragraph': 'Text descriptiv și informativ',
        'button': 'Un buton pentru call-to-action',
        'image': 'O imagine reprezentativă',
        'list': 'O listă cu puncte importante',
        'contact': 'Info de contact și social media'
    };
    return descriptions[elementType] || 'Element HTML';
}

// ==============================================
// WEBSITE COMPLETION
// ==============================================

function checkWebsite() {
    if (builderState.elementsUsed >= builderState.minElementsRequired) {
        builderCompleted();
    } else {
        showIncompleteWebsiteModal();
    }
}

function showIncompleteWebsiteModal() {
    const remainingElements = builderState.minElementsRequired - builderState.elementsUsed;
    
    const modal = document.createElement('div');
    modal.className = 'success-overlay';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-animation">
                <i class="bi bi-exclamation-triangle-fill" style="font-size: 4rem; color: #ffc107; margin-bottom: 1rem;"></i>
                <h2 style="color: #ffc107;">🤔 Aproape gata!</h2>
                <p>Mai ai nevoie de ${remainingElements} element${remainingElements > 1 ? 'e' : ''} pentru a finaliza website-ul.</p>
                <div style="margin: 1rem 0; color: #E6C200;">
                    <strong>💡 Sfat:</strong> Încearcă să adaugi:
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>• Un titlu principal pentru impact</li>
                        <li>• Text descriptiv pentru informații</li>
                        <li>• Un buton pentru acțiune</li>
                        <li>• O imagine pentru aspect vizual</li>
                        <li>• O listă pentru beneficii clare</li>
                    </ul>
                </div>
                <button class="btn btn-primary btn-lg mt-3" onclick="closeIncompleteModal()">
                    <i class="bi bi-arrow-left me-2"></i>
                    Continuă construirea
                </button>
            </div>
        </div>
    `;
    
    modal.id = 'incompleteModal';
    document.body.appendChild(modal);
    
    // Animate modal
    gsap.from(modal, {
        duration: 0.5,
        opacity: 0,
        scale: 0.8
    });
}

function closeIncompleteModal() {
    const modal = document.getElementById('incompleteModal');
    if (modal) {
        gsap.to(modal, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            onComplete: () => {
                modal.remove();
            }
        });
    }
}

function builderCompleted() {
    builderState.builderCompleted = true;
    clearInterval(builderState.timerInterval);
    
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
        revealBuilderLandingPage();
    }, 3000);
}

function revealBuilderLandingPage() {
    const gameSection = document.getElementById('gameSection');
    const successOverlay = document.getElementById('successOverlay');
    const mainLandingPage = document.getElementById('mainLandingPage');
    
    // Hide builder and overlay
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
                document.getElementById('sBuilderWinnerEmailInput').focus();
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
    const builderWinnerForm = document.getElementById('builderWinnerEmailForm');
    if (builderWinnerForm) {
        builderWinnerForm.addEventListener('submit', handleBuilderWinnerFormSubmit);
    }
    
    // Add real-time email validation
    const emailInput = document.getElementById('sBuilderWinnerEmailInput');
    if (emailInput) {
        emailInput.addEventListener('input', validateBuilderWinnerEmail);
    }
}

function validateBuilderWinnerEmail() {
    const emailInput = document.getElementById('sBuilderWinnerEmailInput');
    const submitButton = document.getElementById('sBuilderWinnerSubmitButton');
    
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

function handleBuilderWinnerFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (!email || !email.includes('@')) {
        showFormError('Te rugăm să introduci o adresă de email validă');
        return;
    }
    
    // Show loading state
    const submitButton = document.getElementById('sBuilderWinnerSubmitButton');
    const ctaText = submitButton.querySelector('.sCTAText');
    const ctaLoader = submitButton.querySelector('.sCTALoader');
    
    ctaText.classList.add('d-none');
    ctaLoader.classList.remove('d-none');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showBuilderWinnerSuccess();
        
        // Track conversion (replace with actual analytics)
        console.log('🎯 Builder winner conversion tracked:', email);
        
        // Optional: Send to actual backend
        // submitToBackend(email);
        
    }, 2000);
}

function showBuilderWinnerSuccess() {
    const winnerForm = document.querySelector('.winner-form');
    const successMessage = document.getElementById('sBuilderWinnerSuccessMessage');
    
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
            celebrateBuilderWinner();
        }
    });
}

function celebrateBuilderWinner() {
    // Create floating celebration elements
    const celebrationElements = ['🎉', '🎊', '🏆', '🎯', '🚀', '⭐', '💻', '🎨'];
    
    for (let i = 0; i < 25; i++) {
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

function resetBuilderWinnerForm() {
    const winnerForm = document.querySelector('.winner-form');
    const successMessage = document.getElementById('sBuilderWinnerSuccessMessage');
    const form = document.getElementById('builderWinnerEmailForm');
    
    // Reset form
    form.reset();
    
    // Reset button state
    const submitButton = document.getElementById('sBuilderWinnerSubmitButton');
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

function startBuilderAnimations() {
    // Floating elements animation
    gsap.to('.builder-shape1', {
        duration: 25,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.builder-shape2', {
        duration: 30,
        rotation: -360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.builder-shape3', {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    // Draggable elements hover effect
    const draggableElements = document.querySelectorAll('.draggable-html-element');
    draggableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('used')) {
                gsap.to(element, {
                    duration: 0.3,
                    scale: 1.02,
                    y: -3,
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

// Prevent accidental page refresh during building
window.addEventListener('beforeunload', (e) => {
    if (builderState.builderStarted && !builderState.builderCompleted && builderState.elementsUsed > 0) {
        e.preventDefault();
        e.returnValue = 'Ești sigur că vrei să părăsești builder-ul? Website-ul tău va fi pierdut.';
    }
});

// Global functions for onclick handlers
window.revealBuilderLandingPage = revealBuilderLandingPage;
window.closeIncompleteModal = closeIncompleteModal;
window.resetBuilderWinnerForm = resetBuilderWinnerForm;

console.log('🚀 VibeCoding Website Builder - Variant C loaded successfully!');

// ==============================================
// ELEMENT MANAGEMENT FUNCTIONS
// ==============================================

function addElementToDropZone(elementType, elementHTML) {
    const dropZone = document.getElementById('webpageDropZone');
    
    // Create dropped element container
    const droppedElement = document.createElement('div');
    droppedElement.className = 'dropped-element';
    droppedElement.dataset.elementType = elementType;
    droppedElement.draggable = true; // Make dropped elements draggable for reordering
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-element';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = () => removeElement(droppedElement, elementType);
    
    // Create reorder handle
    const reorderHandle = document.createElement('div');
    reorderHandle.className = 'reorder-handle';
    reorderHandle.innerHTML = '<i class="bi bi-grip-vertical"></i>';
    reorderHandle.title = 'Trage pentru a reordona';
    
    // Create HTML code display instead of card preview
    const htmlCodeDisplay = document.createElement('div');
    htmlCodeDisplay.className = 'html-code-display';
    
    // Format the HTML for display with proper indentation and line breaks
    const formattedHTML = formatHTMLForDisplay(elementHTML);
    
    htmlCodeDisplay.innerHTML = `
        <div class="code-header">
            <span class="element-type-badge">${getElementDisplayName(elementType)}</span>
        </div>
        <pre class="html-code"><code>${formattedHTML}</code></pre>
    `;
    
    droppedElement.appendChild(removeBtn);
    droppedElement.appendChild(reorderHandle);
    droppedElement.appendChild(htmlCodeDisplay);
    
    // Add drag event listeners for reordering
    droppedElement.addEventListener('dragstart', handleReorderDragStart);
    droppedElement.addEventListener('dragend', handleReorderDragEnd);
    droppedElement.addEventListener('dragover', handleReorderDragOver);
    droppedElement.addEventListener('drop', handleReorderDrop);
    
    // Add to drop zone
    dropZone.appendChild(droppedElement);
    
    // Store in state
    builderState.droppedElements.push({
        type: elementType,
        html: elementHTML,
        element: droppedElement
    });
    
    // Animate addition
    gsap.from(droppedElement, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        ease: 'bounce.out'
    });
}

// ==============================================
// REORDERING FUNCTIONALITY
// ==============================================

let reorderDraggedElement = null;
let reorderDropIndicator = null;

function handleReorderDragStart(e) {
    reorderDraggedElement = e.target.closest('.dropped-element');
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    reorderDraggedElement.style.opacity = '0.5';
    reorderDraggedElement.classList.add('dragging-reorder');
    
    // Create and add drop indicator
    createDropIndicator();
    
    // Trigger haptic feedback
    triggerHapticFeedback('light');
    
    console.log('🔄 Started reordering element:', reorderDraggedElement.dataset.elementType);
}

function handleReorderDragEnd(e) {
    // Reset visual feedback
    e.target.style.opacity = '1';
    e.target.classList.remove('dragging-reorder');
    
    // Remove drop indicator
    removeDropIndicator();
    
    reorderDraggedElement = null;
    
    console.log('🔄 Ended reordering');
}

function handleReorderDragOver(e) {
    if (!reorderDraggedElement) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const targetElement = e.target.closest('.dropped-element');
    if (targetElement && targetElement !== reorderDraggedElement) {
        showDropIndicator(targetElement, e.clientY);
    }
}

function handleReorderDrop(e) {
    if (!reorderDraggedElement) return;
    
    e.preventDefault();
    const targetElement = e.target.closest('.dropped-element');
    
    if (targetElement && targetElement !== reorderDraggedElement) {
        const dropZone = document.getElementById('webpageDropZone');
        const rect = targetElement.getBoundingClientRect();
        const midPoint = rect.top + rect.height / 2;
        
        // Determine if we should insert before or after
        if (e.clientY < midPoint) {
            // Insert before target
            dropZone.insertBefore(reorderDraggedElement, targetElement);
        } else {
            // Insert after target
            dropZone.insertBefore(reorderDraggedElement, targetElement.nextSibling);
        }
        
        // Update the state array to match new order
        updateElementsOrder();
        
        // Update live preview
        updateLivePreview();
        
        // Trigger success haptic feedback
        triggerHapticFeedback('medium');
        
        // Animate the reordered element
        gsap.from(reorderDraggedElement, {
            duration: 0.3,
            scale: 0.95,
            ease: 'bounce.out'
        });
        
        console.log('✅ Reordered elements successfully');
    }
    
    removeDropIndicator();
}

function createDropIndicator() {
    if (!reorderDropIndicator) {
        reorderDropIndicator = document.createElement('div');
        reorderDropIndicator.className = 'reorder-drop-indicator';
        reorderDropIndicator.innerHTML = '<div class="drop-line"></div>';
    }
}

function showDropIndicator(targetElement, mouseY) {
    if (!reorderDropIndicator) return;
    
    const rect = targetElement.getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;
    const dropZone = document.getElementById('webpageDropZone');
    
    // Remove indicator if already present
    if (reorderDropIndicator.parentNode) {
        reorderDropIndicator.parentNode.removeChild(reorderDropIndicator);
    }
    
    if (mouseY < midPoint) {
        // Show indicator before target
        dropZone.insertBefore(reorderDropIndicator, targetElement);
    } else {
        // Show indicator after target
        dropZone.insertBefore(reorderDropIndicator, targetElement.nextSibling);
    }
}

function removeDropIndicator() {
    if (reorderDropIndicator && reorderDropIndicator.parentNode) {
        reorderDropIndicator.parentNode.removeChild(reorderDropIndicator);
    }
}

function updateElementsOrder() {
    const dropZone = document.getElementById('webpageDropZone');
    const droppedElements = Array.from(dropZone.querySelectorAll('.dropped-element'));
    
    // Rebuild the elements array based on current DOM order
    const newElementsArray = [];
    
    droppedElements.forEach(element => {
        const existingElement = builderState.droppedElements.find(
            el => el.element === element
        );
        if (existingElement) {
            newElementsArray.push(existingElement);
        }
    });
    
    // Update the state
    builderState.droppedElements = newElementsArray;
    
    console.log('🔄 Updated elements order:', builderState.droppedElements.map(el => el.type));
}

// ==============================================
// MOBILE OPTIMIZATION HELPERS
// ==============================================

function triggerHapticFeedback(type = 'light') {
    // Trigger haptic feedback on supported devices
    if (navigator.vibrate && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
        switch (type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(25);
                break;
            case 'heavy':
                navigator.vibrate([50, 30, 50]);
                break;
            case 'success':
                navigator.vibrate([100, 50, 100, 50, 200]);
                break;
            default:
                navigator.vibrate(10);
        }
    }
}

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Mobile|Opera Mini/i.test(navigator.userAgent) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0);
}

function optimizeForMobile() {
    if (isMobileDevice()) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Disable context menu on long press
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.draggable-html-element')) {
                e.preventDefault();
            }
        });
        
        // Prevent zoom on double tap
        document.addEventListener('touchend', (e) => {
            if (e.target.closest('.builder-container')) {
                e.preventDefault();
            }
        });
        
        // Optimize scroll behavior
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('.webpage-drop-zone') && isTouchDragging) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

// New function to format HTML for display
function formatHTMLForDisplay(htmlString) {
    // Escape HTML for display
    const escapedHTML = htmlString
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    
    // Add syntax highlighting classes
    return escapedHTML
        .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '$1<span class="html-tag">$2</span>')
        .replace(/(\s)([a-zA-Z-]+)(=)/g, '$1<span class="html-attr">$2</span>$3')
        .replace(/(=)(&quot;[^&]*&quot;)/g, '$1<span class="html-value">$2</span>')
        .replace(/(=)(&#39;[^&]*&#39;)/g, '$1<span class="html-value">$2</span>');
}

function removeElement(droppedElement, elementType) {
    // Remove from DOM
    droppedElement.remove();
    
    // Remove from state
    builderState.droppedElements = builderState.droppedElements.filter(
        el => el.element !== droppedElement
    );
    
    // Re-enable draggable element
    const draggableElement = document.querySelector(`[data-element="${elementType}"]`);
    if (draggableElement) {
        draggableElement.classList.remove('used');
        draggableElement.draggable = true;
    }
    
    // Update progress
    builderState.elementsUsed--;
    updateProgress();
    
    // Update live preview
    updateLivePreview();
    
    // Show placeholder if no elements left
    if (builderState.elementsUsed === 0) {
        showDropZonePlaceholder();
    }
    
    // Disable check button if below minimum
    if (builderState.elementsUsed < builderState.minElementsRequired) {
        document.getElementById('checkWebsiteBtn').disabled = true;
        
        gsap.to('#checkWebsiteBtn', {
            duration: 0.3,
            scale: 1
        });
    }
}

function clearAllElements() {
    // Remove all dropped elements
    const droppedElements = document.querySelectorAll('.dropped-element');
    droppedElements.forEach(element => element.remove());
    
    // Reset state
    builderState.droppedElements = [];
    builderState.elementsUsed = 0;
    
    // Re-enable all draggable elements
    const draggableElements = document.querySelectorAll('.draggable-html-element');
    draggableElements.forEach(element => {
        element.classList.remove('used');
        element.draggable = true;
    });
    
    // Update progress
    updateProgress();
    
    // Update live preview
    updateLivePreview();
    
    // Show placeholder
    showDropZonePlaceholder();
    
    // Disable check button
    document.getElementById('checkWebsiteBtn').disabled = true;
    
    // Animate clear action
    gsap.from('#clearAllBtn', {
        duration: 0.3,
        scale: 1.2,
        ease: 'bounce.out'
    });
} 