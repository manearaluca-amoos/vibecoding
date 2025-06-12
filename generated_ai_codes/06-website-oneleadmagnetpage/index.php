<?php
// Check if variant parameter is set and equals 'a'
$variant = isset($_GET['variant']) ? $_GET['variant'] : '';

if ($variant === 'a') {
    // Include variant-a content
    include 'index-variant-a.php';
    exit;
}

// Default: Show variant-d content (quiz)
?>
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>VibeCoding Workshop - Quiz Interactiv</title>
    <link rel="stylesheet" href="style-variant-d.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js"></script>
</head>
<body>
    <!-- Quiz Section -->
    <section id="quizSection" class="quiz-section">
        <div class="quiz-background-shapes">
            <div class="quiz-shape quiz-shape1"></div>
            <div class="quiz-shape quiz-shape2"></div>
            <div class="quiz-shape quiz-shape3"></div>
        </div>

        <div class="container">
            <!-- Quiz Header -->
            <div class="quiz-header text-center">
                <div class="quiz-logo">
                    <img src="assets/images/amoos-gold-COMPLET-bg-transparent.png" alt="Amoos.ro - Partenerul tau digital de incredere" class="logo-img">
                </div>
                <h1 class="quiz-title">
                    Ești gata pentru <span class="vibecoding-highlight">VibeCoding</span> Workshop?
                </h1>
                <p class="quiz-subtitle">
                    Răspunde la 3 întrebări simple și descoperă cât de pregătit ești pentru primul tău site web profesional!
                </p>
            </div>

            <!-- Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text">
                    <span id="progressText">Întrebarea 1 din 3</span>
                </div>
            </div>

            <!-- Quiz Container -->
            <div class="quiz-container">
                
                <!-- Question 1 -->
                <div class="quiz-question active" id="question1">
                    <div class="question-content">
                        <div class="question-icon">💻</div>
                        <h2 class="question-title">Crezi că trebuie să știi programare ca să-ți faci un site?</h2>
                        <div class="answers-container">
                            <label class="answer-option">
                                <input type="radio" name="q1" value="yes">
                                <span class="answer-text">Da, evident că trebuie să știu cod</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="partial">
                                <span class="answer-text">Probabil că ajută să știu măcar bazele</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="no">
                                <span class="answer-text">Nu, cred că se poate și fără programare</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                        </div>
                        <button class="quiz-btn" id="nextBtn1" disabled>
                            Următoarea întrebare <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Question 2 -->
                <div class="quiz-question" id="question2">
                    <div class="question-content">
                        <div class="question-icon">🌐</div>
                        <h2 class="question-title">Ți se pare că "te pierzi" când auzi termeni tehnici legat de web?</h2>
                        <div class="answers-container">
                            <label class="answer-option">
                                <input type="radio" name="q2" value="yes">
                                <span class="answer-text">Da, mă confundă toți termenii ăștia</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q2" value="partial">
                                <span class="answer-text">Uneori înțeleg, alteori nu</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q2" value="no">
                                <span class="answer-text">Nu, mă descurc destul de bine</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                        </div>
                        <button class="quiz-btn" id="nextBtn2" disabled>
                            Următoarea întrebare <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Question 3 -->
                <div class="quiz-question" id="question3">
                    <div class="question-content">
                        <div class="question-icon">🤖</div>
                        <h2 class="question-title">Ai auzit că AI-ul e doar o jucărie sau că "vibe coding" nu funcționează?</h2>
                        <div class="answers-container">
                            <label class="answer-option">
                                <input type="radio" name="q3" value="yes">
                                <span class="answer-text">Da, sunt sceptic/ă față de astea noi</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q3" value="partial">
                                <span class="answer-text">Sunt curios/ă dar nu știu ce să cred</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q3" value="no">
                                <span class="answer-text">Nu, cred că au potențial real</span>
                                <span class="answer-checkmark">✓</span>
                            </label>
                        </div>
                        <button class="quiz-btn" id="nextBtn3" disabled>
                            Vezi rezultatul <i class="bi bi-trophy"></i>
                        </button>
                    </div>
                </div>

                <!-- Results Screen -->
                <div class="quiz-question" id="results">
                    <div class="question-content results-content">
                        <div class="score-display">
                            <span class="score-label">Scorul tău:</span>
                            <span class="score-value" id="scoreValue">0%</span>
                        </div>
                        <h2 class="results-title" id="resultsTitle">Felicitări!</h2>
                        
                        <!-- Email Form on Results Page - Moved up here -->
                        <div class="results-email-section" id="resultsEmailSection">
                            <h3 class="email-section-title">🚀 Rezervă-ți locul la workshop!</h3>
                            <p class="email-section-subtitle">Introduce adresa ta de email pentru a primi toate detaliile</p>
                            
                            <form id="resultsEmailForm" class="results-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="email" id="resultsEmail" name="email" class="form-control" placeholder="numele.tau@email.com" required>
                                        <div class="input-feedback"></div>
                                    </div>
                                    <button type="submit" class="results-submit-btn" id="resultsSubmitBtn">
                                        <span class="submit-text">Înscrie-mă la workshop!</span>
                                        <span class="submit-loader d-none">
                                            <span class="spinner"></span>
                                            Se înregistrează...
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <p class="results-message" id="resultsMessage">Mesajul va apărea aici...</p>
                        
                        <!-- Achievement Badge -->
                        <div class="achievement-badge">
                            <p class="achievement-text">
                                <span class="badge-icon">⭐</span> Ai răspuns cu sinceritate și <strong>asta e exact ce căutam</strong>.<br>
                                Meriți un loc la workshop!
                            </p>
                        </div>

                        <!-- Success Message (hidden initially) -->
                        <div id="resultsSuccessMessage" class="results-success-message d-none">
                            <div class="success-content">
                                <i class="bi bi-check-circle-fill"></i>
                                <h3>Perfect! Ești înscris la workshop! 🎉</h3>
                                <p>
                                    Vei primi în scurt timp un email cu toate detaliile workshop-ului.<br>
                                    <strong>⚠️ Verifică și folderul de spam pentru a confirma înscrierea!</strong><br>
                                    <strong>Ne vedem curând la VibeCoding Workshop!</strong> 🚀
                                </p>
                                <div class="success-celebration">
                                    <div class="celebration-emojis">🎊 🎉 🎯 🚀 ⭐</div>
                                </div>
                            </div>
                        </div>

                        <!-- Restart Quiz Button -->
                        <button class="restart-btn" id="restartQuiz">
                            <i class="bi bi-arrow-clockwise"></i>
                            Refă quizul
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Scripts -->
    <script src="script-variant-d.js"></script>
</body>
</html> 