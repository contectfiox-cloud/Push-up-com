# Product Requirements Document (PRD)

## 1. Product Overview
**Product Name:** Customer Onboarding & Membership Routing App
**Objective:** To replace a standard Google Form with a custom, branded web application that collects customer information, determines their membership status, and routes them to the appropriate WhatsApp channel based on payment verification.
**Design Theme:** High-contrast aesthetic utilizing Black, Red, and White.
**UI Framework/Styling:** Antigravity.

## 2. Target Audience
- **Existing Members:** Users who have already paid or registered and need direct access to the WhatsApp channel.
- **Non-Members (Prospects):** Users who are interested in joining, need to pay an access fee via QR code, and submit proof of payment to gain access.

## 3. User Flow & Core Logic
The application relies on a critical conditional branching logic triggered by the question: "Are you a member?"

### Branch A: User selects "Yes" (Member)
1. User lands on the web app.
2. User fills out the customer information fields.
3. User selects "Yes" to the membership question.
4. User clicks "Submit".
5. **Action:** The system captures the data and instantly redirects the user to the provided WhatsApp channel link.

### Branch B: User selects "No" (Non-Member)
1. User lands on the web app.
2. User fills out the customer information fields.
3. User selects "No" to the membership question.
4. **Action 1:** The UI dynamically expands or transitions to a "Payment Step".
5. **Action 2:** A payment QR code is displayed on the screen.
6. User scans the QR code with their payment app and completes the transaction.
7. User captures a screenshot of the successful payment.
8. User uploads the payment screenshot to the web app via a file upload field.
9. User clicks "Submit".
10. **Action 3:** The system captures the customer data and the uploaded image, then redirects the user to (or displays) the WhatsApp broadcast/channel link.

## 4. Design & UI/UX Guidelines
**Color Palette:**
- **Primary Background:** Deep Black (e.g., #0a0a0a) for a sleek, modern look.
- **Text & Containers:** Pure White (#ffffff) or off-white for high readability and stark contrast against the black background. Form fields should have white backgrounds with black text.
- **Accents & CTAs:** Bold Red (e.g., #d32f2f or #ff0000) used exclusively for primary actions (Submit buttons, "Upload Payment" buttons, and error highlights).

**Styling:** Leverage the Antigravity CSS framework to ensure a lightweight, responsive, and clean structure. Elements should be minimalist, relying on the high-contrast color scheme to guide the user's eye.

## 5. Functional Requirements
### 5.1. Data Collection (Mapped from Google Form)
The web app will replicate the data collection previously handled by the Google Form. 
*Standard Fields Expected:*
- Full Name (Text Input)
- Email Address (Email Input)
- Phone Number (Tel Input)
- Membership Status (Radio buttons or Dropdown: "Yes" / "No")

### 5.2. Dynamic UI Rendering
The payment section (QR Code display and Image Upload field) must remain hidden by default and only render in the DOM if "No" is selected for the membership status.

### 5.3. File Upload Handling
- **Accepted Formats:** .jpg, .jpeg, .png, .webp.
- **Size Limit:** Maximum 5MB per upload.
- **UI Feedback:** Display a thumbnail of the uploaded image or a success checkmark once the user selects their payment screenshot.

### 5.4. Routing & Redirection
- **WhatsApp Channel URL:** Provide a secure, hardcoded link to the WhatsApp Channel/Broadcast.
- For non-members, ensure the "Submit" button is disabled until the image upload is complete to prevent them from bypassing the payment step.

## 6. Non-Functional Requirements
- **Mobile Responsiveness:** Optimized for mobile viewports (touch-friendly buttons, legible fonts, easily scannable QR code).
- **Data Security:** Ensure the application is served over HTTPS. Uploaded payment images must be stored securely.
- **Performance:** Load in under 2 seconds. Asynchronous image upload.

## 7. Recommended Tech Stack
- **Frontend:** HTML5, CSS3 (Antigravity Framework), JavaScript (Vanilla or lightweight framework).
- **Backend / Database:** Node.js, Python (FastAPI/Flask), or a serverless function connected to a database (PostgreSQL or MongoDB).
- **Storage:** Cloud storage bucket for hosting payment screenshots.
