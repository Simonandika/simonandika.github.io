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
    if (notFoundPage) {
        notFoundPage.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hide404Page() {
    if (notFoundPage) {
        notFoundPage.classList.remove('show');
        document.body.style.overflow = 'auto';
        window.location.hash = '#home';
    }
}

if (backHomeBtn) {
    backHomeBtn.addEventListener('click', hide404Page);
}

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
        if (highlight) {
            highlight.style.animation = 'slideUp 0.4s ease';
        }
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

// ==================== TYPING EFFECT ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '<span class="cursor">|</span>';
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(type, speed);
        } else {
            // Wait 3 seconds then restart
            setTimeout(() => {
                typeWriter(element, text, speed);
            }, 3000);
        }
    }
    type();
}

// Start typing effect for About section
const aboutText = "I'm a passionate developer who loves creating beautiful websites. With expertise in modern web technologies, I help businesses bring their ideas to life.";
const aboutElement = document.getElementById('about-text');
if (aboutElement) {
    typeWriter(aboutElement, aboutText, 50);
}

// ==================== VISITOR COUNTER ====================
// Initialize Supabase client
const supabaseUrl = 'https://qidebeiffjbnjgkzbwtw.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZGViZWlmZmpibmpna3pid3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTM2MjMsImV4cCI6MjA4MTkyOTYyM30.4YIJjks7L7QJAFL9bZ1gbVvDJd2hIOxUazbrpz5rfTc'; // Replace with your Supabase anon key

let supabaseClient = null;
if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_ANON_KEY') {
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    console.log('Supabase initialized successfully');
} else {
    console.warn('Supabase not configured. Please replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual Supabase credentials.');
}// Function to generate device fingerprint
function generateDeviceFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Fingerprint', 2, 2);
    
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        canvas: canvas.toDataURL(),
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack
    };
    
    // Create hash from fingerprint
    let hash = 0;
    const str = JSON.stringify(fingerprint);
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
}

// Function to get total visitor count
async function getVisitorCount() {
    if (!supabaseClient) {
        console.warn('Supabase not configured, returning 0');
        return 0;
    }
    
    try {
        const { count, error } = await supabaseClient
            .from('visitors')
            .select('*', { count: 'exact', head: true });
        
        if (error) {
            console.error('Error fetching visitor count:', error);
            return 0;
        }
        
        return count || 0;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return 0;
    }
}

// Function to check if device already visited
async function hasDeviceVisited(deviceId) {
    if (!supabaseClient) {
        console.warn('Supabase not configured, returning false');
        return false;
    }
    
    try {
        const { data, error } = await supabaseClient
            .from('visitors')
            .select('id')
            .eq('device_id', deviceId)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
            console.error('Error checking device visit:', error);
            return false;
        }
        
        return !!data;
    } catch (error) {
        console.error('Error checking device visit:', error);
        return false;
    }
}

// Function to record device visit
async function recordDeviceVisit(deviceId) {
    if (!supabaseClient) {
        console.warn('Supabase not configured, cannot record visit');
        return false;
    }
    
    try {
        const { data, error } = await supabaseClient
            .from('visitors')
            .insert([{
                device_id: deviceId,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                last_visit: new Date().toISOString(),
                visit_count: 1
            }])
            .select();
        
        if (error) {
            console.error('Error recording device visit:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error recording device visit:', error);
        return false;
    }
}

// Function to update device visit count
async function updateDeviceVisit(deviceId) {
    if (!supabaseClient) {
        console.warn('Supabase not configured, cannot update visit');
        return false;
    }
    
    try {
        // Get current visit count
        const { data: currentData, error: selectError } = await supabaseClient
            .from('visitors')
            .select('visit_count')
            .eq('device_id', deviceId)
            .single();
        
        if (selectError) {
            console.error('Error getting current visit count:', selectError);
            return false;
        }
        
        // Update visit count and last visit
        const { error: updateError } = await supabaseClient
            .from('visitors')
            .update({
                visit_count: (currentData.visit_count || 0) + 1,
                last_visit: new Date().toISOString()
            })
            .eq('device_id', deviceId);
        
        if (updateError) {
            console.error('Error updating device visit:', updateError);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error updating device visit:', error);
        return false;
    }
}

// Initialize visitor counter
async function initVisitorCounter() {
    const deviceId = generateDeviceFingerprint();
    const visitorCountElement = document.getElementById('visitor-count');
    
    console.log('Device ID generated:', deviceId);
    
    if (!supabaseClient) {
        console.warn('Supabase not configured. Visitor counter will show 0.');
        if (visitorCountElement) {
            visitorCountElement.textContent = '0';
            visitorCountElement.style.color = '#ff6b6b';
            visitorCountElement.style.animation = 'countUp 0.8s ease-out';
        }
        return;
    }
    
    // Check if this device already visited today (using localStorage)
    const today = new Date().toDateString();
    const lastVisitKey = `lastVisit_${deviceId}`;
    const lastVisitDate = localStorage.getItem(lastVisitKey);
    
    console.log('Today:', today);
    console.log('Last visit date:', lastVisitDate);
    
    let shouldCount = false;
    
    if (lastVisitDate !== today) {
        console.log('First visit today or new device, checking database...');
        // First visit today or new device
        const hasVisited = await hasDeviceVisited(deviceId);
        console.log('Has device visited before:', hasVisited);
        
        if (!hasVisited) {
            // New device, record it
            console.log('Recording new device visit...');
            const success = await recordDeviceVisit(deviceId);
            console.log('Record success:', success);
            shouldCount = success;
        } else {
            // Existing device, update visit count
            console.log('Updating existing device visit...');
            const success = await updateDeviceVisit(deviceId);
            console.log('Update success:', success);
            shouldCount = success;
        }
        
        // Mark as visited today
        localStorage.setItem(lastVisitKey, today);
        console.log('Marked as visited today');
    } else {
        console.log('Device already visited today, skipping count');
    }
    
    // Always show total count
    console.log('Fetching total visitor count...');
    const totalCount = await getVisitorCount();
    console.log('Total visitor count:', totalCount);
    
    if (visitorCountElement) {
        visitorCountElement.textContent = totalCount.toLocaleString();
        
        // Add count-up animation
        visitorCountElement.style.animation = 'countUp 0.8s ease-out';
    }
    
    if (shouldCount) {
        console.log('New visit recorded for device:', deviceId);
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    initVisitorCounter();
});

// Skill hover effect
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const span = item.querySelector('span:not(.percent)');
    const percent = item.querySelector('.percent');
    const originalText = span.textContent;
    const percentText = percent.textContent;

    item.addEventListener('mouseenter', () => {
        span.textContent = percentText;
    });

    item.addEventListener('mouseleave', () => {
        span.textContent = originalText;
    });
});

console.log('Portfolio loaded successfully! 🚀');