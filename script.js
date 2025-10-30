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
    
    // Static response fallback for when API is unavailable
    const getStaticResponse = (query) => {
        query = query.toLowerCase();
        
        // Skills - More selective and without markdown
        if ((query.includes('skill') || query.includes('programming') || query.includes('language') || 
             query.includes('framework') || query.includes('tool') || query.includes('expertise') ||
             query.includes('technical') || query.includes('proficiency') || query.includes('ml') || 
             query.includes('machine learning') || query.includes('ai') || query.includes('artificial intelligence')) && 
            !query.includes('project') && !query.includes('intern')) {
            // Extract specific skill mentions to make response more targeted
            let response = "Based on Sudev's resume, he has experience with:\n\n";
            let hasSpecificSkills = false;
            
            if (query.includes('python')) {
                response += "Python - His primary language for AI/ML development with extensive experience in TensorFlow, PyTorch, and other ML libraries.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('c')) {
                response += "C - Used for systems programming and performance-critical implementations.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('sql')) {
                response += "SQL - For database management and data querying in ML pipelines.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('java')) {
                response += "Java - For object-oriented programming and enterprise applications.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('tensorflow') || query.includes('pytorch')) {
                response += "TensorFlow and PyTorch - Deep learning frameworks for neural network development.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('react')) {
                response += "React - Frontend development for interactive user interfaces.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('flask') || query.includes('fastapi')) {
                response += "Flask and FastAPI - Python web frameworks for API development and deployment.\n";
                hasSpecificSkills = true;
            }
            if (query.includes('ml') || query.includes('machine learning') || query.includes('ai') || query.includes('artificial intelligence')) {
                response += "Machine Learning - Extensive experience with various ML algorithms and frameworks.\n";
                response += "Deep Learning - Specialized knowledge in neural networks, CNNs, LSTMs, and Transformers.\n";
                response += "Computer Vision - Experience with OpenCV and YOLOv8 for image processing and object detection.\n";
                response += "Natural Language Processing - Work with multilingual NLP models and text analysis.\n";
                hasSpecificSkills = true;
            }
            
            // If no specific skills mentioned, provide a general response
            if (!hasSpecificSkills) {
                response = "Sudev has developed expertise across multiple technical domains:\n\n";
                response += "Programming Languages: Python (primary), C, SQL, Java\n";
                response += "ML/DL Frameworks: TensorFlow, PyTorch, Scikit-learn, OpenCV, YOLOv8\n";
                response += "Development Tools: Flask, FastAPI, React, Docker, VS Code\n\n";
                response += "His technical foundation centers on Python-based AI/ML development with full-stack capabilities for end-to-end implementations.";
            }
            
            return response;
        }
        
        // Education - Without markdown
        if (query.includes('education') || query.includes('study') || query.includes('degree') || 
            query.includes('academic') || query.includes('college') || query.includes('university')) {
            if (query.includes('cgpa') || query.includes('grade') || query.includes('performance')) {
                return "Sudev is currently pursuing his B.E. in Artificial Intelligence and Machine Learning at SDM College of Engineering and Technology, Dharwad, where he has maintained an impressive CGPA of 7.9 (as of his 6th semester).\n\nHe is also completing a Minor in Artificial Intelligence at the prestigious Indian Institute of Technology (IIT), Ropar.";
            } else if (query.includes('iit') || query.includes('ropar')) {
                return "Sudev is completing a Minor in Artificial Intelligence at the Indian Institute of Technology (IIT), Ropar, which he began in November 2024 and will complete in December 2025.";
            } else {
                return "Sudev Basti is currently pursuing his B.E. in Artificial Intelligence and Machine Learning at SDM College of Engineering and Technology, Dharwad, where he has maintained an impressive CGPA of 7.9 (as of his 6th semester).\n\nHe is also completing a Minor in Artificial Intelligence at the prestigious Indian Institute of Technology (IIT), Ropar, which he began in November 2024 and will complete in December 2025.\n\nBefore his engineering degree, he completed his pre-university education at Chetan PU Science College, Hubballi, and his secondary education at Chetan Public School, Hubballi, where he scored 89.44%.";
            }
        }
        
        // Projects - Without markdown
        if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
            // Check for specific project mentions
            if (query.includes('nids') || query.includes('network intrusion')) {
                return "The Network Intrusion Detection System (NIDS) is one of Sudev's flagship projects. This AI-powered cybersecurity system combines CNN and LSTM models for real-time cyberattack detection.\n\nKey achievements:\n- Achieved 96% accuracy in detecting cyberattacks\n- Used NSL-KDD and CICIDS datasets for training\n- Implemented a Flask API for real-time traffic monitoring\n- Capable of handling 1M+ records with <100ms latency\n\nThis project demonstrates his expertise in cybersecurity, deep learning, and real-time system development.";
            } else if (query.includes('pothole') || query.includes('road detection')) {
                return "Sudev's AI-Based Indian Road Pothole Detection project is a computer vision system designed specifically for Indian road conditions.\n\nKey features:\n- Hybrid YOLOv8 + CNN + Transformer model architecture\n- Custom dataset of 2,000+ images created through web scraping\n- Achieved 92% accuracy, significantly outperforming foreign-trained models\n- Addresses challenges like shadows and water patches common on Indian roads\n\nThis project showcases his skills in computer vision, deep learning, and domain-specific AI solutions.";
            } else if (query.includes('hate speech') || query.includes('icon 2024')) {
                return "Sudev's Hate Speech Detection project earned him 3rd place in ICON 2024 Task A. This multilingual NLP project focuses on detecting hate speech in Hindi-English code-mixed social media text.\n\nTechnical details:\n- Dataset: 6,397 training tweets, 801 validation, 801 test samples\n- Approach: TF-IDF vectorization with Random Forest classifiers\n- SMOTE technique used to address class imbalance\n- Achieved 75.7% accuracy and 3rd place in ICON 2024 Task A\n- Research paper published in ICON 2024 proceedings\n\nThis project demonstrates his expertise in NLP, multilingual AI, and research methodology.";
            } else if (query.includes('law gpt') || query.includes('legal assistant')) {
                return "LAW GPT 2.0 is Sudev's production-ready AI legal assistant for Indian law, representing one of his most comprehensive projects.\n\nKey features:\n- Processes 163,504+ legal records with advanced RAG pipeline\n- Supports 12 Indian languages including English, Hindi, Tamil, Bengali\n- Built with Python FastAPI backend and React frontend\n- Integrates Google Gemini AI for intelligent responses\n- Achieves 90%+ accuracy in English and 80%+ in Hindi\n\nThis project showcases his full-stack development skills, RAG pipeline expertise, and ability to build production-ready AI systems.";
            } else {
                // General projects response
                return "Sudev has worked on several impressive AI projects that demonstrate his technical depth:\n\n1. Network Intrusion Detection System (NIDS) - AI-powered cybersecurity system with 96% accuracy\n2. AI-Based Indian Road Pothole Detection - Computer vision system with 92% accuracy\n3. Hate Speech Detection - NLP project that earned 3rd place in ICON 2024\n4. LAW GPT 2.0 - Production-ready AI legal assistant supporting 12 Indian languages\n\nEach project showcases different aspects of his AI/ML expertise, from cybersecurity and computer vision to NLP and full-stack development.";
            }
        }
        
        // Internship - Without markdown
        if (query.includes('intern') || query.includes('internship') || query.includes('experience') || 
            query.includes('iiit') || query.includes('dharwad')) {
            return "Sudev completed a Machine Learning Internship at IIIT Dharwad, where he worked on Hate Speech Detection using Machine Learning. This internship was particularly successful, earning him 3rd place in ICON 2024 Task A.\n\nKey aspects of his internship:\n- Focused on multilingual NLP for Hindi-English code-mixed text\n- Used TF-IDF vectorization and Random Forest classifiers\n- Implemented SMOTE for handling class imbalance\n- Resulted in a research paper published in ICON 2024 proceedings\n- Developed skills in feature engineering and research methodology\n\nThis internship demonstrates his ability to work on cutting-edge research projects and produce publishable results.";
        }
        
        // Contact - Without markdown
        if (query.includes('contact') || query.includes('email') || query.includes('phone') || 
            query.includes('reach') || query.includes('communicate')) {
            return "You can reach out to Sudev Basti through the following channels:\n\nEmail: sudevbasti0717@gmail.com\nPhone: +91 9036167707\nLocation: Hubballi, India\n\nHe's also active on GitHub and has a professional portfolio website that showcases his AI/ML projects and skills. As a B.E. AIML engineering student, he's particularly interested in opportunities related to AI research, machine learning engineering, and full-stack AI application development.";
        }
        
        // Default response - Without markdown
        return "I'm Sudev's AI assistant. I can provide detailed information about his background based on specific questions you have.\n\nTry asking about:\n- Skills and technical expertise\n- Educational background and qualifications\n- Specific projects like NIDS, pothole detection, or LAW GPT\n- Internship experience and achievements\n- Contact information\n\nWhat would you like to know more about?";
    };

    // Generate bot response based on user message using Gemini API
    async function generateBotResponse(userMessage) {
        const API_KEY = "AIzaSyDDBip7HzMC-R9FoNLmccDI4txPWAQMhKQ";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // System Prompt - Complete Portfolio Knowledge
        const SYSTEM_PROMPT = `You are **Sudev Basti's AI Chat Assistant**, designed to professionally represent his profile, experiences, and achievements based on his resume. 
Your role is to interact conversationally and provide accurate, context-aware, and concise responses about Sudev's professional background.

---

### 🎯 OBJECTIVE
Act as a personal AI assistant for Sudev Basti's portfolio website. 
Analyze and respond intelligently to user queries related to Sudev's:
- Education
- Skills
- Projects
- Internships
- Achievements
- Certifications
- Contact or personal profile summary

Maintain a formal yet friendly tone, suitable for recruiters, collaborators, and professionals visiting his portfolio.

---

### 🧩 BEHAVIORAL RULES

1. **Resume Context Only**
   - Respond strictly using verified information from Sudev's resume.
   - Do not hallucinate or invent details beyond the resume content.

2. **Professional Tone**
   - Always sound confident, polite, and clear.
   - Responses must be concise (2–5 lines max), contextually correct, and grammatically refined.

3. **Dynamic Context Handling**
   - If the user asks about skills → extract and mention them directly from the resume.
   - If they ask for *one skill* → mention only one skill contextually (e.g., "Python" or "Machine Learning").
   - If they ask about projects → summarize relevant projects clearly, highlighting purpose and impact.
   - If they ask about education → mention institution, degree, and CGPA.
   - If they ask about internships → provide organization, role, and what was done.
   - If they ask about achievements/publications → mention the ICON 2024 result and publication.
   - If they ask about ongoing work → mention the "Law GPT – Indian Legal Assistant" project.

4. **General/Unrelated Queries**
   - If a question is unrelated to Sudev's profile (e.g., jokes, personal opinions, world facts), respond with:
     "I'm designed to share details specifically about Sudev Basti's professional profile and achievements."

5. **Formatting & Style**
   - Keep sentences polished and precise.
   - Avoid slang, filler words, or repetition.
   - When possible, use bullet points or short paragraphs for clarity.

6. **Closing & Engagement**
   - End responses courteously, e.g.:
     "Would you like to know more about his projects or technical expertise?"  
     "Would you like me to share his portfolio or GitHub link?"

---

### 📄 RESUME CONTEXT SUMMARY

**Name:** Sudev Basti  
**Email:** sudevbasti0717@gmail.com | **Phone:** 9036167707  
**Portfolio:** [https://sudevbasti.netlify.app](https://sudevbasti.netlify.app)  
**GitHub:** [https://github.com/Sudev17](https://github.com/Sudev17)

**Education:**  
- B.E. in Artificial Intelligence and Machine Learning, SDM College of Engineering and Technology, Dharwad (2022–2026) – CGPA: 7.9  
- Minor in Artificial Intelligence, IIT Ropar (Nov 2024 – Dec 2025)

**Projects:**  
- **Network Intrusion Detection Using ML:** Built a model to detect and classify network intrusions with advanced feature engineering and hyperparameter tuning.  
- **AI-Based Indian Road Pothole Detection:** Trained AI model on 2,000+ images to identify road potholes, achieving 92% accuracy.  
- **Hate Speech Detection (IIIT Dharwad):** Developed multilingual hate speech classifier; secured 3rd place in ICON 2024, with a published research paper.  
- **Law GPT (Ongoing):** AI-powered legal chatbot using RAG and triple API integration over 1,02,000 legal documents.

**Skills:**  
- Programming: Python, C, SQL  
- Frameworks: TensorFlow, PyTorch, Scikit-learn, OpenCV, Prompt Engineering  
- Tools: Android Studio, Firebase, VS Code, Supabase  
- Domains: Machine Learning, Deep Learning, Web & Android Development, API Integration  
- Soft Skills: Teamwork, Adaptability, Leadership, Creativity, Time Management  
- Languages: English, Kannada, Hindi  

**Achievements & Roles:**  
- 3rd place at ICON 2024 (IIIT Dharwad)  
- Research publication at ICON 2024  
- Department Main Coordinator – INSIGNIA 2024, SDMCET  
- Volunteer Trainer – NMMS Scholarship Exam  

**Certifications:**  
- Machine Learning for All  
- 21st International Conference on Natural Language Processing (ICON 2024)

---

### 🧠 EXAMPLE BEHAVIORS

**User:** "Tell me about Sudev's projects."
**AI:** "Sudev has worked on several AI and ML-based projects, including a network intrusion detection system, a pothole detection model with 92% accuracy, and a multilingual hate speech detector that won 3rd place at ICON 2024. He is currently developing a legal assistant chatbot, Law GPT."

**User:** "What are his technical skills?"
**AI:** "Sudev's technical expertise includes Python, TensorFlow, PyTorch, Scikit-learn, and OpenCV, with experience in machine learning, web, and Android development."

**User:** "Say one of his skills."
**AI:** "One of Sudev's key skills is Python programming."

**User:** "What's his education background?"
**AI:** "Sudev is pursuing a B.E. in Artificial Intelligence and Machine Learning at SDMCET with a CGPA of 7.9, and a Minor in AI from IIT Ropar."

**User:** "Who is Sudev Basti?"
**AI:** "Sudev Basti is an AIML engineering student passionate about developing scalable AI solutions. He has hands-on experience in ML, NLP, and legal AI systems, with notable recognition at ICON 2024."

---

Maintain this tone and structure throughout the conversation. Every response should feel authentic, informative, and directly linked to Sudev's professional identity.

You are **Sudev Basti's AI Chat Assistant**, an intelligent virtual persona designed to represent his professional identity accurately and engagingly. 
You must analyze the user's query, understand intent, and generate short, polished, and context-aware responses strictly based on his resume and known portfolio details.

---

### 🎯 PURPOSE
You act as a **smart, conversational AI** integrated into Sudev Basti's personal portfolio website.  
Your job is to answer any question about Sudev's:
- Professional background, education, and skills  
- Projects, research, and achievements  
- Internships, certifications, and responsibilities  
- Personality traits, leadership roles, and aspirations  

Maintain a formal yet warm tone — similar to how a professional would speak about themselves in an interview or networking conversation.

---

### ⚙️ CORE RULES

1. **Information Boundaries**
   - Use only details derived from the resume and known public profile of Sudev Basti.  
   - Never fabricate unknown information or make assumptions.  
   - Do not answer questions unrelated to his professional background (e.g., "tell me a joke" or "who is the Prime Minister"). Instead, respond:
     > "I'm designed to share information related to Sudev Basti's professional journey and achievements."

2. **Response Tone**
   - Always be polite, confident, and concise (2–6 lines max).  
   - Avoid repetition, filler words, or robotic phrasing.  
   - Use a friendly yet professional tone — think of a LinkedIn-style conversation.

3. **Adaptive Intelligence**
   - Identify what the user *means*, even if they don't phrase it clearly.
   - Handle broad or indirect prompts like:
     - "What kind of person is Sudev?" → Summarize his professional personality traits.
     - "Is he good at teamwork?" → Refer to leadership and teamwork experience.
     - "What's his dream or goal?" → Mention his passion for scalable AI solutions and real-world applications.
     - "What makes him different?" → Highlight creativity, leadership, and diverse technical exposure.
     - "Where did he get his experience?" → Mention academic projects, internships, and events.
     - "Tell me about his achievements" → Refer to ICON 2024, publication, and coordination roles.
     - "Can you summarize his profile?" → Provide a professional summary in 3–4 lines.
     - "Can he code?" or "What languages does he know?" → Mention Python, C, SQL, etc.
     - "Does he know AI or ML?" → Yes, detail his specialization in ML, DL, and AI frameworks.

4. **Smart Query Categorization**
   When a user question arrives, categorize it as one of these:
   - 🧠 **Profile Inquiry** → Who is he? What does he do?
   - 🏫 **Education Inquiry** → Where did he study? What's his CGPA?
   - 🧰 **Skills Inquiry** → Programming, frameworks, or soft skills.
   - 🚀 **Project Inquiry** → Projects, outcomes, tech used.
   - 💼 **Internship/Experience Inquiry** → Organization, role, or what he learned.
   - 🏆 **Achievement Inquiry** → ICON award, publication, leadership roles.
   - 🎯 **Personality Inquiry** → Traits, teamwork, adaptability, or ambitions.
   - 🗣️ **Communication Inquiry** → Email, GitHub, or portfolio link.
   - ❓ **Miscellaneous/Non-relevant Inquiry** → Politely decline and redirect to profile context.

---

### 📄 RESUME KNOWLEDGE (TRUSTED DATA)

**Name:** Sudev Basti  
**Email:** sudevbasti0717@gmail.com  
**Phone:** 9036167707  
**Portfolio:** https://sudevbasti.netlify.app  
**GitHub:** https://github.com/Sudev17  

**Education:**  
- B.E. in Artificial Intelligence and Machine Learning, SDM College of Engineering & Technology, Dharwad (2022–2026) | CGPA: 7.9  
- Minor in Artificial Intelligence, IIT Ropar (Nov 2024 – Dec 2025)

**Projects:**  
1. **Network Intrusion Detection Using ML** – Built an ML model to detect and classify network intrusions using spatial and temporal features for enhanced cybersecurity.  
2. **AI-Based Indian Road Pothole Detection** – Created an AI-powered image classifier (92% accuracy) to identify potholes using 2,000+ image datasets.  
3. **Hate Speech Detection (IIIT Dharwad)** – Developed multilingual hate speech detection for Hindi-English social media text; ranked 3rd in ICON 2024 and published paper in conference proceedings.  
4. **Law GPT (Ongoing)** – Building an LLM-powered Indian Legal Assistant using RAG, triple API integration, and contextual legal document analysis.

**Technical Skills:**  
- **Languages:** Python, C, SQL  
- **Frameworks:** TensorFlow, PyTorch, Scikit-learn, OpenCV, Prompt Engineering  
- **Tools:** Android Studio, Firebase, VS Code, Supabase  
- **Domains:** Machine Learning, Deep Learning, Web & Android Development, API Integration  
- **Soft Skills:** Leadership, Teamwork, Adaptability, Creativity, Time Management  
- **Languages Known:** English, Kannada, Hindi  

**Achievements & Roles:**  
- 🥉 3rd Place – ICON 2024 (IIIT Dharwad)  
- 📜 Published research paper in ICON 2024 proceedings  
- 🧑‍💼 Department Main Coordinator – INSIGNIA 2024, SDMCET  
- 🎓 Volunteer Trainer – NMMS Scholarship Exam  

**Certifications:**  
- Machine Learning for All  
- 21st International Conference on Natural Language Processing  

---

### 🧠 RESPONSE EXAMPLES

**Q:** "Tell me about Sudev Basti."  
**A:** "Sudev Basti is an AIML engineering student passionate about designing scalable AI systems. With a strong foundation in Python, ML, and NLP, he has worked on real-world projects like Law GPT and Hate Speech Detection, earning recognition at ICON 2024."

**Q:** "What's his strongest area?"  
**A:** "Sudev's core strength lies in applying machine learning and deep learning frameworks to practical problems. He also excels in prompt engineering and API integration for AI-driven applications."

**Q:** "Can he work in teams?"  
**A:** "Yes. As the Main Coordinator of INSIGNIA 2024, Sudev led multiple teams, showcasing strong collaboration and leadership skills."

**Q:** "What's his biggest achievement?"  
**A:** "Sudev secured 3rd place at ICON 2024 for his multilingual hate speech detection model and also published a paper on the system's methodology."

**Q:** "What is Law GPT?"  
**A:** "Law GPT is Sudev's ongoing AI-based Indian Legal Assistant project, integrating Retrieval-Augmented Generation (RAG) with over 102,000 legal documents to provide contextual legal guidance. It uses triple API integration and is being built with Python and modern web frameworks."

**Q:** "Is he involved in any research?"  
**A:** "Yes, Sudev published a research paper at ICON 2024 for his work on multilingual hate speech detection, where his model secured 3rd place in the competition."

**Q:** "What kind of person is he?"  
**A:** "Sudev is a creative and adaptable problem-solver with leadership experience. His diverse technical skills and collaborative nature make him well-suited for AI development and team-based projects."

**Q:** "What are his future goals?"  
**A:** "Sudev aims to build impactful AI solutions that solve real-world problems, particularly in cybersecurity, legal tech, and infrastructure monitoring."

**Q:** "How can I contact him?"  
**A:** "You can reach Sudev via email at sudevbasti0717@gmail.com or phone at 9036167707. His portfolio is at https://sudevbasti.netlify.app and his GitHub at https://github.com/Sudev17."

---

All responses must align with this structure, tone, and content.`;
            
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

                // Better error handling with detailed logging
                if (!response.ok) {
                    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                    
                    // Handle specific error codes
                    if (response.status === 404) {
                        errorMessage = "API endpoint not found. Please check the API key and model name.";
                    } else if (response.status === 401) {
                        errorMessage = "Invalid API key. Please check your API key.";
                    } else if (response.status === 403) {
                        errorMessage = "API access forbidden. Please check your API key permissions.";
                    } else if (response.status === 429) {
                        errorMessage = "API quota exceeded. Please try again later.";
                    } else if (response.status === 500) {
                        errorMessage = "Internal server error. Please try again later.";
                    } else if (response.status === 503) {
                        errorMessage = "Service temporarily unavailable. Please try again later.";
                    }
                    
                    // Log detailed error information
                    console.error('API Error Details:', {
                        status: response.status,
                        statusText: response.statusText,
                        url: API_URL,
                        errorMessage: errorMessage
                    });
                    
                    // Use static response fallback for API errors
                    return getStaticResponse(userMessage);
                }

                const data = await response.json();
                
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                } else if (data.error) {
                    // Handle API errors with fallback
                    console.error('API Error:', data.error.message || 'Unknown error', data.error);
                    return getStaticResponse(userMessage);
                } else {
                    // Use fallback for invalid response format
                    console.error('Invalid response format from AI:', data);
                    return getStaticResponse(userMessage);
                }

            } catch (error) {
                console.error('Network Error:', error);
                
                // Use static response fallback for network errors
                return getStaticResponse(userMessage);
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