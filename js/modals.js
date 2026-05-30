document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ORTAK DEĞİŞKENLER VE FONKSİYONLAR ---
    const imageModal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('expandedImg');

    // Sayfa kaydırmayı kilitleme (Zıplama yapmayan modern yöntem)
    function lockScroll() {
        // Kaydırma çubuğunun (scrollbar) genişliğini hesapla
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Sayfa kaydırmasını kapat ve scrollbar kaybolduğunda sayfanın sağa kaymasını engelle
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Sayfa kaydırma kilidini açma
    function unlockScroll() {
        // Body stillerini temizle, her şey normal akışına dönsün
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    // --- 2. STANDART MODAL FONKSİYONLARI ---
    function openCustomModal(modal) {
        if (!modal) return;
        lockScroll();
        modal.classList.add('is-open');
    }

    function closeCustomModal(modal) {
        if (!modal) return;
        modal.classList.remove('is-open');
        unlockScroll();
    }

    // --- 3. RESİM MODALI (LIGHTBOX) FONKSİYONLARI ---
    function openImageModal(imgSrc) {
        if (!imageModal || !expandedImg) return;
        lockScroll();
        expandedImg.src = imgSrc;
        // SCSS'te flex kullandığımız için burası 'flex' olmalı
        imageModal.style.display = 'flex';
    }

    function closeImageModal() {
        if (!imageModal) return;
        imageModal.style.display = 'none';
        expandedImg.src = ''; // Hafızayı temizlemek için resmi boşalt
        unlockScroll();
    }

    // --- 4. MERKEZİ TIKLAMA (CLICK) DİNLEYİCİSİ ---
    document.addEventListener('click', (e) => {
        // A) Standart Modal Açma (Trigger)
        const trigger = e.target.closest('.modal-trigger');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            const targetModal = document.getElementById(trigger.getAttribute('data-modal'));
            openCustomModal(targetModal);
            return;
        }

        // B) Standart Modal Kapatma (Çarpı Butonu)
        const closeBtn = e.target.closest('.close-modal');
        if (closeBtn) {
            closeCustomModal(closeBtn.closest('.custom-modal'));
            return;
        }

        // C) Standart Modal Kapatma (Dış Arka Plana Tıklama)
        if (e.target.classList.contains('custom-modal') && e.target.classList.contains('is-open')) {
            closeCustomModal(e.target);
            return;
        }

        // D) Resim Modalı Açma (Kart içindeki resimlere tıklama)
        const cardImg = e.target.closest('.card-image img');
        if (cardImg) {
            e.stopPropagation();
            openImageModal(cardImg.src);
            return;
        }

        // E) Resim Modalı Kapatma (Çarpı Butonu .close-btn)
        if (e.target.closest('.close-btn')) {
            closeImageModal();
            return;
        }

        // F) Resim Modalı Kapatma (Dış Arka Plana Tıklama)
        if (e.target === imageModal) {
            closeImageModal();
            return;
        }
    });

    // --- 5. MERKEZİ KLAVYE (KEYDOWN) DİNLEYİCİSİ ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // 1. Açıksa standart modalı kapat
            const openModal = document.querySelector('.custom-modal.is-open');
            if (openModal) {
                closeCustomModal(openModal);
            }

            // 2. Açıksa resim modalını kapat 
            if (imageModal && imageModal.style.display === 'flex') {
                closeImageModal();
            }
        }
    });

});