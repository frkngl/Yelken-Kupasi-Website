document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hamburger Menü ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active', isActive); // hamburger ile senkron kal
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                hamburger.classList.remove('is-active');
                navMenu.classList.remove('is-active');
            }
        });
    }

    // --- 2. Header Scroll Efekti ---
    const header = document.querySelector('.site-header');

    // pathname değişmeyeceği için bir kez hesapla, closure'da tut
    const { pathname } = window.location;

    // Ana sayfa kontrolleri
    const isHomePage = pathname === '/' ||
        pathname === '/Yelken-Kupasi-Website/' ||
        pathname.endsWith('index.html');

    // Inter-Company (Şirketler Arası) sayfası kontrolü
    const isInterCompanyPage = pathname.endsWith('inter-company-sailing-cup.html');

    // YENİ EKLENEN: Company-Internal (Şirket İçi) sayfası kontrolü
    const isInternalCompanyPage = pathname.endsWith('company-internal-sailing-cup.html');

    // Scroll efekti ilgili sayfalarda çalışacak şekilde güncellendi:
    if (header && (isHomePage || isInterCompanyPage || isInternalCompanyPage)) {
        let ticking = false;

        const updateHeader = () => {
            // toggle(class, force): tek satırda hem ekle hem çıkar, DOM write'ı azaltır
            header.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
        };

        // İlk yüklemede durumu senkronize et
        updateHeader();

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }
});