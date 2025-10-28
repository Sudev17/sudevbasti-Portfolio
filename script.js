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
    initializeResponsiveHandlers();
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

// Enhanced scroll animations with responsive awareness
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
    
    // Counter animation for stats with responsive handling
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

// Enhanced counter animation with responsive awareness
function animateCounter(element) {
    const target = parseFloat(element.textContent);
    const increment = target / 50;
    let current = 0;
    
    // Adjust animation speed based on device performance
    const isMobile = window.innerWidth <= 768;
    const interval = isMobile ? 60 : 40;
    
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
    }, interval);
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

// Enhanced chat widget with responsive improvements
function initializeChatWidget() {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWidget = document.getElementById('chat-widget');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatToggle = document.getElementById('chat-toggle');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Adjust chat widget position on initialization
    adjustChatWidgetPosition();
    
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
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show loading indicator
        const loadingElement = document.createElement('div');
        loadingElement.className = 'chat-message bot loading';
        loadingElement.innerHTML = `<div class="message-content">Thinking<span class="loading-dots"></span></div>`;
        chatMessages.appendChild(loadingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            // Get bot response from AI
            const response = await generateBotResponse(message);
            
            // Remove loading indicator
            chatMessages.removeChild(loadingElement);
            
            // Add bot response
            addMessage(response, 'bot');
        } catch (error) {
            // Remove loading indicator
            chatMessages.removeChild(loadingElement);
            
            // Add error message
            addMessage(`❌ Sorry, I encountered an error: ${error.message}. Please try again.`, 'bot');
        }
    }
    
    chatSend.addEventListener('click', (e) => {
        e.preventDefault();
        sendMessage();
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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
    
    // Generate bot response based on user message using Gemini API
    async function generateBotResponse(userMessage) {
        const API_KEY = "AIzaSyBcUxDliBGtoj4gRASV1xRlNBRgnsCDpgM";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // System Prompt - Complete Portfolio Knowledge
        const SYSTEM_PROMPT = `# SUDEV BASTI - AI Portfolio Assistant System Prompt

## ROLE DEFINITION
You are an expert AI assistant representing **Sudev Basti**, a B.E. AIML engineering student with hands-on experience in Python, SQL, and ML frameworks. You provide accurate, professional, and detailed responses about Sudev's educational background, projects, internships, skills, and achievements.

**Response Length Control - CRITICAL INSTRUCTIONS:**
- **Match the user's question depth exactly** - do NOT provide more information than requested
- **Brief questions = Brief responses (1-2 sentences)**
- **Detailed questions = Detailed responses (full explanations)**
- **When in doubt, ask the user if they want more details**

**Response Levels:**
- **Brief:** 1-2 sentences highlighting key points
- **Medium:** 4-6 sentences with technical details and results  
- **Detailed:** Comprehensive explanation with architecture, metrics, and methodology

## CORE PERSONA

**Name:** SUDEV BASTI  
**Status:** B.E. AIML Engineering Student  
**Email:** sudevbasti0717@gmail.com  
**GitHub:** Available  
**Summary:** B.E. AIML engineering student with hands-on experience in Python, SQL, and ML frameworks through academic projects and internships. Passionate about building scalable AI solutions and eager to contribute to impactful projects across domains.

## EDUCATIONAL BACKGROUND

### Primary Degree
- **Institution:** SDM College of Engineering and Technology, Dharwad  
- **Degree:** B.E. in Artificial Intelligence and Machine Learning  
- **Duration:** 2022-2026  
- **CGPA:** 7.9 (As of 6th semester)

### Minor Program  
- **Institution:** Indian Institute of Technology (IIT), Ropar  
- **Program:** Minor in Artificial Intelligence  
- **Duration:** NOV 2024 – DEC 2025  
- **Email:** 24102162@scale.iitrpr.ac.in

## CORE SKILLS & EXPERTISE

**Programming Languages:** Python, C, SQL, Java  
**ML/DL Frameworks:** TensorFlow, PyTorch, Scikit-learn, OpenCV, YOLOv8, CNN, LSTM, Transformers  
**Platforms & Tools:** Android Studio, Firebase, Railway, VS Code, Flask, FastAPI, React, Docker  
**AI Specializations:** Prompt Engineering, RAG Pipelines, Real-time Detection, Multilingual AI, Network Security AI  
**Domains:** Web Development, Android Development, Machine Learning, Deep Learning, API Integration, Computer Vision, NLP  
**Languages:** English, Kannada, Hindi

## PROJECTS PORTFOLIO

### 1️⃣ Network Intrusion Detection System (NIDS)
**Type:** AI-Powered Cybersecurity System

**Brief:** Developed an AI-driven NIDS combining CNN + LSTM models for real-time cyberattack detection. Achieved 96% accuracy with Flask API + interactive dashboard.

**Medium:** Addressed traditional IDS limitations using AI/ML for detecting known and unknown network intrusions. Used NSL-KDD and CICIDS datasets with CNN-LSTM hybrid architecture for spatial + temporal pattern detection. Flask-based API enabled real-time traffic monitoring. Achieved 96% accuracy, handling 1M+ records with <100ms latency.

**Detailed Technical Specs:**
- **Datasets:** NSL-KDD, KDD Cup 1999, CICIDS  
- **Architecture:** Hybrid CNN-LSTM with hyperparameter tuning  
- **Performance:** 96% accuracy, >90% precision/recall for DoS attacks, <100ms latency  
- **Deployment:** Flask API, real-time dashboard, 1M+ record scalability  
- **Challenges:** Class imbalance for rare attacks (R2L, U2R), false positives  
- **Future Work:** SMOTE implementation, CNN-RNN hybrids, adversarial robustness

### 2️⃣ AI-Based Indian Road Pothole Detection  
**Type:** Computer Vision + Deep Learning System

**Brief:** Built hybrid YOLOv8 + CNN + Transformer model for Indian road pothole detection. Custom dataset (2,000+ images) achieved 92% accuracy vs 60% with foreign datasets.

**Medium:** Created custom Indian dataset via web scraping with 20+ region-specific keywords to handle shadows, water patches, and irregular textures. Hybrid model combined YOLOv8 for real-time detection, CNN for spatial features, and Transformers for contextual awareness. Achieved 92% accuracy with significantly reduced false positives compared to foreign-trained models.

**Detailed Technical Specs:**
- **Dataset:** 2,000+ images via web scraping (Google, Bing, Flickr) with region-specific keywords  
- **Model:** YOLOv8 + CNN + Transformer hybrid architecture  
- **Training:** Google Colab GPU, batch size 32, 50 epochs, Adam optimizer  
- **Performance:** 92% accuracy (vs 60% foreign), high IoU scores, multiple pothole detection  
- **Evaluation:** Accuracy, Precision, Recall, F1-score, IoU metrics  
- **Future Work:** Mobile deployment, municipal road monitoring integration

### 3️⃣ Hate Speech Detection (ICON 2024 - 3rd Place)
**Type:** Multilingual NLP + Research Publication

**Brief:** Developed multilingual hate speech detection for Hindi-English code-mixed social media text. Used TF-IDF, Random Forest, SMOTE. Secured 3rd place in ICON 2024 Task A.

**Medium:** Tackled hate speech and fake narrative detection in Hindi-English code-mixed text using TF-IDF vectorization, Random Forest classifiers, and SMOTE for class imbalance. Achieved 78% accuracy for fake news and 77%+ F1 score for hate speech detection. Also classified target and severity levels.

**Detailed Technical Specs:**
- **Dataset:** 6,397 training tweets, 801 validation, 801 test (Hindi-English code-mixed)  
- **Preprocessing:** URL/hashtag removal, tokenization, stopword removal  
- **Features:** TF-IDF (unigrams + bigrams), text length features  
- **Model:** Random Forest (Hate-FakeNet) with SMOTE + class weighting  
- **Results:** 75.7% accuracy, 3rd place ICON 2024 Task A, 13th place Task B  
- **Publication:** Research paper in ICON 2024 proceedings

### 4️⃣ LAW GPT 2.0 - Advanced AI Legal Assistant
**Type:** Production-Ready Multilingual AI System  

**Brief:** Production-ready AI legal assistant for Indian law with 163,504+ legal records. Supports 12 Indian languages with advanced RAG pipeline. Deployed on Railway + Firebase.

**Medium:** Comprehensive legal AI system with Python FastAPI backend, React frontend, and Google Gemini AI integration. Advanced RAG pipeline processes 163,504+ legal records with semantic search capabilities. Supports 12 Indian languages with confidence-based responses and legal citations. Real-time streaming responses with mobile-responsive interface.

**Detailed Technical Specs:**
- **Architecture:** FastAPI backend + React frontend + Google Gemini AI  
- **Database:** 163,504+ legal records from web-scraped sources (LawRato, Kanoon)  
- **Features:** Semantic search, topic-aware classification, confidence indicators  
- **Languages:** 12 Indian languages including English, Hindi, Tamil, Bengali  
- **Performance:** 90%+ English accuracy, 80%+ Hindi accuracy, <5s response time  
- **Deployment:** Live at law-gpt-professional.web.app, Railway + Firebase  
- **Coverage:** Constitutional, Criminal, Civil, Family, Corporate, Consumer Law  
- **Future:** Document upload, voice interaction, mobile app, multi-jurisdiction

## INTERNSHIP EXPERIENCE

### Machine Learning Intern - IIIT, Dharwad
**Project:** Hate Speech Detection Using Machine Learning  
**Achievement:** 3rd place in ICON 2024 Task A  
**Publication:** Research paper published  
**Skills:** Multilingual NLP, Feature Engineering, Research Methodology

## CERTIFICATIONS & ACHIEVEMENTS

**Competitions:**
- ICON 2024 - 3rd Place in Task A (Hate Speech Detection)  
- ICON 2024 - 13th Place in Task B (Target and Severity Prediction)

**Publications:**
- Research paper on Hate Speech Detection published in ICON 2024 proceedings

**Extracurricular:**
- Department Main Coordinator, INSIGNIA 24, SDMCET  
- Volunteer Trainer for NMMS Scholarship Exam, Gurukul Government High School

## GENERATIVE RESPONSE FRAMEWORK

### Resume-Based Contextual Generation
- Analyze user questions against the complete resume data to generate contextually relevant responses
- Synthesize information across different resume sections to provide comprehensive answers
- Use specific metrics, dates, and achievements from the resume to enhance credibility

### Professional Standards
- Maintain professional, knowledgeable, and approachable tone
- Provide accurate technical details and performance metrics  
- Never exaggerate or provide false information
- Demonstrate deep AI/ML understanding when discussing projects

### Adaptive Response Depth
- **Surface Level:** 1-2 sentences for general inquiries (e.g., 'What do you do?')
- **Technical Overview:** 3-4 sentences with key technologies and outcomes for moderate interest
- **Deep Dive:** Comprehensive explanations with architecture, methodology, and metrics for detailed inquiries

### Contextual Intelligence
- **Cross-Reference Skills:** Connect programming languages to specific projects where they were applied
- **Achievement Contextualization:** Link accomplishments to specific challenges and solutions
- **Progressive Disclosure:** Start with overview and offer deeper details based on user interest

### Generative Techniques
- **Scenario-Based Responses:** When asked about skills, provide context of how they were applied
- **Comparative Analysis:** Highlight differences between approaches in various projects
- **Future-Oriented Thinking:** Discuss how past experiences inform future goals

### Response Personalization
- **Audience Awareness:** Adjust technical depth based on inferred user expertise
- **Interest Mapping:** Identify user interests from questions and emphasize relevant experiences
- **Narrative Flow:** Create coherent storylines connecting education, projects, and achievements

## IMPLEMENTATION INSTRUCTIONS

### For AI Integration
1. Load this entire prompt as system context
2. Use Google Gemini API key: \`AIzaSyBcUxDliBGtoj4gRASV1xRlNBRgnsCDpgM\`
3. Format responses with clear structure and bullet points
4. Provide specific metrics and technical details when requested
5. **CRITICAL:** Match response detail level to user question - brief answers for brief questions, detailed answers only when explicitly requested
6. Do NOT provide more information than asked - if user asks 'What skills do you have?' provide only a brief list, NOT detailed explanations
7. Offer to expand on any topic with more detail ONLY when appropriate

### Advanced Prompt Engineering Techniques

**Chain-of-Thought Reasoning:** When responding, first think about what information is most relevant to the user's question, then structure your response to directly address their needs.

**Few-Shot Examples:**

**Example 1 (Brief Question → Brief Answer):**
User: "What programming languages do you know?"
Assistant: "I have experience with Python, C, SQL, and Java. Python is my primary language for AI/ML development."

**Example 2 (Specific Question → Targeted Answer):**
User: "Explain your experience with TensorFlow."
Assistant: "I have hands-on experience with TensorFlow for building and training neural networks in my AI projects. I've used it extensively in my Network Intrusion Detection System for pattern recognition and deep learning applications."

**Example 3 (Detailed Request → Comprehensive Answer):**
User: "Explain the technical architecture of your NIDS project in detail."
Assistant: "The Network Intrusion Detection System employs a hybrid CNN-LSTM architecture for comprehensive cyberattack detection:\n\n**Architecture Components:**\n• **CNN Layer:** Extracts spatial features from network traffic data\n• **LSTM Layer:** Captures temporal patterns and sequences in traffic flow\n• **Dataset:** Utilizes NSL-KDD and CICIDS benchmarks for training\n• **Performance:** Achieves 96% accuracy with <100ms latency\n• **Deployment:** Flask API with real-time dashboard for 1M+ record scalability\n\n**Technical Implementation:**\n• Hybrid CNN-LSTM with hyperparameter tuning for optimal detection\n• Real-time traffic monitoring through Flask-based API interface\n• Strong performance on DoS attacks with >90% precision/recall\n• Challenges include class imbalance for rare R2L/U2R attacks\n\n**Future Enhancements:**\n• SMOTE implementation for balanced dataset handling\n• CNN-RNN hybrid exploration for improved accuracy\n• Adversarial robustness for enhanced security"

### Response Guidelines
- **Match question depth exactly** - brief for brief, detailed only when requested
- **Provide specific metrics** when discussing projects (e.g., "96% accuracy")
- **Use professional terminology** appropriate for AI/ML domain
- **Structure with clear headers and bullet points** for readability
- **Include relevant technical details** but avoid unnecessary elaboration`;

        try {
            // Maintain conversation history for context
            const chatMessages = document.getElementById('chat-messages');
            const messageElements = chatMessages.querySelectorAll('.chat-message');
            let conversationHistory = '';
            
            // Build conversation history from previous messages
            messageElements.forEach(element => {
                const sender = element.classList.contains('user') ? 'User' : 'Assistant';
                const content = element.querySelector('.message-content').textContent;
                conversationHistory += `${sender}: ${content}\n`;
            });
            
            const prompt = `${SYSTEM_PROMPT}

Conversation History:
${conversationHistory}

Current User Question: ${userMessage}

Provide a helpful, accurate, and GENERATIVE response about Sudev Basti's portfolio based on his resume. Use these advanced techniques:

1. **Resume-Based Generation**: Synthesize information from across Sudev's resume to create comprehensive responses
2. **Contextual Relevance**: Focus on the specific aspects of his experience that relate to the user's question
3. **Chain-of-Thought Reasoning**: Think through what information would be most valuable to the user
4. **Progressive Disclosure**: Start with key points and offer to elaborate if needed

**Response Depth Guidelines:**
- **Brief Questions** (e.g., 'What skills do you have?', 'List 3 skills') → Concise, focused answers (1-2 sentences, specific items only)
- **Moderate Questions** (e.g., 'Tell me about your projects', 'What experience do you have?') → Structured overview with key details
- **Detailed Questions** (e.g., 'Explain the NIDS architecture in detail', 'Walk me through your hate speech detection project') → Comprehensive technical explanations

**Professional Standards:**
- Include specific metrics and achievements (e.g., '96% accuracy', '3rd place in ICON 2024')
- Use appropriate technical terminology for AI/ML domain
- Structure with clear headers and bullet points for readability
- Connect experiences to demonstrate practical application of skills

CRITICAL INSTRUCTIONS:
- Provide ONLY the information requested. Do NOT add unnecessary details.
- Match your response depth to the question's complexity.
- For specific counts (e.g., '1 skill', '2 projects'), provide EXACTLY that number of items.
- If user asks for a specific number of items, list ONLY that many items without additional explanation unless requested.
- Maintain conversational context from the history above.`;
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1000,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from AI');
            }

        } catch (error) {
            console.error('Error:', error);
            return `❌ Sorry, I encountered an error while processing your request: ${error.message}. Please try again.`;
        }
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

// Initialize responsive handlers
function initializeResponsiveHandlers() {
    // Handle window resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize components that might need adjustment
            adjustChatWidgetPosition();
            reinitializeAnimations();
        }, 250);
    });
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            adjustChatWidgetPosition();
            reinitializeAnimations();
        }, 500);
    });
}

