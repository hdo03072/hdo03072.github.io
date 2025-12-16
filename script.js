function calculateCareerYear() {
    // 경력 시작일: 2021년 3월 1일
    const startDate = new Date('2021-03-01');
    const today = new Date();

    // 총 경력 월수 계산 (날짜 객체 이용)
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    // 현재 날짜의 월이 시작 월보다 작거나, 같은 월이라도 날짜가 시작 날짜보다 작으면 1년차 감소 (만 나이 계산)
    if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
        years--;
        months += 12;
    }

    // 총 월수 계산 (연차 계산을 위해)
    const totalMonths = years * 12 + months;

    // N년차 계산 (4년 9개월 -> 5년차로 계산되도록)
    const careerYear = Math.floor(totalMonths / 12) + 1;

    return `주요 경력 (2021.03 ~ 현재 [${careerYear}년차])`;
}

document.addEventListener('DOMContentLoaded', function() {

    // --- Career Duration Calculation and Injection ---
    const durationElement = document.getElementById('duration');
    if (durationElement) {
        durationElement.textContent = calculateCareerYear();
    }


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