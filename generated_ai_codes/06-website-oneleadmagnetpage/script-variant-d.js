/**
 * VibeCoding Interactive Quiz - Variant D
 * Modern quiz experience with scoring system and workshop signup
 */

// ==============================================
// QUIZ STATE & CONFIGURATION
// ==============================================

const quizState = {
    currentQuestion: 1,
    totalQuestions: 3,
    answers: {},
    score: 0,
    completed: false,
    started: false
};

// Score calculation: each positive answer adds 35%, partial adds 20%
const SCORING = {
    'yes': 35,
    'partial': 20,
    'no': 0
};

// Score-based messages
const SCORE_MESSAGES = {
    low: {
        threshold: 50,
        icon: '🌱',
        title: 'Perfect pentru început!',
        message: 'E clar că ești la început. Hai să te ajutăm la workshop să pui bazele unui site web de succes!'
    },
    medium: {
        threshold: 80,
        icon: '🚀',
        title: 'Ești pe drumul cel bun!',
        message: 'Ești aproape gata! Vino la workshop și punem totul cap la cap pentru un site web profesional.'
    },
    high: {
        threshold: 100,
        icon: '🏆',
        title: 'Excelent progres!',
        message: 'Bravo! Ai făcut deja primii pași importanți. Hai să ducem site-ul la nivelul următor!'
    }
};

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 VibeCoding Interactive Quiz - Variant D loaded successfully!');
    
    initializeQuiz();
    initializeEventListeners();
    initializeAnimations();
    
    // Track page load for analytics
    trackEvent('quiz_page_loaded', {
        variant: 'D',
        timestamp: new Date().toISOString()
    });
});

function initializeQuiz() {
    // Reset quiz state
    resetQuizState();
    
    // Initialize progress bar
    updateProgressBar();
    
    // Show first question
    showQuestion(1);
    
    // Mark quiz as started
    quizState.started = true;
    
    console.log('🎮 Quiz initialized successfully');
}

function initializeEventListeners() {
    // Question 1 listeners
    initializeQuestionListeners(1);
    
    // Question 2 listeners
    initializeQuestionListeners(2);
    
    // Question 3 listeners
    initializeQuestionListeners(3);
    
    // Results screen listeners
    document.getElementById('restartQuiz').addEventListener('click', restartQuiz);
    
    // Results email form listeners
    initializeResultsEmailForm();
}

function initializeQuestionListeners(questionNumber) {
    const questionElement = document.getElementById(`question${questionNumber}`);
    const nextButton = document.getElementById(`nextBtn${questionNumber}`);
    const radioInputs = questionElement.querySelectorAll('input[type="radio"]');
    
    // Add event listeners to all radio buttons for this question
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            handleAnswerSelection(questionNumber, this.value);
        });
    });
    
    // Add click listeners to labels for better UX
    const labels = questionElement.querySelectorAll('.answer-option');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const input = this.querySelector('input[type="radio"]');
            if (input) {
                input.checked = true;
                handleAnswerSelection(questionNumber, input.value);
            }
        });
    });
    
    // Next button listener
    nextButton.addEventListener('click', function() {
        if (questionNumber < quizState.totalQuestions) {
            nextQuestion();
        } else {
            finishQuiz();
        }
    });
}

// ==============================================
// QUIZ FLOW CONTROL
// ==============================================

