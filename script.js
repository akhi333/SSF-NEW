// Auto-sliding hero section
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Testimonials slider
let currentTestimonialSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const totalTestimonials = testimonials.length;

// Mobile Clients Carousel
let currentClientSlide = 0;
const clientSlides = document.querySelectorAll('.carousel-slide');
const clientIndicators = document.querySelectorAll('.indicator');
const totalClientSlides = clientSlides.length;

// Auto-slide functionality
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
}

function currentSlideFunc(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Auto-advance slides every 3 seconds
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 3000);

// Testimonials functionality
function showTestimonial(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    if (n >= totalTestimonials) currentTestimonialSlide = 0;
    if (n < 0) currentTestimonialSlide = totalTestimonials - 1;
    
    testimonials[currentTestimonialSlide].classList.add('active');
    testimonialDots[currentTestimonialSlide].classList.add('active');
}

function currentTestimonial(n) {
    currentTestimonialSlide = n - 1;
    showTestimonial(currentTestimonialSlide);
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    currentTestimonialSlide++;
    showTestimonial(currentTestimonialSlide);
}, 5000);

// Mobile Clients Carousel Functions
function showClientSlide(n) {
    // Hide all slides
    clientSlides.forEach(slide => slide.classList.remove('active'));
    clientIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (n >= totalClientSlides) currentClientSlide = 0;
    if (n < 0) currentClientSlide = totalClientSlides - 1;
    
    clientSlides[currentClientSlide].classList.add('active');
    clientIndicators[currentClientSlide].classList.add('active');
    
    // Move carousel track
    const carouselTrack = document.getElementById('clientCarousel');
    if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${currentClientSlide * 100}%)`;
    }
}

function nextClientSlide() {
    currentClientSlide++;
    showClientSlide(currentClientSlide);
}

function prevClientSlide() {
    currentClientSlide--;
    showClientSlide(currentClientSlide);
}

function goToClientSlide(n) {
    currentClientSlide = n;
    showClientSlide(currentClientSlide);
}

// Auto-advance client carousel every 3 seconds
setInterval(() => {
    if (window.innerWidth <= 767) { // Only on mobile
        nextClientSlide();
    }
}, 3000);

// Leadership Card Flip Function
function flipCard(card) {
    card.classList.toggle('flipped');
}


// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Intersection Observer for statistics animation
const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for internal links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
            // For external links (like about.html), let the browser handle the navigation
        });
    });
}

// Contact form functionality
function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !phone || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
    closeContactForm();
}

// Simple approach to ensure header stays fixed
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.fixed-header');
    const contactBar = document.querySelector('.top-contact-bar');
    
    // Force fixed positioning
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '40px';
        header.style.left = '0';
        header.style.right = '0';
        header.style.width = '100%';
        header.style.zIndex = '1002';
    }
    
    if (contactBar) {
        contactBar.style.position = 'fixed';
        contactBar.style.top = '0';
        contactBar.style.left = '0';
        contactBar.style.right = '0';
        contactBar.style.width = '100%';
        contactBar.style.zIndex = '1001';
    }
    
    // Mobile Menu Toggle Functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mainNav = document.querySelector('#mainNav');
    
    if (navbarToggler && mainNav) {
        navbarToggler.addEventListener('click', function() {
            // Toggle the active class on the hamburger button
            this.classList.toggle('active');
            
            // Toggle the show class on the navigation
            mainNav.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close the mobile menu
                navbarToggler.classList.remove('active');
                mainNav.classList.remove('show');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarToggler.contains(event.target) && !mainNav.contains(event.target)) {
                navbarToggler.classList.remove('active');
                mainNav.classList.remove('show');
            }
        });
    }
    
    // Mobile Clients Carousel Event Listeners
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToClientSlide(index);
        });
    });
    
    // Initialize client carousel
    if (window.innerWidth <= 767) {
        showClientSlide(0);
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
});

// Add intersection observer for nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-call functionality for phone numbers
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('.contact-info p');
    
    phoneNumbers.forEach(phoneElement => {
        const text = phoneElement.textContent;
        if (text.includes('+91')) {
            phoneElement.style.cursor = 'pointer';
            phoneElement.addEventListener('click', function() {
                const phoneNumber = text.replace(/\D/g, '');
                window.open(`tel:+${phoneNumber}`);
            });
        }
    });
});

// Add email click functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.querySelector('.contact-info p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            const email = emailElement.textContent.trim();
            window.open(`mailto:${email}`);
        });
    }
});

// Add smooth reveal animation for elements
const revealElements = document.querySelectorAll('.service-card, .client-logo, .welcome-content');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Add keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('contactModal');
    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeContactForm();
        }
    }
});

// Add form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

