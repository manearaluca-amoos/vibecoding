<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5 Lucruri de Știut Înainte să Înveți Programare Web - Ghid Gratuit</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- GSAP for animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Meta Tags for SEO -->
    <meta name="description" content="Descarcă gratuit ghidul '5 Lucruri de Știut Înainte să Înveți Programare Web' și primește acces la training-ul nostru gratuit!">
    <meta name="keywords" content="programare web, dezvoltare web, ghid gratuit, învățare programare, web development">
    <meta property="og:title" content="5 Lucruri de Știut Înainte să Înveți Programare Web - Ghid Gratuit">
    <meta property="og:description" content="Descarcă gratuit ghidul și descoperă pașii exacți pentru a-ți începe călătoria în dezvoltarea web cu încredere și claritate!">
    <meta property="og:type" content="website">
</head>
<body>

    <!-- SECTION: Navigation with Logo -->
    <nav class="top-nav" role="navigation" aria-label="Top navigation">
        <div class="nav-container">
            <img src="assets/images/amoos-gold-COMPLET-bg-transparent-black.png" 
                 alt="Amoos.ro - Partenerul tau digital de incredere" 
                 class="logo-image"
                 id="logoImage">
        </div>
    </nav>

    <!-- SECTION: Hero Area with Lead Magnet -->
    <main id="sHeroSection" class="position-relative overflow-hidden">
        <!-- Background Elements -->
        <div class="sBackgroundShapes">
            <div class="sShape sShape1"></div>
            <div class="sShape sShape2"></div>
            <div class="sShape sShape3"></div>
        </div>
        
        <div class="container">
            <div class="row justify-content-center min-vh-100 align-items-center">
                <div class="col-lg-10 col-xl-9">
                    <div class="sHeroContent text-center">
                        
                        <!-- Brand Badge -->
                        <div class="sBrandBadge" id="sBrandBadgeClickable" style="cursor: pointer;" title="Click pentru a merge la formular">
                            <span class="sBadgeText">AFLA CUM SA INVETI PRIN PRACTICA</span>
                            <span class="sBadgeHighlight">PROGRAMARE</span>
                        </div>
                        
                        <!-- Value Proposition - Now larger -->
                        <div class="sValueProposition">
                            <h1 class="sMainHeadline">
                                Obține acces <strong>GRATUIT</strong> la workshop-ul practic 
                                <span class="sGuideTitleHighlight" id="sVibecodingModal" style="cursor: pointer;" title="Click pentru a afla despre VibeCoding">"VibeCoding - Învață de la zero la programare web și AI"</span> 
                                & bonus primești ghidul "5 lucruri de știut înainte să înveți programare"!
                            </h1>
                        </div>
                        
                        <!-- Main Headline - Now smaller -->
                        <h2 class="sSubHeadline">
                            Cum să intri în domeniul
                            <span class="sHighlightText" id="sWebDevModal" style="cursor: pointer;" title="Click pentru a afla despre dezvoltarea web">dezvoltării web</span> 
                            chiar dacă te simți copleșit de numeroasele căi de învățare și de piața muncii care pare că nu mai are nevoie de noi din cauza <span class="sHighlightText" id="sAIModal" style="cursor: pointer;" title="Click pentru a afla despre Inteligența Artificială">Inteligenței Artificiale</span>...
                        </h2>
                        
                         <!-- Lead Capture Form -->
                         <div class="sLeadForm">
                            <form id="sLeadCaptureForm" class="sFormContainer" novalidate>
                                <div class="sFormFields">
                                    <!-- First Name Field -->
                                    <!-- <div class="sFieldGroup">
                                        <label for="sFirstNameInput" class="form-label sFieldLabel">Prenumele tău aici...*</label>
                                        <input 
                                            type="text" 
                                            class="form-control sFormInput" 
                                            id="sFirstNameInput" 
                                            name="firstName"
                                            placeholder="Prenumele tău aici..." 
                                            required
                                            autocomplete="given-name"
                                        >
                                        <div class="invalid-feedback">Te rugăm să introduci prenumele tău</div>
                                    </div> -->
                                    
                                    <!-- Email Field -->
                                    <div class="sFieldGroup">
                                        <label for="sEmailInput" class="form-label sFieldLabel">Email-ul tău aici...*</label>
                                        <input 
                                            type="email" 
                                            class="form-control sFormInput" 
                                            id="sEmailInput" 
                                            name="email"
                                            placeholder="exemplu@email.com" 
                                            required
                                            autocomplete="email"
                                        >
                                        <div class="invalid-feedback">Te rugăm să introduci o adresă de email validă</div>
                                    </div>
                                </div>
                                
                                <!-- Submit Button -->
                                <button type="submit" class="btn sCTAButton" id="sSubmitButton">
                                    <span class="sCTAText">
                                        <i class="bi bi-download me-2"></i>
                                        Accesează instant ghidul gratuit și primește biletul la training-ul gratuit
                                    </span>
                                    <div class="sCTALoader d-none">
                                        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Se procesează...
                                    </div>
                                </button>
                                
                                <!-- Privacy Notice -->
                                <div class="sPrivacyNotice">
                                    <small>
                                        <i class="bi bi-shield-check me-1"></i>
                                        Nu spam, promitem! Informațiile tale sunt 100% securizate. 
                                        <a href="#" class="sPrivacyLink">Politica de confidențialitate</a>
                                    </small>
                                </div>
                            </form>
                        </div>
                          <!-- Success Message -->
                        <div id="sSuccessMessage" class="sSuccessContainer d-none">
                            <div class="sSuccessContent">
                                <i class="bi bi-check-circle-fill sSuccessIcon"></i>
                                <h3 class="sSuccessTitle">Felicitări! 🎉</h3>
                                <p class="sSuccessText">
                                    Ghidul tău gratuit a fost trimis la adresa de email introdusă. 
                                    Verifică inbox-ul (și folder-ul spam) pentru a accesa instant conținutul.
                                </p>
                                <div class="sSuccessActions">
                                    <button class="btn sSecondaryButton" onclick="resetForm()">
                                        <i class="bi bi-arrow-left me-2"></i>
                                        Înapoi la formular
                                    </button>
                                </div>
                            </div>
                        </div>
                        

                        <!-- Video Section -->
                        <div class="sVideoSection">
                            <div class="sVideoContainer">
                                <div class="sVideoCaption">
                                    <i class="bi bi-play-circle me-2"></i>
                                    Află de ce acest ghid te va ajuta să devii un programator web bun!
                                </div>
                                <div class="sVideoWrapper">
                                    <iframe 
                                        src="https://www.youtube.com/embed/xVyUGodQWTQ" 
                                        title="De ce să te înregistrezi pentru ghidul de programare web"
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowfullscreen
                                        class="sVideoFrame">
                                    </iframe>
                                </div>
                                
                            </div>
                        </div>

                      
                       
                        
                        
                        
                        <!-- Trust Elements -->
                        <div class="sTrustElements">
                            <div class="row text-center">
                                <div class="col-md-4">
                                    <div class="sTrustItem">
                                        <i class="bi bi-people-fill sTrustIcon"></i>
                                        <span class="sTrustText">Peste 100+ developeri ajutați</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="sTrustItem">
                                        <i class="bi bi-star-fill sTrustIcon"></i>
                                        <span class="sTrustText">Rating 4.9/5 stele</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="sTrustItem">
                                        <i class="bi bi-shield-check sTrustIcon"></i>
                                        <span class="sTrustText">100% gratuit & sigur</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Floating Elements -->
        <div class="sFloatingElements">
            <div class="sFloatingElement sElement1">
                <i class="bi bi-code-slash"></i>
            </div>
            <div class="sFloatingElement sElement2">
                <i class="bi bi-laptop"></i>
            </div>
            <div class="sFloatingElement sElement3">
                <i class="bi bi-lightbulb"></i>
            </div>
            <div class="sFloatingElement sElement4">
                <i class="bi bi-rocket-takeoff"></i>
            </div>
        </div>
    </main>

    <!-- SECTION: Social Proof -->
    <section id="sSocialProofSection" class="py-4">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="sSocialProofText mb-3">
                        <strong>Alătură-te comunității de programatori care au intrat în domeniu cu încredere!</strong>
                    </p>
                    <div class="sSocialProofStats">
                        <span class="sStatBadge">
                            <i class="bi bi-download me-1"></i>
                            247 descărcări
                        </span>
                        <span class="sStatBadge">
                            <i class="bi bi-heart-fill me-1"></i>
                            192 participanti mulțumiți
                        </span>
                        <span class="sStatBadge">
                            <i class="bi bi-trophy-fill me-1"></i>
                            94% rata de succes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JavaScript -->
    <script src="script.js"></script>

    <!-- MODALS SECTION -->
    <!-- Web Development Modal -->
    <div class="modal fade" id="webDevModal" tabindex="-1" aria-labelledby="webDevModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content sModalContent">
                <div class="modal-header sModalHeader">
                    <h5 class="modal-title sModalTitle" id="webDevModalLabel">
                        <i class="bi bi-code-slash me-2"></i>
                        De ce să alegi dezvoltarea web?
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body sModalBody">
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🌐 Ce este dezvoltarea web?</h6>
                        <p>Dezvoltarea web înseamnă să creezi site-uri și aplicații care rulează în browser. Este arta de a transforma idei în experiențe digitale interactive pe care milioane de oameni le folosesc zilnic.</p>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">📈 De ce este în creștere domeniul web?</h6>
                        <ul class="sModalList">
                            <li><strong>Digitalizarea accelerată:</strong> Toate businessurile au nevoie de prezență online puternică</li>
                            <li><strong>Explozia e-commerce:</strong> Comerțul online crește exponențial și are nevoie de dezvoltatori</li>
                            <li><strong>Munca la distanță:</strong> Aplicațiile web sunt esențiale pentru lucrul de acasă</li>
                            <li><strong>Mobile-first:</strong> Site-urile responsive sunt mai importante ca niciodată</li>
                            <li><strong>Inovația continuă:</strong> Noi tehnologii și framework-uri apar constant</li>
                        </ul>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">💰 De ce să înveți dezvoltare web acum?</h6>
                        <ul class="sModalList">
                            <li><strong>Salarii atractive:</strong> Între 3,000-8,000+ RON/lună pentru începători</li>
                            <li><strong>Flexibilitate maximă:</strong> Poți lucra remote de oriunde din lume</li>
                            <li><strong>Cerere uriașă:</strong> Peste 50,000 de joburi disponibile în România</li>
                            <li><strong>Creativitate + logică:</strong> Combini designul cu programarea</li>
                            <li><strong>Progres rapid:</strong> Poți avea primul job în 6-12 luni de învățare</li>
                            <li><strong>Carieră stabilă:</strong> Domeniul va continua să crească următorii 10+ ani</li>
                        </ul>
                    </div>

                    <div class="sModalCTA">
                        <p><strong>Pregătit să începi aventura?</strong> <a href="#sLeadCaptureForm" class="sModalLink" data-bs-dismiss="modal">Descarcă ghidul gratuit</a> și descoperă cum să faci primul pas către o carieră în tech!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- AI Modal -->
    <div class="modal fade" id="aiModal" tabindex="-1" aria-labelledby="aiModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content sModalContent">
                <div class="modal-header sModalHeader">
                    <h5 class="modal-title sModalTitle" id="aiModalLabel">
                        <i class="bi bi-robot me-2"></i>
                        Inteligența Artificială în 2024
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body sModalBody">
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🤖 Ce este Inteligența Artificială?</h6>
                        <p>Inteligența Artificială (AI) este tehnologia care permite computerelor să "gândească", să învețe și să ia decizii asemănătoare cu oamenii. Include machine learning, procesarea limbajului natural, automatizări inteligente și mult mai mult.</p>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🚀 De ce să înveți AI chiar acum?</h6>
                        <ul class="sModalList">
                            <li><strong>Revoluția digitală:</strong> AI transformă radical toate industriile existente</li>
                            <li><strong>Eficiență incredibilă:</strong> Automatizezi ore întregi de muncă în minute</li>
                            <li><strong>Salarii premium:</strong> Specialiștii AI câștigă cu 30-50% mai mult</li>
                            <li><strong>Viitorul muncii:</strong> Companiile se luptă să găsească experți AI</li>
                            <li><strong>Creativitate amplificată:</strong> AI te ajută să creezi lucruri mult mai rapid</li>
                        </ul>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">💡 De ce AI + Dezvoltare Web = Combinația perfectă?</h6>
                        <ul class="sModalList">
                            <li><strong>Platformă ideală:</strong> Web-ul este cel mai bun loc pentru aplicații AI</li>
                            <li><strong>Chatbots inteligenți:</strong> Integrezi AI direct în site-uri și aplicații</li>
                            <li><strong>Personalizare avansată:</strong> Creezi experiențe unice pentru fiecare utilizator</li>
                            <li><strong>Analiză în timp real:</strong> Web apps care analizează și învață constant</li>
                            <li><strong>Automatizări smart:</strong> Site-uri care se optimizează singure</li>
                            <li><strong>Oportunități nelimitate:</strong> Combini puterea AI cu accesibilitatea web-ului</li>
                        </ul>
                    </div>

                    <div class="sModalCTA">
                        <p><strong>Vrei să domeni viitorul tehnologiei?</strong> <a href="#sLeadCaptureForm" class="sModalLink" data-bs-dismiss="modal">Accesează workshop-ul gratuit</a> și învață să combini AI cu web development!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- VibeCoding Modal -->
    <div class="modal fade" id="vibecodingModal" tabindex="-1" aria-labelledby="vibecodingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content sModalContent">
                <div class="modal-header sModalHeader">
                    <h5 class="modal-title sModalTitle" id="vibecodingModalLabel">
                        <i class="bi bi-lightning-charge me-2"></i>
                        Ce este VibeCoding?
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body sModalBody">
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">✨ VibeCoding - Filosofia noastră</h6>
                        <p><strong>VibeCoding</strong> înseamnă să înveți programarea cu <em>pasiune</em>, <em>energie pozitivă</em> și <em>conexiune reală</em> cu tehnologia. Nu este doar despre a scrie cod - este despre a crea cu bucurie și a-ți transforma visurile în realitate digitală!</p>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🎯 Metoda VibeCoding - Cum te învățăm diferit</h6>
                        <ul class="sModalList">
                            <li><strong>Învățare prin practică:</strong> 80% practică, 20% teorie - construiești în timp real</li>
                            <li><strong>Proiecte din lumea reală:</strong> Creezi aplicații pe care le poți pune în CV</li>
                            <li><strong>Feedback instant:</strong> Primești ghidare pas cu pas în timp real</li>
                            <li><strong>Comunitate activă:</strong> Înveți alături de colegi motivați și pricepuți</li>
                            <li><strong>Mentorat personal:</strong> Fiecare cursant primește atenție individualizată</li>
                        </ul>
                    </div>
                    
                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🚀 Ce vei stăpâni în VibeCoding</h6>
                        <ul class="sModalList">
                            <li><strong>Dezvoltare Web:</strong> <a href="#sWebDevModal" class="sModalLink" onclick="openWebDevModal()">HTML, CSS, JavaScript</a></li>
                            <li><strong>Inteligență Artificială:</strong> <a href="#sAIModal" class="sModalLink" onclick="openAIModal()">Claude, ChatGPT, automatizări</a></li>
                            <li><strong>Full-Stack Development:</strong> Frontend</li>
                            <li><strong>Tools moderne:</strong> Git, Cursor AI, optimizare</li>
                            <li><strong>Soft skills cruciale:</strong> Problem solving, comunicare tehnică, teamwork</li>
                        </ul>
                    </div>

                    <div class="sModalSection">
                        <h6 class="sModalSubtitle">🎁 Ce primești GRATUIT acum?</h6>
                        <ul class="sModalList">
                            <li>✅ Workshop-ul complet VibeCoding (3+ ore de conținut premium)</li>
                            <li>✅ Ghidul "5 lucruri esențiale de știut înainte să înveți programare"</li>
                        </ul>
                        <h6 class="sModalSubtitle">🎁 Ce primești GRATUIT la finalul Workshop-ului</h6>
                        <ul class="sModalList">
                            <li>✅ Materialul video de la Workshop - Inregistrare completa</li>
                            <li>✅ Roadmap personalizat pentru primul tău job în tech</li>
                            <li>✅ Acces la comunitatea privată VibeCoding (Whatsapp)</li>
                            <li>✅ Template-uri și cod sursă pentru 10 proiecte de început</li>
                        </ul>
                    </div>

                    <div class="sModalCTA">
                        <p><strong>Gata să începi călătoria VibeCoding?</strong> <a href="#sLeadCaptureForm" class="sModalLink" data-bs-dismiss="modal">Accesează workshop-ul gratuit</a> și transformă-ți pasiunea pentru tehnologie într-o carieră de succes!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html> 