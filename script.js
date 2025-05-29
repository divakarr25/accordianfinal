
// script.js
class InterviewApp {
    constructor() {
        this.currentTopic = '';
        this.init();
    }

    init() {
        this.setupAccordions();
        this.setupModal();
        this.addCardAnimations();
    }

    setupAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                const target = header.getAttribute('data-target');
                const content = document.getElementById(target);
                const icon = header.querySelector('.accordion-icon');

                // Close other accordions in the same card
                const parentAccordion = header.closest('.accordion');
                const otherHeaders = parentAccordion.querySelectorAll('.accordion-header');
                const otherContents = parentAccordion.querySelectorAll('.accordion-content');

                otherHeaders.forEach(otherHeader => {
                    if (otherHeader !== header) {
                        otherHeader.classList.remove('active');
                        const otherIcon = otherHeader.querySelector('.accordion-icon');
                        otherIcon.textContent = '+';
                    }
                });

                otherContents.forEach(otherContent => {
                    if (otherContent !== content) {
                        otherContent.classList.remove('active');
                    }
                });

                // Toggle current accordion
                header.classList.toggle('active');
                content.classList.toggle('active');

                if (header.classList.contains('active')) {
                    icon.textContent = '−';
                } else {
                    icon.textContent = '+';
                }

                // Add smooth animation
                this.animateAccordion(content);
            });
        });
    }

    animateAccordion(content) {
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0px';
        }
    }

    setupModal() {
        const modal = document.getElementById('navigation-modal');
        const closeBtn = document.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    addCardAnimations() {
        const cards = document.querySelectorAll('.topic-card');

        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in-up');
        });

        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
                    .fade-in-up {
                        animation: fadeInUp 0.6s ease forwards;
                        opacity: 0;
                        transform: translateY(30px);
                    }

                    @keyframes fadeInUp {
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `;
        document.head.appendChild(style);
    }

    closeModal() {
        const modal = document.getElementById('navigation-modal');
        modal.style.display = 'none';
    }
}

// Navigation functions
function navigateTo(path) {
    const topicMap = {
        'html-deep-dive': 'HTML',
        'css-deep-dive': 'CSS',
        'js-deep-dive': 'JavaScript'
    };

    const modal = document.getElementById('navigation-modal');
    const topicName = document.getElementById('topic-name');

    // Extract topic from path
    const topic = topicMap[path] || path.split('-')[0].toUpperCase();
    topicName.textContent = topic;

    // Store the path for navigation
    window.currentNavigationPath = path;

    modal.style.display = 'block';
}

function proceedNavigation() {
    const path = window.currentNavigationPath;

    // Simulate navigation with a loading effect
    const modal = document.querySelector('.modal-content');
    modal.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #667eea; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                    <h3>Loading ${path.replace('-', ' ').toUpperCase()} questions...</h3>
                    <p>Preparing comprehensive interview questions for you.</p>
                </div>
            `;

    // Add loading animation CSS
    const style = document.createElement('style');
    style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
    document.head.appendChild(style);

    // Simulate loading time and show success message
    setTimeout(() => {
        modal.innerHTML = `
                    <span class="close" onclick="closeModal()">&times;</span>
                    <div style="padding: 20px; text-align: center;">
                        <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">✓</div>
                        <h2>Navigation Successful!</h2>
                        <p>In a real application, you would now be redirected to:</p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0; font-family: monospace; color: #333;">
                            /${path}/
                        </div>
                        <p style="color: #666; font-size: 0.9rem;">This demo shows the navigation concept. The actual implementation would involve routing to dedicated question pages.</p>
                        <button class="btn-primary" onclick="closeModal()" style="margin-top: 20px; padding: 10px 30px;">Got it!</button>
                    </div>
                `;
    }, 2000);
}

function closeModal() {
    document.getElementById('navigation-modal').style.display = 'none';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InterviewApp();

    // Add some interactive touches
    const cards = document.querySelectorAll('.topic-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add touch support for mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // Simple swipe detection for cards
    if (Math.abs(diff) > 100) {
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            card.style.transform = diff > 0 ? 'translateY(-5px)' : 'translateY(5px)';
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, 200);
        });
    }
});