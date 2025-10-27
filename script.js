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
        
        // Comprehensive resume data for AI responses based on the detailed system prompt
        const resumeData = {
            name: "SUDEV BASTI",
            title: "B.E. AIML Engineering Student",
            email: "sudevbasti0717@gmail.com",
            github: "github.com/sudevbasti",
            phone: "+91 9036167707",
            location: "Hubballi, India",
            summary: "B.E. AIML engineering student with hands-on experience in Python, SQL, and ML frameworks through academic projects and internships. Passionate about building scalable AI solutions and eager to contribute to impactful projects across domains.",
            
            education: [
                {
                    institution: "SDM College of Engineering and Technology, Dharwad",
                    degree: "B.E. in Artificial Intelligence and Machine Learning",
                    duration: "2022-2026",
                    cgpa: "7.9 (As of 6th semester)"
                },
                {
                    institution: "Indian Institute of Technology (IIT), Ropar",
                    program: "Minor in Artificial Intelligence",
                    duration: "NOV 2024 – DEC 2025",
                    email: "24102162@scale.iitrpr.ac.in"
                }
            ],
            
            skills: {
                programming: ["Python", "C", "SQL", "Java"],
                ml_dl: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "YOLOv8", "CNN", "LSTM", "Transformers"],
                platforms: ["Android Studio", "Firebase", "Railway", "VS Code", "Flask", "FastAPI", "React", "Docker"],
                specializations: ["Prompt Engineering", "RAG Pipelines", "Real-time Detection", "Multilingual AI", "Network Security AI"],
                domains: ["Web Development", "Android Development", "Machine Learning", "Deep Learning", "API Integration", "Computer Vision", "NLP"],
                languages: ["English", "Kannada", "Hindi"]
            },
            
            projects: [
                {
                    name: "Network Intrusion Detection System (NIDS)",
                    type: "AI-Powered Cybersecurity System",
                    brief: "Developed an AI-driven NIDS combining CNN + LSTM models for real-time cyberattack detection. Achieved 96% accuracy with Flask API + interactive dashboard.",
                    medium: "Addressed traditional IDS limitations using AI/ML for detecting known and unknown network intrusions. Used NSL-KDD and CICIDS datasets with CNN-LSTM hybrid architecture for spatial + temporal pattern detection. Flask-based API enabled real-time traffic monitoring. Achieved 96% accuracy, handling 1M+ records with <100ms latency.",
                    detailed: "Datasets: NSL-KDD, KDD Cup 1999, CICIDS. Architecture: Hybrid CNN-LSTM with hyperparameter tuning. Performance: 96% accuracy, >90% precision/recall for DoS attacks, <100ms latency. Deployment: Flask API, real-time dashboard, 1M+ record scalability. Challenges: Class imbalance for rare attacks (R2L, U2R), false positives. Future Work: SMOTE implementation, CNN-RNN hybrids, adversarial robustness."
                },
                {
                    name: "AI-Based Indian Road Pothole Detection",
                    type: "Computer Vision + Deep Learning System",
                    brief: "Built hybrid YOLOv8 + CNN + Transformer model for Indian road pothole detection. Custom dataset (2,000+ images) achieved 92% accuracy vs 60% with foreign datasets.",
                    medium: "Created custom Indian dataset via web scraping with 20+ region-specific keywords to handle shadows, water patches, and irregular textures. Hybrid model combined YOLOv8 for real-time detection, CNN for spatial features, and Transformers for contextual awareness. Achieved 92% accuracy with significantly reduced false positives compared to foreign-trained models.",
                    detailed: "Dataset: 2,000+ images via web scraping (Google, Bing, Flickr) with region-specific keywords. Model: YOLOv8 + CNN + Transformer hybrid architecture. Training: Google Colab GPU, batch size 32, 50 epochs, Adam optimizer. Performance: 92% accuracy (vs 60% foreign), high IoU scores, multiple pothole detection. Evaluation: Accuracy, Precision, Recall, F1-score, IoU metrics. Future Work: Mobile deployment, municipal road monitoring integration."
                },
                {
                    name: "Hate Speech Detection (ICON 2024 - 3rd Place)",
                    type: "Multilingual NLP + Research Publication",
                    brief: "Developed multilingual hate speech detection for Hindi-English code-mixed social media text. Used TF-IDF, Random Forest, SMOTE. Secured 3rd place in ICON 2024 Task A.",
                    medium: "Tackled hate speech and fake narrative detection in Hindi-English code-mixed text using TF-IDF vectorization, Random Forest classifiers, and SMOTE for class imbalance. Achieved 78% accuracy for fake news and 77%+ F1 score for hate speech detection. Also classified target and severity levels.",
                    detailed: "Dataset: 6,397 training tweets, 801 validation, 801 test (Hindi-English code-mixed). Preprocessing: URL/hashtag removal, tokenization, stopword removal. Features: TF-IDF (unigrams + bigrams), text length features. Model: Random Forest (Hate-FakeNet) with SMOTE + class weighting. Results: 75.7% accuracy, 3rd place ICON 2024 Task A, 13th place Task B. Publication: Research paper in ICON 2024 proceedings."
                },
                {
                    name: "LAW GPT 2.0 - LLM-Powered Indian Legal RAG Chatbot",
                    type: "Production-Ready Multilingual AI System",
                    brief: "Developing an AI-powered Indian Legal RAG Chatbot using Triple API integration, indexing over 1,02,000 legal documents with automated IPC handling, legal context extraction, optimized prompt workflows, and failover-safe API orchestration for scalable and reliable deployment.",
                    medium: "Advanced legal AI system with Python FastAPI backend, React frontend, and Google Gemini AI integration. Implements RAG pipeline with Triple API integration for processing over 1,02,000 legal documents. Features automated IPC handling, legal context extraction, optimized prompt workflows, and failover-safe API orchestration. Supports 12 Indian languages with confidence-based responses and legal citations.",
                    detailed: "Architecture: FastAPI backend + React frontend + Google Gemini AI. Database: 1,02,000+ legal records from web-scraped sources (LawRato, Kanoon). Features: Triple API integration, automated IPC handling, legal context extraction, optimized prompt workflows, failover-safe API orchestration. Languages: 12 Indian languages including English, Hindi, Tamil, Bengali. Performance: 90%+ English accuracy, 80%+ Hindi accuracy, <5s response time. Deployment: Live at law-gpt-professional.web.app, Railway + Firebase. Coverage: Constitutional, Criminal, Civil, Family, Corporate, Consumer Law. Future: Document upload, voice interaction, mobile app, multi-jurisdiction."
                }
            ],
            
            internship: {
                company: "IIIT, Dharwad",
                role: "Machine Learning Intern",
                project: "Hate Speech Detection Using Machine Learning",
                achievements: ["3rd place in ICON 2024 Task A", "Research paper published"]
            },
            
            achievements: [
                "ICON 2024 - 3rd Place in Task A (Hate Speech Detection)",
                "ICON 2024 - 13th Place in Task B (Target and Severity Prediction)",
                "Research paper on Hate Speech Detection published in ICON 2024 proceedings",
                "Department Main Coordinator, INSIGNIA 24, SDMCET",
                "Volunteer Trainer for NMMS Scholarship Exam, Gurukul Government High School"
            ]
        };
        
        // Response logic with detailed information
        if (message.includes('project') || message.includes('work')) {
            if (message.includes('network') || message.includes('intrusion') || message.includes('cybersecurity') || message.includes('nids')) {
                const project = resumeData.projects[0];
                if (message.includes('detail') || message.includes('architecture') || message.includes('technical')) {
                    return `${project.name} - Detailed Technical Information:<br><br>
                            <strong>Type:</strong> ${project.type}<br>
                            <strong>Technical Specifications:</strong><br>
                            ${project.detailed.replace(/\n/g, '<br>')}`;
                } else if (message.includes('medium') || message.includes('explain')) {
                    return `${project.name}:<br><br>${project.medium}`;
                } else {
                    return `${project.name}:<br><br>${project.brief}<br><br>
                            Would you like more technical details about this project?`;
                }
            } else if (message.includes('pothole') || message.includes('road')) {
                const project = resumeData.projects[1];
                if (message.includes('detail') || message.includes('architecture') || message.includes('technical')) {
                    return `${project.name} - Detailed Technical Information:<br><br>
                            <strong>Type:</strong> ${project.type}<br>
                            <strong>Technical Specifications:</strong><br>
                            ${project.detailed.replace(/\n/g, '<br>')}`;
                } else if (message.includes('medium') || message.includes('explain')) {
                    return `${project.name}:<br><br>${project.medium}`;
                } else {
                    return `${project.name}:<br><br>${project.brief}<br><br>
                            Would you like more technical details about this project?`;
                }
            } else if (message.includes('hate') || message.includes('speech') || message.includes('icon')) {
                const project = resumeData.projects[2];
                if (message.includes('detail') || message.includes('architecture') || message.includes('technical')) {
                    return `${project.name} - Detailed Technical Information:<br><br>
                            <strong>Type:</strong> ${project.type}<br>
                            <strong>Technical Specifications:</strong><br>
                            ${project.detailed.replace(/\n/g, '<br>')}`;
                } else if (message.includes('medium') || message.includes('explain')) {
                    return `${project.name}:<br><br>${project.medium}`;
                } else {
                    return `${project.name}:<br><br>${project.brief}<br><br>
                            Would you like more technical details about this research project?`;
                }
            } else if (message.includes('law') || message.includes('legal') || message.includes('gpt')) {
                const project = resumeData.projects[3];
                if (message.includes('detail') || message.includes('architecture') || message.includes('technical')) {
                    return `${project.name} - Detailed Technical Information:<br><br>
                            <strong>Type:</strong> ${project.type}<br>
                            <strong>Technical Specifications:</strong><br>
                            ${project.detailed.replace(/\n/g, '<br>')}`;
                } else if (message.includes('medium') || message.includes('explain')) {
                    return `${project.name}:<br><br>${project.medium}`;
                } else {
                    return `${project.name}:<br><br>${project.brief}<br><br>
                            Would you like more technical details about this AI system?`;
                }
            } else {
                // Overview of all projects
                let response = `<strong>Comprehensive Project Portfolio</strong><br><br>
                               ${resumeData.name} has successfully conceptualized, developed, and deployed multiple advanced AI/ML systems addressing real-world challenges across diverse domains:<br><br>`;
                resumeData.projects.forEach((project, index) => {
                    response += `<strong>${index + 1}. ${project.name}</strong><br>
                               <em>${project.type}</em><br>
                               ${project.brief}<br><br>`;
                });
                response += `<strong>Professional Recommendation:</strong><br>
                           For detailed technical specifications, performance metrics, and implementation insights, please request information about a specific project by name or domain area.`;
                return response;
            }
        }
        
        if (message.includes('skill') || message.includes('technology') || message.includes('expertise')) {
            if (message.includes('program') || message.includes('language')) {
                return `Sudev's Programming Skills:<br><br>
                        <strong>Languages:</strong> ${resumeData.skills.programming.join(', ')}<br><br>
                        He has extensive experience with Python for AI/ML development, C for system programming, SQL for database management, and Java for application development.`;
            } else if (message.includes('ml') || message.includes('machine learning') || message.includes('deep learning') || message.includes('ai')) {
                return `Sudev's AI/ML Framework Expertise:<br><br>
                        <strong>Frameworks & Libraries:</strong> ${resumeData.skills.ml_dl.join(', ')}<br><br>
                        He specializes in:<br>
                        • Computer Vision: OpenCV, YOLOv8 for real-time object detection<br>
                        • Deep Learning: CNN, LSTM for pattern recognition<br>
                        • NLP: Transformers for language understanding<br>
                        • ML Libraries: TensorFlow, PyTorch, Scikit-learn for model development`;
            } else if (message.includes('tool') || message.includes('platform')) {
                return `Sudev's Development Tools & Platforms:<br><br>
                        <strong>Development Tools:</strong> ${resumeData.skills.platforms.join(', ')}<br><br>
                        He has experience with:<br>
                        • Web Development: Flask, FastAPI, React<br>
                        • Mobile Development: Android Studio, Firebase<br>
                        • Deployment: Railway, Docker<br>
                        • IDEs: VS Code for development`;
            } else if (message.includes('specialization') || message.includes('focus')) {
                return `Sudev's AI Specializations:<br><br>
                        <strong>Specializations:</strong> ${resumeData.skills.specializations.join(', ')}<br><br>
                        His focused areas include:<br>
                        • Prompt Engineering for LLM interactions<br>
                        • RAG Pipelines for knowledge retrieval<br>
                        • Real-time Detection systems<br>
                        • Multilingual AI solutions<br>
                        • Network Security AI applications`;
            } else {
                // Comprehensive skills overview
                return `<strong>Technical Competency Profile</strong><br><br>
                        ${resumeData.name} possesses a well-rounded skill set across multiple domains of AI/ML engineering and software development:<br><br>
                        <strong>Programming Languages:</strong> ${resumeData.skills.programming.join(', ')}<br>
                        <strong>AI/ML Frameworks & Libraries:</strong> ${resumeData.skills.ml_dl.join(', ')}<br>
                        <strong>Development Platforms & Tools:</strong> ${resumeData.skills.platforms.join(', ')}<br>
                        <strong>Technical Specializations:</strong> ${resumeData.skills.specializations.join(', ')}<br>
                        <strong>Application Domains:</strong> ${resumeData.skills.domains.join(', ')}<br><br>
                        <strong>Professional Recommendation:</strong><br>
                        For detailed information about proficiency levels, practical applications, or project implementations of specific technologies, please inquire about a particular skill area.`;
            }
        }
        
        if (message.includes('education') || message.includes('study') || message.includes('college') || message.includes('degree')) {
            if (message.includes('sdm') || message.includes('dharwad')) {
                const education = resumeData.education[0];
                return `Primary Education:<br><br>
                        <strong>Institution:</strong> ${education.institution}<br>
                        <strong>Degree:</strong> ${education.degree}<br>
                        <strong>Duration:</strong> ${education.duration}<br>
                        <strong>Performance:</strong> ${education.cgpa}<br><br>
                        This is Sudev's primary degree where he's building his foundation in AI/ML.`;
            } else if (message.includes('iit') || message.includes('ropar') || message.includes('minor')) {
                const education = resumeData.education[1];
                return `Minor Program:<br><br>
                        <strong>Institution:</strong> ${education.institution}<br>
                        <strong>Program:</strong> ${education.program}<br>
                        <strong>Duration:</strong> ${education.duration}<br>
                        <strong>Contact:</strong> ${education.email}<br><br>
                        This prestigious minor program at IIT Ropar complements his primary degree with advanced AI coursework.`;
            } else {
                // Complete education overview
                let response = `<strong>Comprehensive Educational Profile</strong><br><br>`;
                resumeData.education.forEach((edu, index) => {
                    if (index === 0) {
                        response += `<strong>1. Primary Degree:</strong><br>
                                   • <strong>Institution:</strong> ${edu.institution}<br>
                                   • <strong>Degree:</strong> ${edu.degree}<br>
                                   • <strong>Duration:</strong> ${edu.duration}<br>
                                   • <strong>Academic Performance:</strong> ${edu.cgpa}<br><br>`;
                    } else {
                        response += `<strong>2. Minor Program:</strong><br>
                                   • <strong>Institution:</strong> ${edu.institution}<br>
                                   • <strong>Program:</strong> ${edu.program}<br>
                                   • <strong>Duration:</strong> ${edu.duration}<br>
                                   • <strong>Contact:</strong> ${edu.email}<br><br>`;
                    }
                });
                response += `<strong>Academic Excellence Note:</strong><br>
                           With a consistent academic performance of 7.9 CGPA (as of 6th semester), ${resumeData.name} demonstrates strong foundational knowledge in AI/ML engineering principles and practices.`;
                return response;
            }
        }
        
        if (message.includes('internship') || message.includes('experience') || message.includes('iiit')) {
            const internship = resumeData.internship;
            if (message.includes('detail') || message.includes('research') || message.includes('hate')) {
                return `Research Internship at ${internship.company}:<br><br>
                        <strong>Role:</strong> ${internship.role}<br>
                        <strong>Project:</strong> ${internship.project}<br><br>
                        <strong>Key Achievements:</strong><br>
                        • ${internship.achievements[0]}<br>
                        • ${internship.achievements[1]}<br><br>
                        This internship involved developing multilingual hate speech detection systems for Hindi-English code-mixed social media text, resulting in a published research paper and recognition at ICON 2024.`;
            } else {
                return `<strong>Research Internship Experience</strong><br><br>
                        <strong>Organization:</strong> ${internship.company}<br>
                        <strong>Position:</strong> ${internship.role}<br>
                        <strong>Research Focus:</strong> ${internship.project}<br><br>
                        <strong>Key Professional Outcomes:</strong><br>
                        • ${internship.achievements[0]}<br>
                        • ${internship.achievements[1]}<br><br>
                        <strong>Professional Development Note:</strong><br>
                        This research internship provided hands-on experience in natural language processing, specifically addressing the challenges of multilingual hate speech detection in code-mixed social media text. The work culminated in significant recognition within the academic community and contributed to the broader field of computational linguistics.`;
            }
        }
        
        if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone') || message.includes('github')) {
            return `<strong>Professional Contact Information</strong><br><br>
                    For professional inquiries, collaborations, or opportunities, ${resumeData.name} may be reached through the following official channels:<br><br>
                    📧 <strong>Email:</strong> <a href='mailto:${resumeData.email}' style='color: #6366f1;'>${resumeData.email}</a><br>
                    📞 <strong>Phone:</strong> <a href='tel:${resumeData.phone}' style='color: #6366f1;'>${resumeData.phone}</a><br>
                    🔗 <strong>GitHub:</strong> <a href='https://${resumeData.github}' target='_blank' style='color: #6366f1;'>${resumeData.github}</a><br>
                    📍 <strong>Location:</strong> ${resumeData.location}<br><br>
                    <strong>Professional Note:</strong><br>
                    All communications are subject to professional standards and response time may vary based on inquiry complexity. For project-specific inquiries, please reference the project name in your communication for expedited response.`;
        }
        
        if (message.includes('achievement') || message.includes('award') || message.includes('recognition') || message.includes('competition')) {
            let response = `<strong>Professional Achievements & Recognitions</strong><br><br>
                          ${resumeData.name} has demonstrated excellence across research, leadership, and technical domains, as evidenced by the following notable accomplishments:<br><br>`;
            resumeData.achievements.forEach((achievement, index) => {
                response += `<strong>${index + 1}.</strong> ${achievement}<br><br>`;
            });
            response += `<strong>Professional Significance:</strong><br>
                       These achievements reflect ${resumeData.name}'s commitment to academic excellence, research innovation, and leadership in technical domains. The ICON 2024 recognition particularly demonstrates his capability to produce research-grade work that meets international standards of quality and innovation.`;
            return response;
        }
        
        if (message.includes('summary') || message.includes('about') || message.includes('overview') || message.includes('introduce')) {
            return `<strong>Professional Profile Summary</strong><br><br>
                    <strong>Name:</strong> ${resumeData.name}<br>
                    <strong>Professional Title:</strong> ${resumeData.title}<br><br>
                    <strong>Executive Summary:</strong><br>
                    ${resumeData.summary}<br><br>
                    <strong>Key Professional Highlights:</strong><br>
                    • <strong>Technical Portfolio:</strong> 4+ advanced AI/ML projects with real-world applications and measurable performance metrics<br>
                    • <strong>Research Excellence:</strong> Published researcher with international recognition (ICON 2024 - 3rd Place)<br>
                    • <strong>Technical Foundation:</strong> Strong expertise in Python, machine learning frameworks, and AI system design<br>
                    • <strong>Academic Achievement:</strong> Consistent academic excellence with 7.9 CGPA (as of 6th semester)<br>
                    • <strong>Leadership Experience:</strong> Proven leadership as Department Main Coordinator<br><br>
                    <strong>Professional Recommendation:</strong><br>
                    For detailed information about any specific aspect of his professional profile, please inquire about projects, skills, education, research experience, or achievements.`;
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return `Hi! I'm the AI assistant for <strong>${resumeData.name}</strong>.<br><br>
                    I'm here to help you learn more about his professional background and technical expertise.<br><br>
                    How can I assist you today?`;
        }
        
        // Default response with suggestions
        return `<strong>Professional Inquiry Response</strong><br><br>
                I am an AI assistant designed to provide comprehensive and professional information about ${resumeData.name}'s technical profile. My knowledge base includes detailed information across several key areas:<br><br>
                <strong>专业技术领域 (Technical Expertise Areas):</strong><br>
                • <strong>AI/ML Projects</strong> - Advanced systems with performance metrics and technical architectures<br>
                • <strong>Programming Skills</strong> - Languages and frameworks with practical applications<br>
                • <strong>Academic Background</strong> - Educational credentials and academic achievements<br>
                • <strong>Research Experience</strong> - Internship work and published research contributions<br>
                • <strong>Professional Recognition</strong> - Awards, publications, and leadership roles<br><br>
                <strong>Recommended Professional Inquiries:</strong><br>
                • "Detail the technical architecture and performance metrics of his Network Intrusion Detection system"<br>
                • "What machine learning frameworks and libraries does he have hands-on experience with?"<br>
                • "Explain his educational qualifications and academic performance in detail"<br>
                • "Describe his research internship experience and published work"<br>
                • "What are his key professional achievements and recognitions?"<br><br>
                How may I assist you with a more specific professional inquiry about ${resumeData.name}'s technical profile?`;
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