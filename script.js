function calculateCareerYear() {
    const startDate = new Date('2021-03-01');
    const today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
        years--;
        months += 12;
    }

    const totalMonths = years * 12 + months;
    const careerYear = Math.floor(totalMonths / 12) + 1;
    return `주요 경력 (2021.03 ~ 현재 [${careerYear}년차])`;
}

document.addEventListener('DOMContentLoaded', function() {

    const durationElement = document.getElementById('duration');
    if (durationElement) {
        durationElement.textContent = calculateCareerYear();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            document.querySelectorAll('.main-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
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

    const currentHash = window.location.hash;
    if (currentHash) {
        document.querySelector(`.main-nav a[href="${currentHash}"]`)?.classList.add('active');
    } else {
        // Default to 'Hero' as active if no hash
        document.querySelector('.main-nav a[href="#hero"]') && document.querySelector('.main-nav a[href="#hero"]').classList.add('active');
    }

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.dataset.target;
            const content = document.getElementById(targetId);
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            header.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }

            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = document.getElementById(otherHeader.dataset.target);
                    otherContent.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = null;
                }
            });
        });
    });
});