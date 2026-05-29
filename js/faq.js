document.addEventListener("DOMContentLoaded", () => {
    // Performans için sayfaya TEK BİR 'click' dinleyicisi ekliyoruz
    document.addEventListener("click", (e) => {

        // ========================================================
        // SENARYO 1: ESKİ FAQ YAPISI (.faq-question Tıklandığında)
        // ========================================================
        const questionButton = e.target.closest('.faq-question');

        if (questionButton) {
            // Tıklanan butonun ana kutusunu bul
            const currentItem = questionButton.closest('.faq-item');
            if (!currentItem) return;

            // Güvenlik: Sadece aynı gruptaki açık öğeleri kapatmak için kapsayıcıyı bul
            const faqContainer = currentItem.closest('.faq-accordion') || document;

            // Açık olan diğer öğeleri kapat
            const activeItems = faqContainer.querySelectorAll('.faq-item.active');
            activeItems.forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // Tıklanan öğeyi aç/kapat
            currentItem.classList.toggle('active');

            // Senaryo 1 çalıştıysa kodu burada kes, aşağıya inip tarayıcıyı yorma
            return;
        }

        // ========================================================
        // SENARYO 2: YENİ TAKVİM YAPISI (.faq-summary Tıklandığında)
        // ========================================================
        const summaryButton = e.target.closest('.faq-summary');

        if (summaryButton) {
            // İlgili akordeon kartını ve içerik kutusunu bul
            const acc = summaryButton.closest('.faq-accordion');
            if (!acc) return;

            const wrapper = acc.querySelector('.faq-content-wrapper');
            if (!wrapper) return;

            // Class durumunu değiştir
            acc.classList.toggle("is-open");

            // Gerçek yüksekliği hesaplayarak animasyonlu (yumuşak) açma/kapatma işlemi
            if (acc.classList.contains("is-open")) {
                wrapper.style.maxHeight = wrapper.scrollHeight + "px";
            } else {
                wrapper.style.maxHeight = "0";
            }
        }
    });
});