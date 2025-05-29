$(document).ready(function() {
    // Sticky header
    const header = $('.site-header');
    const headerHeight = header.outerHeight();
    let lastScroll = 0;

    $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        
        // Add solid background after scrolling
        if (currentScroll > 10) {
            header.css('background', 'var(--deep-blue)');
        } else {
            header.css('background', 'rgba(10, 12, 16, 0.8)');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            header.css('transform', 'translateY(-100%)');
        } else {
            header.css('transform', 'translateY(0)');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll to sections
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 600, 'easeInOutCubic');
        }
    });

    // Code tabs
    $('.window-tabs .tab').on('click', function() {
        const $this = $(this);
        const isActive = $this.hasClass('active');
        
        if (!isActive) {
            $('.window-tabs .tab').removeClass('active');
            $this.addClass('active');
            
            // Here you would typically switch the code content
            // For demo purposes, we'll just add a fade effect
            $('.code-content').fadeOut(200).fadeIn(200);
        }
    });

    // Pricing toggle
    $('.toggle-btn').on('click', function() {
        const $this = $(this);
        const isActive = $this.hasClass('active');
        
        if (!isActive) {
            $('.toggle-btn').removeClass('active');
            $this.addClass('active');
            
            // Here you would typically switch the pricing content
            $('.pricing-grid').fadeOut(200).fadeIn(200);
        }
    });

    // Fade in elements on scroll
    const fadeElements = $('.hero-content, .feature-card, .pricing-card');
    
    function checkFade() {
        const windowHeight = $(window).height();
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + windowHeight;

        fadeElements.each(function() {
            const element = $(this);
            const elementTop = element.offset().top;
            
            if (elementTop <= windowBottom - 100) {
                element.addClass('fade-in');
            }
        });
    }

    // Initial check
    checkFade();
    
    // Check on scroll
    $(window).scroll($.throttle(100, checkFade));

    // Add custom easing
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
}); 