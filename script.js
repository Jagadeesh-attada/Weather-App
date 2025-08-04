// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-progress');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.querySelector('.contact-form');

// Global Variables
let currentTestimonial = 0;
let isScrolling = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupTestimonials();
    setupContactForm();
    setupSmoothScrolling();
    setupParallax();
    handlePageLoad();
}

// Navigation functionality
function setupNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                scrollToSection(targetId);
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Active nav link highlighting
    window.addEventListener('scroll', highlightActiveSection);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Smooth scrolling functionality
function setupSmoothScrolling() {
    // Handle all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll animations and effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(handleScrollAnimation, observerOptions);
    
    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        scrollObserver.observe(section);
    });

    // Observe skill bars for animation
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        scrollObserver.observe(skillsSection);
    }
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            
            // Animate stats when about section is visible
            if (entry.target.id === 'about') {
                animateStats();
            }
        }
    });
}

// Skill bars animation
function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateNumber(stat, 0, target, 2000);
    });
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Advanced animations
function setupAnimations() {
    // Hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', handleProjectHover);
        card.addEventListener('mouseleave', handleProjectLeave);
    });

    // Tech icons hover effects
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', handleTechIconHover);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
    });
}

function handleProjectHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-15px) rotateX(5deg)';
    card.style.transition = 'all 0.3s ease';
}

function handleProjectLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) rotateX(0)';
}

function handleTechIconHover(e) {
    const icon = e.currentTarget;
    const iconElement = icon.querySelector('i');
    iconElement.style.transform = 'scale(1.2) rotate(360deg)';
    iconElement.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        iconElement.style.transform = 'scale(1.1)';
    }, 500);
}

function handleButtonHover(e) {
    const button = e.currentTarget;
    if (button.classList.contains('btn-primary')) {
        button.style.boxShadow = '0 12px 35px rgba(100, 255, 218, 0.5)';
    }
}

// Testimonials slider functionality
function setupTestimonials() {
    if (testimonials.length === 0) return;

    // Initialize first testimonial
    showTestimonial(0);

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', previousTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    const testimonialTrack = document.querySelector('.testimonial-track');
    if (testimonialTrack) {
        testimonialTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
        testimonialTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                previousTestimonial();
            }
        }
    }
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });

    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show selected testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }

    // Activate corresponding dot
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }

    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

function previousTestimonial() {
    const prev = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    showTestimonial(prev);
}

// Contact form functionality
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] = formData.entries()) {
        formObject[key] = value;
    }

    // Validate form
    if (validateForm(formObject)) {
        submitForm(formObject);
    }
}

function validateForm(data) {
    let isValid = true;
    const errors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }

    // Subject validation
    if (!data.subject || data.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters long';
        isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
        isValid = false;
    }

    // Display errors
    displayFormErrors(errors);

    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let error = '';

    switch (field.name) {
        case 'name':
            if (value.length < 2) error = 'Name must be at least 2 characters long';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = 'Please enter a valid email address';
            break;
        case 'subject':
            if (value.length < 3) error = 'Subject must be at least 3 characters long';
            break;
        case 'message':
            if (value.length < 10) error = 'Message must be at least 10 characters long';
            break;
    }

    displayFieldError(field, error);
}

function clearFieldError(e) {
    const field = e.target;
    displayFieldError(field, '');
}

function displayFieldError(field, error) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error if exists
    if (error) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = error;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ff6b6b';
    } else {
        field.style.borderColor = 'rgba(100, 255, 218, 0.3)';
    }
}

function displayFormErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            displayFieldError(field, errors[fieldName]);
        }
    });
}

function submitForm(formData) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Clear any existing errors
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Reset field styles
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.style.borderColor = 'rgba(100, 255, 218, 0.3)';
        });
        
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax effects
function setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
            
            isScrolling = false;
        });
    });

    // Add parallax class to hero elements
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('parallax');
    }
}

// Page load animations
function handlePageLoad() {
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Animate hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
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
}

// Performance optimizations
window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
window.addEventListener('resize', debounce(() => {
    // Handle resize events
    closeMobileMenu();
}, 250));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for testimonial navigation
    if (testimonials.length > 0) {
        if (e.key === 'ArrowLeft') {
            previousTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    }
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Console message for developers
console.log('%c🚀 Portfolio Website by Alex Chen', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #8892b0; font-size: 12px;');