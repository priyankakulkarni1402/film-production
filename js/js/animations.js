// MyFilmProduction - Advanced Animations
(function() {
    'use strict';

    class AnimationController {
        constructor() {
            this.observers = [];
            this.animationQueue = [];
            this.isInitialized = false;
        }

        init() {
            if (this.isInitialized) return;
            
            this.initScrollAnimations();
            this.initHoverAnimations();
            this.initTypingAnimations();
            this.initMorphingAnimations();
            this.initParticleSystem();
            this.initCountUpAnimations();
            this.initImageSequence();
            
            this.isInitialized = true;
        }

        // Advanced scroll animations
        initScrollAnimations() {
            const animateElements = document.querySelectorAll('[data-animate]');
            
            animateElements.forEach(element => {
                const animationType = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || 0;
                const duration = element.getAttribute('data-duration') || 1000;

                // Add to animation queue
                this.animationQueue.push({
                    element,
                    animationType,
                    delay: parseInt(delay),
                    duration: parseInt(duration)
                });
            });

            this.processAnimationQueue();
        }

        processAnimationQueue() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animationData = this.animationQueue.find(item => item.element === element);
                        
                        if (animationData) {
                            setTimeout(() => {
                                this.triggerAnimation(element, animationData.animationType);
                            }, animationData.delay);
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.animationQueue.forEach(item => {
                observer.observe(item.element);
            });

            this.observers.push(observer);
        }

        triggerAnimation(element, type) {
            element.classList.add('animate', `animate-${type}`);
            
            // Add specific animation classes
            switch(type) {
                case 'fadeIn':
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'all 0.8s ease-out';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                    break;
                    
                case 'slideInLeft':
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-50px)';
                    element.style.transition = 'all 0.8s ease-out';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    });
                    break;
                    
                case 'slideInRight':
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(50px)';
                    element.style.transition = 'all 0.8s ease-out';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    });
                    break;
                    
                case 'scaleIn':
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.8)';
                    element.style.transition = 'all 0.6s ease-out';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    });
                    break;
                    
                case 'rotateIn':
                    element.style.opacity = '0';
                    element.style.transform = 'rotate(-10deg) scale(0.9)';
                    element.style.transition = 'all 0.8s ease-out';
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'rotate(0deg) scale(1)';
                    });
                    break;
            }
        }

        // Advanced hover animations
        initHoverAnimations() {
            // Tilt effect for cards
            const tiltCards = document.querySelectorAll('[data-tilt]');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                });
            });

            // Magnetic effect for buttons
            const magneticElements = document.querySelectorAll('[data-magnetic]');
            magneticElements.forEach(element => {
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translate(0px, 0px)';
                });
            });
        }

        // Typing animations
        initTypingAnimations() {
            const typingElements = document.querySelectorAll('[data-typing]');
            
            typingElements.forEach(element => {
                const text = element.getAttribute('data-typing');
                const speed = parseInt(element.getAttribute('data-speed')) || 50;
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    this.typeText(element, text, speed);
                }, delay);
            });
        }

        typeText(element, text, speed) {
            element.textContent = '';
            let i = 0;
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.add('typing-complete');
                }
            };
            
            type();
        }

        // Morphing animations
        initMorphingAnimations() {
            const morphingElements = document.querySelectorAll('[data-morph]');
            
            morphingElements.forEach(element => {
                const targetShape = element.getAttribute('data-morph');
                element.addEventListener('click', () => {
                    this.morphElement(element, targetShape);
                });
            });
        }

        morphElement(element, targetShape) {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.borderRadius = targetShape;
        }

        // Particle system
        initParticleSystem() {
            const particleContainers = document.querySelectorAll('[data-particles]');
            
            particleContainers.forEach(container => {
                this.createParticles(container);
            });
        }

        createParticles(container) {
            const particleCount = parseInt(container.getAttribute('data-particles')) || 50;
            const colors = ['#216BFF', '#FF8A00', '#E5E7EB'];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 1}px;
                    height: ${Math.random() * 4 + 1}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: ${Math.random() * 0.6 + 0.2};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 5}s;
                `;
                
                container.appendChild(particle);
            }
        }

        // Count up animations
        initCountUpAnimations() {
            const countElements = document.querySelectorAll('[data-count]');
            
            const countObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.getAttribute('data-count'));
                        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
                        
                        this.countUp(element, target, duration);
                        countObserver.unobserve(element);
                    }
                });
            });
            
            countElements.forEach(element => {
                countObserver.observe(element);
            });
        }

        countUp(element, target, duration) {
            let start = 0;
            const startTime = performance.now();
            
            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };
            
            requestAnimationFrame(update);
        }

        // Image sequence animations
        initImageSequence() {
            const sequences = document.querySelectorAll('[data-sequence]');
            
            sequences.forEach(sequence => {
                const images = sequence.querySelectorAll('img');
                let currentIndex = 0;
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.playImageSequence(images, currentIndex);
                        }
                    });
                });
                
                observer.observe(sequence);
            });
        }

        playImageSequence(images, startIndex) {
            let index = startIndex;
            
            const showNext = () => {
                images.forEach(img => img.style.opacity = '0.3');
                if (images[index]) {
                    images[index].style.opacity = '1';
                    index = (index + 1) % images.length;
                    setTimeout(showNext, 200);
                }
            };
            
            showNext();
        }

        // Cleanup observers
        destroy() {
            this.observers.forEach(observer => {
                observer.disconnect();
            });
            this.observers = [];
            this.animationQueue = [];
            this.isInitialized = false;
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const animationController = new AnimationController();
        animationController.init();
        
        // Make it globally available
        window.AnimationController = animationController;
    });

    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            z-index: 1;
        }
        
        .animate-typing {
            border-right: 2px solid var(--accent-500);
            white-space: nowrap;
            overflow: hidden;
        }
        
        .typing-complete {
            border-right: none;
        }
        
        .animate-tilt {
            transition: transform 0.1s ease-out;
            transform-style: preserve-3d;
        }
        
        .animate-magnetic {
            transition: transform 0.1s ease-out;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        @keyframes shimmer {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
        
        .shimmer {
            position: relative;
            overflow: hidden;
        }
        
        .shimmer::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shimmer 2s infinite;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .morph-hover {
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .morph-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);

})();