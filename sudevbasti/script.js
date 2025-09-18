// Portfolio JavaScript - Interactive Features and Animations

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeChatWidget();
    initializeParticles();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation Features
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .education-card, .cert-card, .about-card, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.textContent);
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 40);
}



// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', data);
        });
    }
}

// Chat Widget
function initializeChatWidget() {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWidget = document.getElementById('chat-widget');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatToggle = document.getElementById('chat-toggle');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Toggle chat widget
    chatTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        chatWidget.classList.add('active');
        chatOverlay.classList.add('active');
        document.body.classList.add('chat-open');
        chatTrigger.style.display = 'none';
        // Focus on input when opened
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    });
    
    // Close chat widget
    function closeChatWidget() {
        chatWidget.classList.remove('active');
        chatOverlay.classList.remove('active');
        document.body.classList.remove('chat-open');
        chatTrigger.style.display = 'block';
    }
    
    chatToggle.addEventListener('click', closeChatWidget);
    
    // Close when clicking overlay
    chatOverlay.addEventListener('click', closeChatWidget);
    
    // Prevent chat widget from closing when clicking inside it
    chatWidget.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate bot response based on user message
    function generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Resume data for AI responses
        const resumeData = {
            projects: [
                "Network Intrusion Detection Using ML - ML model to detect and classify network intrusions",
                "AI-Based Indian Road Pothole Detection - 92% accuracy with reduced false positives",
                "Hate Speech Detection Using Machine Learning - 3rd place in ICON 2024",
                "Law GPT - LLM-powered Indian legal assistant with 158K+ legal records"
            ],
            skills: [
                "Python", "Java", "SQL", "C", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV",
                "Android Studio", "Firebase", "Railway", "VS Code"
            ],
            education: [
                "B.E. in Artificial Intelligence and Machine Learning at SDM College of Engineering and Technology, Dharwad (CGPA: 7.9)",
                "Minor in Artificial Intelligence at IIT Ropar (Nov 2024 - Dec 2025)"
            ],
            internship: "Hate Speech Detection Using Machine Learning at IIIT, Dharwad",
            contact: {
                email: "sudevbasti0717@gmail.com",
                phone: "+91 9036167707"
            }
        };
        
        // Response logic
        if (message.includes('project') || message.includes('work')) {
            return `Sudev has worked on several impressive projects:<br><br>
                    • ${resumeData.projects[0]}<br>
                    • ${resumeData.projects[1]}<br>
                    • ${resumeData.projects[2]}<br>
                    • ${resumeData.projects[3]}<br><br>
                    Would you like to know more about any specific project?`;
        }
        
        if (message.includes('skill') || message.includes('technology')) {
            return `Sudev has expertise in various technologies:<br><br>
                    <strong>Programming:</strong> ${resumeData.skills.slice(0, 4).join(', ')}<br>
                    <strong>AI/ML:</strong> ${resumeData.skills.slice(4, 8).join(', ')}<br>
                    <strong>Tools:</strong> ${resumeData.skills.slice(8).join(', ')}<br><br>
                    He specializes in Machine Learning, Deep Learning, and Web Development.`;
        }
        
        if (message.includes('education') || message.includes('study') || message.includes('college')) {
            return `Sudev's educational background:<br><br>
                    • ${resumeData.education[0]}<br>
                    • ${resumeData.education[1]}<br><br>
                    He's also completed internships and has published research in the field of AI/ML.`;
        }
        
        if (message.includes('internship') || message.includes('experience')) {
            return `Sudev has valuable research experience:<br><br>
                    <strong>IIIT, Dharwad:</strong> ${resumeData.internship}<br><br>
                    This work resulted in a published research paper and secured 3rd place in Task A of ICON 2024.`;
        }
        
        if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone')) {
            return `You can reach Sudev through:<br><br>
                    📧 Email: ${resumeData.contact.email}<br>
                    📞 Phone: ${resumeData.contact.phone}<br>
                    🔗 GitHub: github.com/sudevbasti<br><br>
                    Feel free to connect for opportunities or collaborations!`;
        }
        
        if (message.includes('achievement') || message.includes('award') || message.includes('recognition')) {
            return `Sudev has several notable achievements:<br><br>
                    🏆 3rd place in ICON 2024 Natural Language Processing Conference<br>
                    📄 Published research paper on hate speech detection<br>
                    🎯 Department Main Coordinator at INSIGNIA 24, SDMCET<br>
                    📚 Multiple certifications in Machine Learning and Java<br>
                    🎓 Excellent academic performance with 7.9 CGPA`;
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return `Hello! I'm here to help you learn about Sudev Basti. You can ask me about:<br><br>
                    • His projects and technical work<br>
                    • Skills and technologies he uses<br>
                    • Educational background<br>
                    • Internship and research experience<br>
                    • Contact information<br><br>
                    What would you like to know?`;
        }
        
        // Default response
        return `I'm an AI assistant trained on Sudev Basti's resume. I can help you learn about his projects, skills, education, and experience. Try asking about:<br><br>
                • "Tell me about his projects"<br>
                • "What skills does he have?"<br>
                • "What is his educational background?"<br>
                • "How can I contact him?"<br><br>
                What would you like to know?`;
    }
}

// Particle System for Hero Background
function initializeParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    resizeCanvas();
    initParticles();
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Cleanup when section is no longer visible
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && animationId) {
                cancelAnimationFrame(animationId);
            } else if (entry.isIntersecting && !animationId) {
                animateParticles();
            }
        });
    });
    
    intersectionObserver.observe(heroSection);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Smooth scroll for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Theme toggle functionality (if needed)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Initialize theme toggle if element exists
safeQuerySelector('#theme-toggle', initializeThemeToggle);

console.log('Portfolio JavaScript loaded successfully!');