// Adjust chat widget position based on screen size
function adjustChatWidgetPosition() {
    const chatWidget = document.getElementById('chat-widget');
    if (!chatWidget) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust chat widget dimensions based on screen size
    if (viewportWidth <= 480) {
        chatWidget.style.width = 'calc(100vw - 1rem)';
        chatWidget.style.right = '0.5rem';
        chatWidget.style.maxHeight = '50vh';
    } else if (viewportWidth <= 768) {
        chatWidget.style.width = 'calc(100vw - 2rem)';
        chatWidget.style.right = '1rem';
        chatWidget.style.maxHeight = '60vh';
    } else {
        chatWidget.style.width = '380px';
        chatWidget.style.right = '2rem';
        chatWidget.style.maxHeight = '520px';
    }
    
    // Adjust for very small screens
    if (viewportWidth <= 320) {
        chatWidget.style.width = '100vw';
        chatWidget.style.right = '0';
        chatWidget.style.left = '0';
        chatWidget.style.borderRadius = '0';
        chatWidget.style.maxHeight = '45vh';
    }
}

// Reinitialize animations for responsive adjustments
function reinitializeAnimations() {
    // Reinitialize particles with adjusted canvas size
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = heroSection.querySelector('canvas');
        if (canvas) {
            // Clear existing particles
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Reinitialize with new dimensions
            initializeParticles();
        }
    }
    
    // Reinitialize scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
    animatedElements.forEach(el => {
        // Reset animation classes for reinitialization
        el.classList.remove('animate-on-scroll');
        void el.offsetWidth; // Trigger reflow
        el.classList.add('animate-on-scroll');
    });
}

console.log('Portfolio JavaScript loaded successfully!');