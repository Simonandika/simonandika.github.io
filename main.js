// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeToggle(currentTheme);

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

function updateThemeToggle(theme) {
    themeToggle.checked = theme === 'dark';
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Close menu when clicking on a link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==================== 404 PAGE HANDLING ====================
const notFoundPage = document.getElementById('notFoundPage');
const backHomeBtn = document.querySelector('.back-home-btn');

// Check if the current page should show 404
function checkPage() {
    const hash = window.location.hash || window.location.pathname;
    const validPages = ['#home', '#about', '#projects', '#contact', '', '/'];
    
    // If hash is not a valid section, show 404
    if (!validPages.includes(hash) && hash !== '') {
        show404Page();
    }
}

function show404Page() {
    notFoundPage.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hide404Page() {
    notFoundPage.classList.remove('show');
    document.body.style.overflow = 'auto';
    window.location.hash = '#home';
}

backHomeBtn.addEventListener('click', hide404Page);

// Check page on load and hash change
window.addEventListener('load', checkPage);
window.addEventListener('hashchange', checkPage);

// Handle navigation attempts to non-existent pages
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href) {
        const url = new URL(e.target.href);
        const hash = url.hash;
        
        const validPages = ['#home', '#about', '#projects', '#contact'];
        if (!validPages.includes(hash) && hash !== '') {
            e.preventDefault();
            show404Page();
        }
    }
});

// ==================== FADE UP ANIMATION ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.className.includes('fade-up') 
                ? 'fadeUp 0.8s ease forwards' 
                : 'none';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== PROJECT CARD HIGHLIGHT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.setProperty('--card-index', index);
    
    const highlight = card.querySelector('.card-highlight');
    
    // Trigger animation when card is hovered
    card.addEventListener('mouseenter', () => {
        highlight.style.animation = 'slideUp 0.4s ease';
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Validate the page
        const validPages = ['#home', '#about', '#projects', '#contact'];
        if (!validPages.includes(href)) {
            e.preventDefault();
            show404Page();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Show success message (in real app, you'd send this to a server)
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        }, 3000);
    });
}

// ==================== INITIALIZATION ====================
// Set home as active on load
window.addEventListener('load', () => {
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
});

console.log('Portfolio loaded successfully! 🚀');
