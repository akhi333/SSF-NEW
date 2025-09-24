# Formspree Integration Guide

## 🚀 **Quick Setup for GitHub Pages Forms**

### **Step 1: Create Formspree Account**
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### **Step 2: Create Forms**
1. **Contact Form**: Create a new form for general inquiries
2. **Job Application Form**: Create another form for job applications
3. **Training Contact Form**: Create a third form for training inquiries

### **Step 3: Get Form Endpoints**
After creating forms, you'll get URLs like:
- Contact Form: `https://formspree.io/f/[your-form-id]`
- Job Application: `https://formspree.io/f/[your-job-form-id]`
- Training Contact: `https://formspree.io/f/[your-training-form-id]`

### **Step 4: Update Your HTML Files**

#### **For Contact Form (contact.html):**
```html
<form class="contact-form" id="mainContactForm" action="https://formspree.io/f/[your-contact-form-id]" method="POST">
```

#### **For Job Application (recruitments.html):**
```html
<form id="jobApplicationForm" action="https://formspree.io/f/[your-job-form-id]" method="POST" enctype="multipart/form-data">
```

#### **For Training Contact (training.html):**
```html
<form id="trainingContactForm" action="https://formspree.io/f/[your-training-form-id]" method="POST">
```

### **Step 5: Test Your Forms**
1. Deploy to GitHub Pages
2. Test each form submission
3. Check your Formspree dashboard for submissions

## 📧 **Formspree Features**

### **Free Plan Includes:**
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ Spam protection
- ✅ File uploads (up to 10MB)
- ✅ Custom redirect pages

### **Paid Plans:**
- More submissions
- Advanced features
- Custom domains
- API access

## 🔧 **Alternative Solutions**

### **Option 1: Netlify Forms**
1. Deploy to Netlify instead of GitHub Pages
2. Netlify automatically handles forms
3. No additional setup required

### **Option 2: Vercel**
1. Deploy to Vercel
2. Add serverless functions
3. Keep your Node.js functionality

### **Option 3: Custom Backend**
1. Deploy your Node.js server
2. Use services like Heroku, DigitalOcean, or AWS
3. Keep your current functionality

## 🎯 **Recommended Approach**

**For immediate solution**: Use Formspree
**For long-term**: Consider Netlify or Vercel for better integration

---

**Your forms will work perfectly on GitHub Pages with Formspree! 🚀**
