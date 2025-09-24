const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Create recruitment folder if it doesn't exist
const recruitmentFolder = path.join(__dirname, 'recruitment');
if (!fs.existsSync(recruitmentFolder)) {
    fs.mkdirSync(recruitmentFolder, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use a temporary folder first, then move files later
        cb(null, recruitmentFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExt = path.extname(file.originalname).toLowerCase();
        
        if (allowedTypes.includes(fileExt)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
        }
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit-application', upload.single('resume'), (req, res) => {
    try {
        const { name, email, phone, position, experience, message } = req.body;
        const resumeFile = req.file;
        
        // Create candidate folder path
        const candidateName = name.replace(/\s+/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const candidateFolder = path.join(recruitmentFolder, `${candidateName}_${timestamp}`);
        
        // Ensure the candidate folder exists
        if (!fs.existsSync(candidateFolder)) {
            fs.mkdirSync(candidateFolder, { recursive: true });
            console.log(`Created candidate folder: ${candidateFolder}`);
        }
        
        // Create application data object
        const applicationData = {
            candidate_name: name,
            email: email,
            phone: phone,
            position: position,
            experience: experience,
            message: message,
            application_date: new Date().toISOString(),
            resume_filename: resumeFile ? resumeFile.originalname : 'No resume uploaded'
        };
        
        // Move resume file to candidate folder if it exists
        if (resumeFile) {
            const resumeSource = path.join(recruitmentFolder, resumeFile.originalname);
            const resumeDest = path.join(candidateFolder, resumeFile.originalname);
            
            if (fs.existsSync(resumeSource)) {
                fs.renameSync(resumeSource, resumeDest);
            }
        }
        
        // Save application data as JSON
        const jsonFile = path.join(candidateFolder, 'application_data.json');
        console.log(`Writing JSON file to: ${jsonFile}`);
        fs.writeFileSync(jsonFile, JSON.stringify(applicationData, null, 2));
        console.log('JSON file written successfully');
        
        // Create summary file
        const summaryFile = path.join(candidateFolder, 'summary.txt');
        const summaryContent = `Job Application Summary
=====================

Candidate Name: ${name}
Email: ${email}
Phone: ${phone}
Position Applied: ${position}
Experience: ${experience}
Application Date: ${new Date().toISOString()}
Resume: ${resumeFile ? resumeFile.originalname : 'No resume uploaded'}

Cover Letter:
${message || 'No cover letter provided'}`;
        
        console.log(`Writing summary file to: ${summaryFile}`);
        fs.writeFileSync(summaryFile, summaryContent);
        console.log('Summary file written successfully');
        
        res.json({
            success: true,
            message: `Application saved successfully in recruitment/${candidateName}_${timestamp}/`,
            folderPath: `recruitment/${candidateName}_${timestamp}/`
        });
        
    } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving application: ' + error.message
        });
    }
});

// Contact form endpoint
app.post('/submit-contact', (req, res) => {
    try {
        const { name, email, phone, message, inquiry_type, submission_date } = req.body;
        
        // Create contacts folder if it doesn't exist
        const contactsFolder = path.join(__dirname, 'contacts');
        if (!fs.existsSync(contactsFolder)) {
            fs.mkdirSync(contactsFolder, { recursive: true });
            console.log(`Created contacts folder: ${contactsFolder}`);
        }
        
        // Create contact folder path
        const contactName = name.replace(/\s+/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const contactFolder = path.join(contactsFolder, `${contactName}_${timestamp}`);
        
        // Ensure the contact folder exists
        if (!fs.existsSync(contactFolder)) {
            fs.mkdirSync(contactFolder, { recursive: true });
            console.log(`Created contact folder: ${contactFolder}`);
        }
        
        // Create contact data object
        const contactData = {
            contact_name: name,
            email: email,
            phone: phone,
            message: message,
            inquiry_type: inquiry_type,
            submission_date: submission_date
        };
        
        // Save contact data as JSON
        const jsonFile = path.join(contactFolder, 'contact_data.json');
        console.log(`Writing contact JSON file to: ${jsonFile}`);
        fs.writeFileSync(jsonFile, JSON.stringify(contactData, null, 2));
        console.log('Contact JSON file written successfully');
        
        // Create summary file
        const summaryFile = path.join(contactFolder, 'summary.txt');
        const summaryContent = `Contact Inquiry Summary
========================

Contact Name: ${name}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiry_type}
Submission Date: ${submission_date}

Message:
${message}`;
        
        console.log(`Writing contact summary file to: ${summaryFile}`);
        fs.writeFileSync(summaryFile, summaryContent);
        console.log('Contact summary file written successfully');
        
        res.json({
            success: true,
            message: `Contact inquiry saved successfully in contacts/${contactName}_${timestamp}/`,
            folderPath: `contacts/${contactName}_${timestamp}/`
        });
        
    } catch (error) {
        console.error('Error saving contact inquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving contact inquiry: ' + error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Recruitment folder: ${recruitmentFolder}`);
    console.log(`Contacts folder: ${path.join(__dirname, 'contacts')}`);
});
