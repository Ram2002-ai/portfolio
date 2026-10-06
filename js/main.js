// Main JavaScript for Professional Portfolio

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active link highlighting on scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Resume Download
function downloadResume() {
    const resumeContent = `RAMCHAND SEVAIWAR
====================

📞 Phone: +91-9302163501
📧 Email: airaml2026@gmail.com
🔗 LinkedIn: https://linkedin.com/in/ram-sevaiwar-0798a7250
🐙 GitHub: https://github.com/Ram2002-ai

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFILE
────────────────────────────────────────────────────────────────
Machine Learning Engineer with strong expertise in Python, SQL, 
advanced EDA, and end-to-end ML pipeline development. Experienced 
in building scalable predictive models, applying ensemble techniques, 
and implementing foundational MLOps practices. Passionate about 
designing production-ready AI systems and solving real-world 
business problems using data-driven solutions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION
────────────────────────────────────────────────────────────────
B.Tech in Artificial Intelligence & Machine Learning
RGPV Bhopal | 2022 - Present

Higher Secondary Certificate
MPBSE, Balaghat | 2020

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS
────────────────────────────────────────────────────────────────
Programming: Python, SQL
Machine Learning: Regression, Classification, Ensemble Methods, XGBoost
Data Science: NumPy, Pandas, EDA, Feature Engineering, Model Evaluation
Visualization: Matplotlib, Seaborn, Plotly, Power BI
Deployment: Streamlit, FastAPI, Gradio, REST APIs
MLOps: Git, Model Serialization, Modular Pipelines, Version Control

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FEATURED PROJECTS
────────────────────────────────────────────────────────────────

1. AI Data Analysis Application
   • Intelligent data analysis platform that automates insights generation
   • Built with Python, Streamlit, and Machine Learning
   • Live: https://aidataanalyst2026.streamlit.app/

2. Real Estate Recommendation System
   • ML-based system that recommends properties based on user preferences
   • Implements ensemble regression with 85% accuracy
   • Production-oriented pipeline with hyperparameter optimization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CERTIFICATIONS
────────────────────────────────────────────────────────────────
• Python with Data Science - Sheryians Coding School
• Microsoft Azure Fundamentals

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERESTS
────────────────────────────────────────────────────────────────
Scalable machine learning systems, Generative & Agentic AI,
real-world model deployment, and continuously exploring emerging 
AI technologies to solve practical industry problems.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Last Updated: March 2026`;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ramchand_Sevaiwar_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const resumeBtn = document.getElementById('downloadResumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', downloadResume);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

window.projectCardObserver = observer;

document.querySelectorAll('.skill-item, .achievement-card, .experience-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
});