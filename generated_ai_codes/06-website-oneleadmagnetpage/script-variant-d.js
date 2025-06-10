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

// Score calculation: pentru noul quiz provocator
const SCORING = {
    'yes': 0,      // Răspunsuri "greșite" - 0 puncte  
    'partial': 50, // Răspunsuri parțiale - 50 puncte
    'no': 100      // Răspunsuri "corecte" - 100 puncte
};

// Mesaje personalizate bazate pe răspunsuri și scor
const PERSONALIZED_MESSAGES = {
    // Pentru cei care cred că trebuie programare (q1: yes)
    programming_believer: {
        icon: '💡',
        title: 'Surpriză! Te înșeli.',
        message: 'Realizarea unui website modern înseamnă claritate, nu cod. Hai să-ți arăt cum se face cu adevărat.'
    },
    // Pentru cei confuzi de termenii tehnici (q2: yes)
    tech_confused: {
        icon: '🎯',
        title: 'Perfect! Asta e tocmai ce căutam.',
        message: 'Faptul că "te pierzi" înseamnă că e momentul să înțelegi totul simplu, pe limba ta.'
    },
    // Pentru cei sceptici față de AI (q3: yes)
    ai_skeptic: {
        icon: '🚀',
        title: 'Fals! Tocmai aici încep lucrurile interesante.',
        message: 'AI-ul și "vibe coding" nu sunt jucării. Sunt viitorul, și tu poți fi parte din el.'
    },
    // Pentru cei cu scor mic (sunt în căutare)
    seeker: {
        icon: '🌱',
        title: 'E clar că n-ai avut încă contextul potrivit.',
        message: 'Tocmai de aceea există workshopul ăsta. Să-ți oferim contextul și claritatea de care ai nevoie.'
    },
    // Pentru cei cu scor mediu (au potențial)
    potential: {
        icon: '⚡',
        title: 'Ai deja începutul în tine.',
        message: 'Îți lipsește doar direcția practică. Hai să transformăm intuiția în rezultate concrete.'
    },
    // Pentru cei cu scor mare (sunt pregătiți)
    ready: {
        icon: '🏆',
        title: 'Ai mindsetul potrivit.',
        message: 'Hai să-l transformăm în acțiune concretă. Ești mai aproape de succes decât crezi.'
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
    
    // Calculează scorul total
    Object.values(quizState.answers).forEach(answer => {
        totalScore += SCORING[answer] || 0;
    });
    
    // Scorul este din 300 puncte posibile (3 întrebări x 100 puncte max)
    // Convertim la procente
    quizState.score = Math.round((totalScore / 300) * 100);
    
    console.log(`🎯 Score calculated: ${quizState.score}% (total points: ${totalScore}/300, answers: ${JSON.stringify(quizState.answers)})`);
}

function getPersonalizedMessage(score, answers) {
    console.log('🎯 Getting personalized message for score:', score, 'answers:', answers);
    
    // Logică personalizată bazată pe răspunsuri specifice
    const q1 = answers.q1; // Întrebarea despre programare
    const q2 = answers.q2; // Întrebarea despre termeni tehnici  
    const q3 = answers.q3; // Întrebarea despre AI
    
    // Mesaje speciale pentru răspunsuri specifice (indiferent de scor)
    if (q1 === 'yes') {
        return PERSONALIZED_MESSAGES.programming_believer;
    }
    
    if (q2 === 'yes') {
        return PERSONALIZED_MESSAGES.tech_confused;
    }
    
    if (q3 === 'yes') {
        return PERSONALIZED_MESSAGES.ai_skeptic;
    }
    
    // Altfel, folosește scorul pentru mesaj
    if (score <= 40) {
        return PERSONALIZED_MESSAGES.seeker;
    } else if (score <= 80) {
        return PERSONALIZED_MESSAGES.potential;
    } else {
        return PERSONALIZED_MESSAGES.ready;
    }
}

// ==============================================
// RESULTS DISPLAY
// ==============================================

function showResults() {
    const currentQuestionElement = document.getElementById(`question${quizState.currentQuestion}`);
    const resultsElement = document.getElementById('results');
    
    console.log('🎯 Showing results...');
    
    // Obține mesajul personalizat
    const messageData = getPersonalizedMessage(quizState.score, quizState.answers);
    
    // Update results content
    updateResultsContent(messageData);
    
    // Immediate, stable transition - no complex animations
    if (currentQuestionElement) {
        currentQuestionElement.classList.remove('active');
    }
    
    // Show results immediately
    resultsElement.classList.add('active');
    
    // Ensure email section is visible and success message is hidden from start
    const emailSection = document.getElementById('resultsEmailSection');
    const successMessage = document.getElementById('resultsSuccessMessage');
    
    if (emailSection) {
        emailSection.classList.remove('d-none');
        emailSection.style.display = 'block';
        emailSection.style.visibility = 'visible';
        emailSection.style.opacity = '1';
    }
    
    if (successMessage) {
        successMessage.classList.add('d-none');
        successMessage.style.display = 'none';
        successMessage.style.visibility = 'hidden';
        successMessage.style.opacity = '0';
        successMessage.style.height = '0';
        successMessage.style.overflow = 'hidden';
        console.log('✅ Success message properly hidden initially');
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

function updateResultsContent(messageData) {
    document.getElementById('resultsIcon').textContent = messageData.icon;
    document.getElementById('resultsTitle').textContent = messageData.title;
    document.getElementById('resultsMessage').textContent = messageData.message;
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
    
    // Ensure success message is completely hidden
    if (successMessage) {
        successMessage.classList.add('d-none');
        successMessage.style.cssText = `
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
        `;
        console.log('✅ Success message reset to hidden state');
    }
    
    // Ensure email section is visible
    if (emailSection) {
        emailSection.classList.remove('d-none');
        emailSection.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;
        console.log('✅ Email section reset to visible state');
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
    console.log('🔧 initializeResultsEmailForm called');
    
    const form = document.getElementById('resultsEmailForm');
    const emailInput = document.getElementById('resultsEmail');
    
    if (!form || !emailInput) {
        console.error('❌ Form elements not found:', { form, emailInput });
        return;
    }
    
    console.log('✅ Form elements found, setting up listeners');
    
    // Real-time validation
    emailInput.addEventListener('input', () => {
        console.log('📧 Email input changed');
        validateResultsEmail(emailInput);
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        console.log('📧 Form submit event triggered');
        handleResultsEmailSubmit(e);
    });
    
    // Also add click listener to button as backup
    const submitButton = document.getElementById('resultsSubmitBtn');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            console.log('🔘 Submit button clicked directly');
            if (submitButton.type !== 'submit') {
                e.preventDefault();
                handleResultsEmailSubmit(e);
            }
        });
    }
    
    console.log('✅ Email form initialized successfully');
}

function validateResultsEmail(input) {
    console.log('📧 validateResultsEmail called with:', input?.value);
    
    if (!input) {
        console.error('❌ Input element is null');
        return false;
    }
    
    const feedback = input.parentNode.querySelector('.input-feedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = input.value.trim();
    
    console.log('📧 Email to validate:', emailValue);
    
    const isValid = emailValue.length > 0 && emailRegex.test(emailValue);
    const message = isValid ? 'Email valid ✓' : 'Te rugăm să introduci o adresă de email validă';
    
    console.log('📧 Validation result:', isValid, 'Message:', message);
    
    // Update input styling
    input.classList.remove('valid', 'invalid');
    input.classList.add(isValid ? 'valid' : 'invalid');
    
    // Update feedback if element exists
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `input-feedback ${isValid ? 'success' : 'error'}`;
        console.log('📧 Feedback updated');
    } else {
        console.warn('⚠️ Feedback element not found');
    }
    
    return isValid;
}

function handleResultsEmailSubmit(e) {
    e.preventDefault();
    
    console.log('📧 Form submission started...');
    
    const emailInput = document.getElementById('resultsEmail');
    const submitButton = document.getElementById('resultsSubmitBtn');
    
    if (!emailInput || !submitButton) {
        console.error('❌ Required elements not found:', { emailInput, submitButton });
        return;
    }
    
    console.log('📧 Email value:', emailInput.value);
    
    // Validate email
    const isValid = validateResultsEmail(emailInput);
    console.log('📧 Email validation result:', isValid);
    
    if (!isValid) {
        console.log('❌ Email validation failed');
        showFormError('Te rugăm să introduci o adresă de email validă');
        return;
    }
    
    console.log('✅ Email is valid, proceeding...');
    
    // Show loading state
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoader = submitButton.querySelector('.submit-loader');
    
    if (!submitText || !submitLoader) {
        console.error('❌ Button elements not found:', { submitText, submitLoader });
        return;
    }
    
    console.log('🔄 Setting loading state...');
    submitText.classList.add('d-none');
    submitLoader.classList.remove('d-none');
    submitButton.disabled = true;
    
    // Simulate form submission
    console.log('⏳ Starting 2-second delay...');
    setTimeout(() => {
        console.log('✅ Timeout completed, showing success...');
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
    console.log('🎉 showResultsSuccess called');
    
    const emailSection = document.getElementById('resultsEmailSection');
    const successMessage = document.getElementById('resultsSuccessMessage');
    
    if (!emailSection || !successMessage) {
        console.error('❌ Success elements not found:', { emailSection, successMessage });
        return;
    }
    
    console.log('✅ Success elements found, proceeding with animation...');
    
    // Immediately hide email section with CSS
    emailSection.style.display = 'none';
    emailSection.style.visibility = 'hidden';
    emailSection.style.opacity = '0';
    emailSection.classList.add('d-none');
    
    console.log('📧 Email section forcibly hidden');
    
    // Force visibility of success message immediately
    successMessage.style.display = 'block';
    successMessage.style.visibility = 'visible';
    successMessage.style.opacity = '1';
    successMessage.classList.remove('d-none');
    
    console.log('🎉 Success message forced visible');
    
    // Simple direct transition without complex GSAP
    successMessage.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        z-index: 1000 !important;
        transform: translateY(0) scale(1) !important;
    `;
    
    // Animate success message with simple GSAP
    gsap.fromTo(successMessage, 
        { 
            opacity: 0, 
            y: 30, 
            scale: 0.9 
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'bounce.out',
            onComplete: () => {
                console.log('🎊 Success message fully visible!');
                
                // Final visibility check
                const isVisible = window.getComputedStyle(successMessage).display !== 'none';
                const isEmailHidden = window.getComputedStyle(emailSection).display === 'none';
                
                console.log('👁️ Success message visibility check:', isVisible);
                console.log('👁️ Email section hidden check:', isEmailHidden);
                
                // Extra safety - force email section hidden again
                if (!isEmailHidden) {
                    console.warn('⚠️ Email section still visible, forcing hide!');
                    emailSection.style.cssText = `
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    `;
                }
            }
        }
    );
    
    // Trigger final celebration
    setTimeout(() => {
        console.log('🎉 Starting final celebration...');
        showFinalCelebration();
    }, 500);
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