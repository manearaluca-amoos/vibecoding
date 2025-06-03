// Minified JS - Essential functionality only
(function(){
    'use strict';
    
    // Modal functionality
    function openModal(modalId){
        const modal=document.getElementById(modalId);
        if(modal){
            modal.classList.add('show');
            document.body.style.overflow='hidden';
        }
    }
    
    function closeModal(modalId){
        const modal=document.getElementById(modalId);
        if(modal){
            modal.classList.remove('show');
            document.body.style.overflow='auto';
        }
    }
    
    // Form handling
    function handleFormSubmit(formId,successMessage){
        const form=document.getElementById(formId);
        if(!form)return;
        
        form.addEventListener('submit',function(e){
            e.preventDefault();
            const email=form.querySelector('input[type="email"]').value;
            
            if(email){
                // Simple validation
                if(!/\S+@\S+\.\S+/.test(email)){
                    alert('Te rog să introduci o adresă de email validă.');
                    return;
                }
                
                // Show success message
                alert(successMessage||'Mulțumim! Te vom contacta în curând.');
                form.reset();
                
                // Close modal if in one
                const modal=form.closest('.modal');
                if(modal){
                    modal.classList.remove('show');
                    document.body.style.overflow='auto';
                }
            }
        });
    }
    
    // Initialize when DOM loaded
    document.addEventListener('DOMContentLoaded',function(){
        // Close modals on outside click
        document.addEventListener('click',function(e){
            if(e.target.classList.contains('modal')){
                e.target.classList.remove('show');
                document.body.style.overflow='auto';
            }
        });
        
        // Close modals on Escape key
        document.addEventListener('keydown',function(e){
            if(e.key==='Escape'){
                const openModal=document.querySelector('.modal.show');
                if(openModal){
                    openModal.classList.remove('show');
                    document.body.style.overflow='auto';
                }
            }
        });
        
        // Handle close buttons
        document.querySelectorAll('.btn-close,[data-bs-dismiss="modal"]').forEach(btn=>{
            btn.addEventListener('click',function(){
                const modal=this.closest('.modal');
                if(modal){
                    modal.classList.remove('show');
                    document.body.style.overflow='auto';
                }
            });
        });
        
        // Handle modal triggers
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn=>{
            btn.addEventListener('click',function(e){
                e.preventDefault();
                const targetModal=this.getAttribute('data-bs-target');
                if(targetModal){
                    openModal(targetModal.replace('#',''));
                }
            });
        });
        
        // Initialize forms
        handleFormSubmit('contactForm','Mulțumim pentru mesaj! Te vom contacta în curând.');
        handleFormSubmit('wordpressEmailForm','Perfect! Vei primi detaliile despre workshop în 24h.');
        handleFormSubmit('vibeCodingEmailForm','Ai fost adăugat pe lista de așteptare! Vei fi primul notificat.');
        handleFormSubmit('signupWordpressForm','Te-ai înscris cu succes! Vei primi detaliile în 24h.');
        handleFormSubmit('signupVibeCodingForm','Ești pe lista de așteptare! Te anunțăm când pornim.');
        
        // Lazy load images
        const lazyImages=document.querySelectorAll('img[data-src]');
        if('IntersectionObserver' in window){
            const imageObserver=new IntersectionObserver((entries)=>{
                entries.forEach(entry=>{
                    if(entry.isIntersecting){
                        const img=entry.target;
                        img.src=img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img=>imageObserver.observe(img));
        }else{
            // Fallback for older browsers
            lazyImages.forEach(img=>{
                img.src=img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
            anchor.addEventListener('click',function(e){
                e.preventDefault();
                const targetId=this.getAttribute('href').substring(1);
                const targetElement=document.getElementById(targetId);
                
                if(targetElement){
                    const navHeight=document.querySelector('.navbar')?.offsetHeight||0;
                    const targetPosition=targetElement.offsetTop-navHeight;
                    
                    window.scrollTo({
                        top:targetPosition,
                        behavior:'smooth'
                    });
                }
            });
        });
        
        // Navbar scroll effect
        let lastScrollTop=0;
        const navbar=document.querySelector('.navbar');
        
        window.addEventListener('scroll',function(){
            const scrollTop=window.pageYOffset||document.documentElement.scrollTop;
            
            if(navbar){
                if(scrollTop>100){
                    navbar.style.background='rgba(13, 17, 23, 0.98)';
                }else{
                    navbar.style.background='rgba(13, 17, 23, 0.95)';
                }
            }
            
            lastScrollTop=scrollTop<=0?0:scrollTop;
        });
    });
})(); 