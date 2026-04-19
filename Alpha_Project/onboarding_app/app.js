document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('onboarding-form');
    const paymentSection = document.getElementById('payment-step');
    const membershipRadios = document.querySelectorAll('input[name="membership"]');
    const fileInput = document.getElementById('payment-proof');
    const fileNameDisplay = document.getElementById('file-name-display');
    const previewContainer = document.getElementById('preview-container');
    const submitBtn = document.getElementById('submit-btn');

    // WHATSAPP REDIRECTION URL
    const WHATSAPP_LINK = "https://whatsapp.com/channel/0029Vb7P1Yw6WaKhRmK6rJ3T";
    
    // GOOGLE APPS SCRIPT URL
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyKoPtPcUxcmf3cvDEB3d8z3JTYF75ndT-4yNgcbdhRrt8BWLvWRuwBRIkP-jOOlvcb/exec"; 

    /**
     * TOGGLE PAYMENT SECTION
     */
    membershipRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'no') {
                paymentSection.classList.remove('hidden');
                validateForm();
            } else {
                paymentSection.classList.add('hidden');
                validateForm();
            }
        });
    });

    /**
     * FILE UPLOAD HANDLING & PREVIEW
     */
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (5MB limit)
            const MAX_SIZE = 5 * 1024 * 1024;
            if (file.size > MAX_SIZE) {
                alert("File is too large. Maximum size is 5MB.");
                fileInput.value = "";
                fileNameDisplay.textContent = "FILE TOO LARGE";
                return;
            }

            fileNameDisplay.textContent = file.name.toUpperCase();
            
            // Show Preview
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

    /**
     * FORM VALIDATION
     */
    function validateForm() {
        const isMember = document.querySelector('input[name="membership"]:checked')?.value;
        const fileUploaded = fileInput.files.length > 0;

        if (isMember === 'no' && !fileUploaded) {
            submitBtn.disabled = true;
            submitBtn.textContent = "UPLOAD PROOF TO CONTINUE";
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = "CONTINUE TO WHATSAPP";
        }
    }

    /**
     * SUBMISSION & REDIRECTION
     */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button to prevent double submit
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "SYNCING WITH COMMUNITY...";

        try {
            // Collect Form Data Dynamically
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Map common fields to friendly names for GAS
            data.name = data['full-name'];
            data.timestamp = new Date().toISOString();

            // Convert File to Base64 if exists
            const file = fileInput.files[0];
            if (file) {
                const base64Data = await toBase64(file);
                data.file = base64Data;
                data.fileName = file.name;
                data.fileType = file.type;
            }

            console.log("Submitting all form data to GAS...", data);

            // POST to Google Apps Script
            await fetch(GAS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            submitBtn.textContent = "SUCCESS! REDIRECTING...";
            
            // Short delay for visual confirmation
            setTimeout(() => {
                window.location.href = WHATSAPP_LINK;
            }, 1000);

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Connection error. Please check your internet or the Script URL.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    /**
     * HELPER: Convert File to Base64
     */
    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // Initial validation
    validateForm();
});
