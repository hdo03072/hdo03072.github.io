document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Update active class for navigation
            document.querySelectorAll('.main-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Intersection Observer for active navigation on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Percentage of section visible before activating
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Set initial active link if page loaded at specific section
    const currentHash = window.location.hash;
    if (currentHash) {
        document.querySelector(`.main-nav a[href="${currentHash}"]`)?.classList.add('active');
    } else {
        // Default to 'About' or 'Hero' as active if no hash
        document.querySelector('.main-nav a[href="#hero"]') && document.querySelector('.main-nav a[href="#hero"]').classList.add('active');
    }
});