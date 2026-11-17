// ==========================================================================
// Titus Muchoki — Interactive Enhancements
// Clean, minimal, high-performance execution (No gimmicks)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. One-click Email Copy with feedback
    const copyBtn = document.getElementById('copyBtn');
    const copyText = document.getElementById('copyText');
    const emailToCopy = 'titotosh613@gmail.com';

    if (copyBtn && copyText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailToCopy);
                copyText.textContent = 'Copied to Clipboard!';
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    copyText.textContent = 'Copy Email';
                    copyBtn.classList.remove('copied');
                }, 2500);
            } catch (err) {
                // Fallback for browsers with strict permissions
                window.location.href = `mailto:${emailToCopy}`;
            }
        });
    }

    // 2. Active nav link indicator on scroll
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    const updateActiveNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#ffffff';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // 3. Smooth entrance reveal for key elements
    const revealTargets = document.querySelectorAll('.feature-card, .pillar-card, .capability-item, .contact-card');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
    }
});
