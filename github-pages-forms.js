// GitHub Pages Form Handler
// This script provides fallback functionality for forms on GitHub Pages

document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submissions
    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }

    // Handle job application form
    const jobForm = document.getElementById('jobApplicationForm');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleJobApplication(this);
        });
    }

    // Handle training contact form
    const trainingForm = document.getElementById('trainingContactForm');
    if (trainingForm) {
        trainingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleTrainingContact(this);
        });
    }
});

function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage('Thank you for your inquiry! We will contact you within 24 hours.');
    
    // Log form data (for debugging)
    console.log('Contact Form Data:', data);
    
    // In a real implementation, you would:
    // 1. Send data to Formspree
    // 2. Send data to your email service
    // 3. Store in a database
}

function handleJobApplication(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage('Thank you for your job application! We will review your application and contact you soon.');
    
    // Log form data (for debugging)
    console.log('Job Application Data:', data);
    
    // In a real implementation, you would:
    // 1. Send data to Formspree
    // 2. Send data to your email service
    // 3. Store in a database
}

function handleTrainingContact(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage('Thank you for your training inquiry! We will contact you with more information.');
    
    // Log form data (for debugging)
    console.log('Training Contact Data:', data);
    
    // In a real implementation, you would:
    // 1. Send data to Formspree
    // 2. Send data to your email service
    // 3. Store in a database
}

function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Success!</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">Close</button>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Add CSS for success message
const style = document.createElement('style');
style.textContent = `
    .form-success-message .success-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .form-success-message .success-content i {
        font-size: 48px;
        color: #28a745;
        margin-bottom: 15px;
    }
    
    .form-success-message .success-content h3 {
        color: #1e3c72;
        margin-bottom: 10px;
    }
    
    .form-success-message .success-content p {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    
    .form-success-message .close-btn {
        background: #2a5298;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .form-success-message .close-btn:hover {
        background: #1e3c72;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
