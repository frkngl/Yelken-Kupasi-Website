// Tüm akordeonları kapsayan tek bir ana elemanı seçiyoruz
const faqContainer = document.querySelector('.faq-accordion');

// Sayfada bu alan varsa kodu çalıştır (hata vermemesi için güvenlik önlemi)
if (faqContainer) {
    // Sadece ana kapsayıcıya TEK BİR event listener ekliyoruz
    faqContainer.addEventListener('click', (e) => {

        // Tıklanan yerin bir soru butonu (veya butonun içindeki span/svg) olup olmadığını kontrol et
        const questionButton = e.target.closest('.faq-question');

        // Eğer tıklanan yer buton değilse boşluksa işlemi iptal et
        if (!questionButton) return;

        // Tıklanan butonun ait olduğu ana kutuyu (faq-item) bul
        const currentItem = questionButton.closest('.faq-item');
        const isActive = currentItem.classList.contains('active');

        // Sadece 'açık olan' akordeonları bul ve kapat (Tüm DOM'u taramak yerine sadece aktifleri tarar)
        const activeItems = faqContainer.querySelectorAll('.faq-item.active');
        activeItems.forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        // Tıklanan elemanın durumunu tersine çevir (açıksa kapat, kapalıysa aç)
        currentItem.classList.toggle('active');
    });
}