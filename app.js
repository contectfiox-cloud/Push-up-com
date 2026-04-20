document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('onboarding-form');
    const paymentSection = document.getElementById('payment-step');
    const membershipRadios = document.querySelectorAll('input[name="membership"]');
    const fileInput = document.getElementById('payment-proof');
    const fileNameDisplay = document.getElementById('file-name-display');
    const previewContainer = document.getElementById('preview-container');
    const submitBtn = document.getElementById('submit-btn');

    const WHATSAPP_LINK = "https://whatsapp.com/channel/0029Vb7P1Yw6WaKhRmK6rJ3T";
    const GAS_URL = "https://script.google.com/macros/s/AKfycbymaaRwUtn1CJkWOlgZfoFDxxRwffPv0GRKvG4C42JQ7xKUoBCAGZvfnMEhP7vd4A8A/exec";

    /**
     * TOGGLE PAYMENT SECTION
     */
    membershipRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'no') {
                paymentSection.classList.remove('hidden');
            } else {
                paymentSection.classList.add('hidden');
            }
            validateForm();
        });
    });

    /**
     * FILE UPLOAD HANDLING & PREVIEW
     */
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name.toUpperCase();
                const reader = new FileReader();
                reader.onload = (event) => {
                    previewContainer.innerHTML = `<img src="${event.target.result}" alt="Payment Proof Preview">`;
                };
                reader.readAsDataURL(file);
            } else {
                fileNameDisplay.textContent = "NO FILE SELECTED";
                previewContainer.innerHTML = "";
            }
            validateForm();
        });
    }

    /**
     * FORM VALIDATION
     */
    function validateForm() {
        const isMember = document.querySelector('input[name="membership"]:checked')?.value;
        const name = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        
        let isValid = name && phone && age && gender && isMember;

        if (isMember === 'no') {
            isValid = isValid && fileInput.files.length > 0;
        }

        submitBtn.disabled = !isValid;
    }

    // Listen for input changes for validation
    form.addEventListener('input', validateForm);

    /**
     * SUBMISSION & REDIRECTION
     */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        const btnTextSpan = submitBtn.querySelector('span');
        const originalBtnText = btnTextSpan.textContent;
        btnTextSpan.textContent = "SYNCING WITH COMMUNITY...";

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            data.timestamp = new Date().toISOString();

            const file = fileInput.files[0];
            if (file) {
                data.file = await toBase64(file);
                data.fileName = file.name;
                data.fileType = file.type;
            }

            await fetch(GAS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            btnTextSpan.textContent = "SUCCESS! REDIRECTING...";
            
            setTimeout(() => {
                window.location.href = WHATSAPP_LINK;
            }, 1000);

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Connection error. Please try again.");
            submitBtn.disabled = false;
            btnTextSpan.textContent = originalBtnText;
        }
    });

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});
