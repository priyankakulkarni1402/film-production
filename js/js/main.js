// MyFilmProduction - Main JavaScript
(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initAnimations();
        initScrollEffects();
        initFormHandlers();
        initCustomCursor();
        initParallax();
        initProgressBars();
        initNotifications();
    });

    // Navigation System
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Animate hamburger menu
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    if (navToggle.classList.contains('active')) {
                        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) bar.style.opacity = '0';
                        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    }
                });
            });
        }

        // Close mobile menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            });
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });

        // Dropdown close on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item')) {
                const dropdowns = document.querySelectorAll('.dropdown-content');
                dropdowns.forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
            }
        });
    }

    // Animation System
    function initAnimations() {
        // Stagger children animation
        const staggerContainers = document.querySelectorAll('.stagger-children');
        staggerContainers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Hover effects for cards
        const cards = document.querySelectorAll('.service-card, .portfolio-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover-lift');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-lift');
            });
        });

        // Button interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Typewriter effect for hero titles
        const typewriterElements = document.querySelectorAll('.typewriter');
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            setTimeout(typeWriter, 1000);
        });
    }

    // Scroll Effects
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger progress bars when they come into view
                    if (entry.target.classList.contains('progress-bar')) {
                        const fill = entry.target.querySelector('.progress-fill');
                        if (fill) {
                            const percentage = fill.getAttribute('data-percentage') || '100';
                            setTimeout(() => {
                                fill.style.width = percentage + '%';
                            }, 200);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe all animate-on-scroll elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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
    }

    // Custom Cursor
    function initCustomCursor() {
        // Only add custom cursor on desktop
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
            });

            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    cursor.classList.add('cursor-grow');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursor.classList.remove('cursor-grow');
                });
            });
        }
    }

    // Parallax Effects
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
            });
        }
    }

    // Progress Bars
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            bar.setAttribute('data-percentage', percentage);
            bar.style.width = '0%';
        });
    }

    // Form Handlers
    function initFormHandlers() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });

        // Form field animations
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });
    }

    // Notification System
    function initNotifications() {
        window.showNotification = function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        };
    }

    // Utility Functions
    window.utils = {
        // Debounce function
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Smooth scroll to element
        scrollToElement: function(element, offset = 0) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        },

        // Get element position relative to viewport
        getElementPosition: function(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset,
                width: rect.width,
                height: rect.height
            };
        }
    };

    // Page Loading Effects
    window.addEventListener('load', function() {
        const body = document.body;
        body.classList.add('loaded');
        
        // Remove loading states
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.classList.remove('loading');
        });
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible
            document.body.classList.remove('page-hidden');
        }
    });

    // Responsive video handling
    function initResponsiveVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Pause video when not in viewport
            const videoObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            });
            
            videoObserver.observe(video);
        });
    }

    // Initialize responsive videos
    initResponsiveVideos();

})();