document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling and Navigation Active State ---

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // 대상 위치로 스크롤
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Update active class for navigation (클릭 시)
            document.querySelectorAll('.main-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Intersection Observer for active navigation on scroll
    const sections = document.querySelectorAll('section, .hero'); // .hero도 포함
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 섹션의 30% 이상이 보이면 활성화
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

    // Initial active link setup (페이지 로드 시)
    const currentHash = window.location.hash;
    if (currentHash) {
        document.querySelector(`.main-nav a[href="${currentHash}"]`)?.classList.add('active');
    } else {
        // Default to 'Hero' as active if no hash
        document.querySelector('.main-nav a[href="#hero"]') && document.querySelector('.main-nav a[href="#hero"]').classList.add('active');
    }


    // --- Accordion Toggle Script (Projects Section) ---

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.dataset.target;
            const content = document.getElementById(targetId);
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // 현재 헤더의 상태 토글
            header.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-expanded', !isExpanded);

            // 컨텐츠의 max-height를 조절하여 애니메이션 효과 구현
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