function handleAnswerSelection(questionNumber, answer) {
    // Store the answer
    quizState.answers[`q${questionNumber}`] = answer;
    
    // Update UI for selected answer
    updateAnswerSelection(questionNumber, answer);
    
    // Enable next button
    const nextButton = document.getElementById(`nextBtn${questionNumber}`);
    nextButton.disabled = false;
    
    // Add visual feedback
    animateAnswerSelection(questionNumber);
    
    // Track answer selection
    trackEvent('quiz_answer_selected', {
        question: questionNumber,
        answer: answer,
        timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Question ${questionNumber} answered: ${answer}`);
}

function updateAnswerSelection(questionNumber, selectedAnswer) {
    const questionElement = document.getElementById(`question${questionNumber}`);
    const answerOptions = questionElement.querySelectorAll('.answer-option');
    
    answerOptions.forEach(option => {
        const input = option.querySelector('input[type="radio"]');
        if (input.value === selectedAnswer) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function animateAnswerSelection(questionNumber) {
    const nextButton = document.getElementById(`nextBtn${questionNumber}`);
    
    // Animate button enable
    gsap.from(nextButton, {
        duration: 0.5,
        scale: 0.9,
        ease: 'bounce.out'
    });
    
    // Add success animation
    gsap.to(nextButton, {
        duration: 0.3,
        backgroundColor: '#27AE60',
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });
}

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`question${quizState.currentQuestion}`);
    const currentQuestionNumber = quizState.currentQuestion;
    
    console.log(`🔄 Transitioning from question ${currentQuestionNumber} to ${currentQuestionNumber + 1}`);
    
    // Check if current element exists
    if (!currentQuestionElement) {
        console.error(`❌ Current question element not found: question${currentQuestionNumber}`);
        return;
    }
    
    // Increment to next question
    quizState.currentQuestion++;
    const nextQuestionElement = document.getElementById(`question${quizState.currentQuestion}`);
    
    // Check if next element exists
    if (!nextQuestionElement) {
        console.error(`❌ Next question element not found: question${quizState.currentQuestion}`);
        quizState.currentQuestion = currentQuestionNumber; // Revert
        return;
    }
    
    console.log(`✅ Both elements found, proceeding with animation`);
    
    // Animate transition
    gsap.to(currentQuestionElement, {
        duration: 0.4,
        opacity: 0,
        x: -50,
        ease: 'power2.in',
        onComplete: () => {
            console.log(`📱 Animation complete, switching visibility`);
            currentQuestionElement.classList.remove('active');
            nextQuestionElement.classList.add('active');
            
            // Reset any previous animation states
            gsap.set(nextQuestionElement, { opacity: 1, x: 0 });
            
            // Animate next question in
            gsap.from(nextQuestionElement, {
                duration: 0.6,
                opacity: 0,
                x: 50,
                ease: 'power2.out',
                onComplete: () => {
                    console.log(`✨ Next question fully visible: ${quizState.currentQuestion}`);
                }
            });
        }
    });
    
    // Update progress
    updateProgressBar();
    
    // Track progress
    trackEvent('quiz_question_advanced', {
        from_question: currentQuestionNumber,
        to_question: quizState.currentQuestion,
        timestamp: new Date().toISOString()
    });
    
    console.log(`➡️ Advanced to question ${quizState.currentQuestion}`);
}

function finishQuiz() {
    // Calculate final score
    calculateScore();
    
    // Show results
    showResults();
    
    // Mark as completed
    quizState.completed = true;
    
    // Track completion
    trackEvent('quiz_completed', {
        score: quizState.score,
        answers: quizState.answers,
        timestamp: new Date().toISOString()
    });
    
    console.log(`🏁 Quiz completed with score: ${quizState.score}%`);
}

// ==============================================
// SCORING SYSTEM
// ==============================================

function calculateScore() {
    let totalScore = 0;
    
    // Calculate score based on answers
    Object.values(quizState.answers).forEach(answer => {
        totalScore += SCORING[answer] || 0;
    });
    
    // Ensure score doesn't exceed 100%
    quizState.score = Math.min(totalScore, 100);
    
    console.log(`🎯 Score calculated: ${quizState.score}% (answers: ${JSON.stringify(quizState.answers)})`);
}

function getScoreMessage(score) {
    if (score < SCORE_MESSAGES.low.threshold) {
        return SCORE_MESSAGES.low;
    } else if (score < SCORE_MESSAGES.medium.threshold) {
        return SCORE_MESSAGES.medium;
    } else {
        return SCORE_MESSAGES.high;
    }
}

// ==============================================
// RESULTS DISPLAY
// ==============================================

function showResults() {
    const currentQuestionElement = document.getElementById(`question${quizState.currentQuestion}`);
    const resultsElement = document.getElementById('results');
    
    console.log('🎯 Showing results...');
    
    // Get score message
    const scoreData = getScoreMessage(quizState.score);
    
    // Update results content
    updateResultsContent(scoreData);
    
    // Immediate, stable transition - no complex animations
    if (currentQuestionElement) {
        currentQuestionElement.classList.remove('active');
    }
    
    // Show results immediately
    resultsElement.classList.add('active');
    
    // Ensure email section is visible from start
    const emailSection = document.getElementById('resultsEmailSection');
    const successMessage = document.getElementById('resultsSuccessMessage');
    
    if (emailSection) {
        emailSection.classList.remove('d-none');
    }
    if (successMessage) {
        successMessage.classList.add('d-none');
    }
    
    // Reset any problematic styles that might cause disappearing
    gsap.set(resultsElement, { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        visibility: 'visible',
        display: 'block',
        clearProps: "all" 
    });
    
    // Very simple fade-in - no complex animations
    gsap.fromTo(resultsElement, 
        { opacity: 0 },
        { 
            opacity: 1, 
            duration: 0.5,
            ease: 'power1.out',
            onComplete: () => {
                console.log('✅ Results fully visible and stable');
                
                // Start score counter after a brief delay
                setTimeout(() => {
                    animateScoreCounter();
                }, 200);
            }
        }
    );
    
    // Update progress to 100%
    updateProgressBar(100);
    
    console.log('📊 Results displayed successfully');
}

function updateResultsContent(scoreData) {
    document.getElementById('resultsIcon').textContent = scoreData.icon;
    document.getElementById('resultsTitle').textContent = scoreData.title;
    document.getElementById('resultsMessage').textContent = scoreData.message;
}

function animateScoreCounter() {
    const scoreElement = document.getElementById('scoreValue');
    
    if (!scoreElement) {
        console.warn('Score element not found');
        return;
    }
    
    // Simple counter animation without complex effects
    let currentValue = 0;
    const targetValue = quizState.score;
    const increment = targetValue / 30; // 30 steps
    
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
        }
        scoreElement.textContent = `${Math.round(currentValue)}%`;
    }, 50);
    
    console.log('📊 Score counter animated to:', targetValue + '%');
}

function showSubtleCelebration() {
    // More subtle celebration that won't interfere with content
    const celebrationEmojis = ['🎉', '⭐', '🎯'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingEmoji(celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]);
        }, i * 400);
    }
}

function createFloatingEmoji(emoji) {
    const element = document.createElement('div');
    element.textContent = emoji;
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
}

// ==============================================
// PROGRESS BAR
// ==============================================

function updateProgressBar(customProgress = null) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let progress;
    let text;
    
    if (customProgress !== null) {
        progress = customProgress;
        text = 'Quiz Completat!';
    } else {
        progress = (quizState.currentQuestion / quizState.totalQuestions) * 100;
        text = `Întrebarea ${quizState.currentQuestion} din ${quizState.totalQuestions}`;
    }
    
    // Animate progress bar
    gsap.to(progressFill, {
        duration: 0.8,
        width: `${progress}%`,
        ease: 'power2.out'
    });
    
    // Update text
    progressText.textContent = text;
    
    console.log(`📊 Progress updated: ${progress}% - ${text}`);
}

// ==============================================
// QUIZ CONTROLS
// ==============================================

function restartQuiz() {
    // Reset state
    resetQuizState();
    
    // Hide results and success message
    document.getElementById('results').classList.remove('active');
    const successMessage = document.getElementById('resultsSuccessMessage');
    const emailSection = document.getElementById('resultsEmailSection');
    
    if (successMessage) {
        successMessage.classList.add('d-none');
    }
    if (emailSection) {
        emailSection.classList.remove('d-none');
    }
    
    // Show first question
    showQuestion(1);
    
    // Reset progress
    updateProgressBar();
    
    // Reset all answer selections
    resetAllAnswers();
    
    // Reset email form
    resetEmailForm();
    
    // Animate restart
    gsap.from('.quiz-container', {
        duration: 0.6,
        opacity: 0,
        scale: 0.95,
        ease: 'bounce.out'
    });
    
    // Track restart
    trackEvent('quiz_restarted', {
        timestamp: new Date().toISOString()
    });
    
    console.log('🔄 Quiz restarted');
}

function resetQuizState() {
    quizState.currentQuestion = 1;
    quizState.answers = {};
    quizState.score = 0;
    quizState.completed = false;
    quizState.started = true;
}

function resetAllAnswers() {
    for (let i = 1; i <= quizState.totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        const answerOptions = questionElement.querySelectorAll('.answer-option');
        const radioInputs = questionElement.querySelectorAll('input[type="radio"]');
        const nextButton = document.getElementById(`nextBtn${i}`);
        
        // Reset visual selections
        answerOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Reset radio inputs
        radioInputs.forEach(input => {
            input.checked = false;
        });
        
        // Disable next buttons
        nextButton.disabled = true;
    }
}

function resetEmailForm() {
    const emailInput = document.getElementById('resultsEmail');
    const submitButton = document.getElementById('resultsSubmitBtn');
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoader = submitButton.querySelector('.submit-loader');
    const feedback = emailInput.parentNode.querySelector('.input-feedback');
    
    // Reset form
    emailInput.value = '';
    emailInput.classList.remove('valid', 'invalid');
    
    // Reset button
    submitText.classList.remove('d-none');
    submitLoader.classList.add('d-none');
    submitButton.disabled = false;
    
    // Reset feedback
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'input-feedback';
    }
}

function showQuestion(questionNumber) {
    console.log(`📋 showQuestion called with questionNumber: ${questionNumber}`);
    
    // Hide all questions first
    for (let i = 1; i <= quizState.totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        if (questionElement) {
            questionElement.classList.remove('active');
            console.log(`👁️ Hidden question ${i}`);
        } else {
            console.warn(`⚠️ Question element not found: question${i}`);
        }
    }
    
    // Hide results if visible
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
        resultsElement.classList.remove('active');
    }
    
    // Show requested question
    const targetElement = document.getElementById(`question${questionNumber}`);
    if (targetElement) {
        targetElement.classList.add('active');
        quizState.currentQuestion = questionNumber;
        console.log(`✅ Showing question ${questionNumber}`);
        
        // Reset any GSAP transforms that might interfere
        gsap.set(targetElement, { opacity: 1, x: 0, clearProps: "all" });
        
    } else {
        console.error(`❌ Target question element not found: question${questionNumber}`);
    }
}

// ==============================================
// RESULTS EMAIL FORM HANDLING
// ==============================================

function initializeResultsEmailForm() {
    const form = document.getElementById('resultsEmailForm');
    const emailInput = document.getElementById('resultsEmail');
    
    // Real-time validation
    emailInput.addEventListener('input', () => validateResultsEmail(emailInput));
    
    // Form submission
    form.addEventListener('submit', handleResultsEmailSubmit);
}

function validateResultsEmail(input) {
    const feedback = input.parentNode.querySelector('.input-feedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    const message = isValid ? 'Email valid ✓' : 'Te rugăm să introduci o adresă de email validă';
    
    // Update input styling
    input.classList.remove('valid', 'invalid');
    input.classList.add(isValid ? 'valid' : 'invalid');
    
    // Update feedback
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `input-feedback ${isValid ? 'success' : 'error'}`;
    }
    
    return isValid;
}

function handleResultsEmailSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('resultsEmail');
    const submitButton = document.getElementById('resultsSubmitBtn');
    
    // Validate email
    if (!validateResultsEmail(emailInput)) {
        showFormError('Te rugăm să introduci o adresă de email validă');
        return;
    }
    
    // Show loading state
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoader = submitButton.querySelector('.submit-loader');
    
    submitText.classList.add('d-none');
    submitLoader.classList.remove('d-none');
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showResultsSuccess();
        
        // Track successful signup
        trackEvent('results_email_submitted', {
            email: emailInput.value,
            score: quizState.score,
            timestamp: new Date().toISOString()
        });
        
    }, 2000);
}

function showResultsSuccess() {
    const emailSection = document.getElementById('resultsEmailSection');
    const successMessage = document.getElementById('resultsSuccessMessage');
    
    // Hide email form and show success
    gsap.to(emailSection, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        onComplete: () => {
            emailSection.classList.add('d-none');
            successMessage.classList.remove('d-none');
            
            // Animate success message
            gsap.from(successMessage, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                scale: 0.95,
                ease: 'bounce.out'
            });
            
            // Trigger final celebration
            setTimeout(() => {
                showFinalCelebration();
            }, 500);
        }
    });
}

// ==============================================
// FINAL CELEBRATION FUNCTIONS
// ==============================================

function showFinalCelebration() {
    // Create celebration confetti
    const confettiColors = ['#FF6B35', '#F7931E', '#FFD23F', '#27AE60', '#3498DB'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiColors[Math.floor(Math.random() * confettiColors.length)]);
        }, i * 100);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '10001';
    confetti.style.pointerEvents = 'none';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    gsap.to(confetti, {
        duration: 3,
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 300,
        rotation: 360,
        opacity: 0,
        ease: 'power2.in',
        onComplete: () => {
            confetti.remove();
        }
    });
}

function showFormError(message) {
    // Create error notification
    const error = document.createElement('div');
    error.className = 'error-notification';
    error.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #E74C3C;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10002;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
    `;
    error.textContent = message;
    
    document.body.appendChild(error);
    
    // Animate in
    gsap.from(error, {
        duration: 0.5,
        x: 300,
        opacity: 0
    });
    
    // Auto-remove
    setTimeout(() => {
        gsap.to(error, {
            duration: 0.5,
            x: 300,
            opacity: 0,
            onComplete: () => {
                error.remove();
            }
        });
    }, 4000);
}

// ==============================================
// ANIMATIONS & VISUAL EFFECTS
// ==============================================

// Note: Workshop signup functionality has been moved to the results page
// See initializeResultsEmailForm() and related functions above

function initializeAnimations() {
    // Floating shapes animation
    gsap.to('.quiz-shape1', {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.quiz-shape2', {
        duration: 25,
        rotation: -360,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.quiz-shape3', {
        duration: 30,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    // Question icons bounce animation
    const questionIcons = document.querySelectorAll('.question-icon');
    questionIcons.forEach((icon, index) => {
        gsap.to(icon, {
            duration: 2 + index * 0.5,
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
        });
    });
}

// ==============================================
// ANALYTICS & TRACKING
// ==============================================

function trackEvent(eventName, eventData = {}) {
    // Track to console for development
    console.log(`📊 Analytics Event: ${eventName}`, eventData);
    
    // Here you would integrate with your analytics platform
    // Examples:
    // Google Analytics: gtag('event', eventName, eventData);
    // Facebook Pixel: fbq('track', eventName, eventData);
    // Custom Analytics: yourAnalytics.track(eventName, eventData);
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

// Prevent accidental page refresh during quiz
window.addEventListener('beforeunload', (e) => {
    if (quizState.started && !quizState.completed && Object.keys(quizState.answers).length > 0) {
        e.preventDefault();
        e.returnValue = 'Ești sigur că vrei să părăsești quizul? Progresul tău va fi pierdut.';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Responsive adjustments if needed
    console.log('📱 Window resized');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && quizState.started && !quizState.completed) {
        const activeQuestion = document.querySelector('.quiz-question.active');
        const nextButton = activeQuestion.querySelector('.quiz-btn:not(:disabled)');
        if (nextButton && !nextButton.disabled) {
            nextButton.click();
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 Quiz Error:', e.error);
    trackEvent('quiz_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        timestamp: new Date().toISOString()
    });
});

// Initialize performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            trackEvent('quiz_performance', {
                loadTime: loadTime,
                timestamp: new Date().toISOString()
            });
        }, 0);
    });
}

console.log('🎮 VibeCoding Interactive Quiz - Variant D script loaded successfully!');

// Global functions for debugging (remove in production)
window.debugQuiz = {
    getState: () => quizState,
    setScore: (score) => { quizState.score = score; },
    showResults: () => showResults(),
    restart: () => restartQuiz(),
    debugState: () => debugQuizState(),
    showQuestion: (num) => showQuestion(num)
};

// Debug helper function
function debugQuizState() {
    console.log('🐛 Quiz Debug Info:');
    console.log('Current Question:', quizState.currentQuestion);
    console.log('Total Questions:', quizState.totalQuestions);
    console.log('Answers:', quizState.answers);
    console.log('Quiz Started:', quizState.started);
    console.log('Quiz Completed:', quizState.completed);
    
    // Check if all question elements exist
    for (let i = 1; i <= quizState.totalQuestions; i++) {
        const element = document.getElementById(`question${i}`);
        const isActive = element?.classList.contains('active');
        console.log(`Question ${i}: ${element ? '✅ exists' : '❌ missing'} ${isActive ? '(active)' : ''}`);
    }
} 