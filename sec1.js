class CitationsHandler {
    constructor() {
    this.citationsExpanded = false;
    this.init();
    }

    init() {
    this.bindCitationsToggle();
    this.initScrollAnimations();
    }

    bindCitationsToggle() {
    const citationsHeader = document.getElementById('citations-header');
    if (citationsHeader) {
        citationsHeader.addEventListener('click', () => {
        this.toggleCitations();
        });
    }
    }

    toggleCitations() {
    const content = document.getElementById('citations-content');
    const icon = document.getElementById('dropdown-icon');
    const citationItems = document.querySelectorAll('.citation-item');
    
    if (this.citationsExpanded) {
        // Close - Reset citation items first
        citationItems.forEach(item => {
        item.classList.remove('visible');
        });
        
        // Then close the container
        setTimeout(() => {
        content.classList.remove('expanded');
        icon.classList.remove('expanded');
        this.citationsExpanded = false;
        }, 100);
    } else {
        // Open
        content.classList.add('expanded');
        icon.classList.add('expanded');
        this.citationsExpanded = true;
        
        // Animate citations after container opens
        setTimeout(() => {
        this.animateCitations();
        }, 200);
    }
    }

    animateCitations() {
    const citationItems = document.querySelectorAll('.citation-item');
    citationItems.forEach((item, index) => {
        setTimeout(() => {
        item.classList.add('visible');
        }, index * 100);
    });
    }

    initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
        });
    }, observerOptions);

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
    }
}

// Initialize the citations handler
document.addEventListener('DOMContentLoaded', () => {
    new CitationsHandler();
});