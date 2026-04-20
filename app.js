document.addEventListener('DOMContentLoaded', () => {
    console.log("Alpha Community Onboarding Loaded.");

    /**
     * HOVER EFFECTS FOR QR CONTAINER
     */
    const qrContainer = document.querySelector('.qr-container');
    if (qrContainer) {
        qrContainer.addEventListener('mouseenter', () => {
            qrContainer.style.transform = 'translateY(-10px) scale(1.02)';
            qrContainer.style.boxShadow = '0 30px 60px rgba(255, 0, 0, 0.2)';
        });

        qrContainer.addEventListener('mouseleave', () => {
            qrContainer.style.transform = 'translateY(0) scale(1)';
            qrContainer.style.boxShadow = 'none';
        });
    }

    /**
     * BUTTON INTERACTION
     */
    const primaryBtn = document.querySelector('.primary-btn');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', () => {
            console.log("User redirected to WhatsApp Channel.");
        });
    }
});
