# Starlink Security Force - Recruitment System

## Overview
This system handles job applications for Starlink Security Force positions. When candidates submit applications through the website, their data is automatically saved to organized folders.

## Features
- **Contact Form Modal**: Professional application form with resume upload
- **Automatic Data Saving**: Applications are saved to `recruitment/` folder
- **Organized Structure**: Each candidate gets their own subfolder
- **File Validation**: Resume files are validated (PDF, DOC, DOCX only)
- **Data Formats**: Both JSON and text summary files are created

## Setup Instructions

### 1. Install Dependencies
```bash
# Run the setup script
./setup_server.sh

# Or manually install
npm install
```

### 2. Start the Server
```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

### 3. Access the Website
Open your browser and go to: `http://localhost:3000`

## How It Works

### Application Process
1. User clicks "Apply Now" on any job position
2. Contact form modal opens with position pre-filled
3. User fills out the form and uploads resume
4. On submission, data is sent to the server
5. Server creates a folder structure: `recruitment/CandidateName_Timestamp/`
6. All data is saved in organized format

### Folder Structure
```
recruitment/
├── John_Smith_2024-01-15T10-30-45-123Z/
│   ├── application_data.json
│   ├── summary.txt
│   └── resume.pdf
├── Jane_Doe_2024-01-15T11-45-22-456Z/
│   ├── application_data.json
│   ├── summary.txt
│   └── resume.docx
└── ...
```

### Data Files Created
- **application_data.json**: Complete application data in JSON format
- **summary.txt**: Human-readable summary of the application
- **resume.pdf/doc/docx**: The uploaded resume file

## Form Fields
- **Full Name** (required)
- **Email Address** (required)
- **Phone Number** (required)
- **Position Applied For** (auto-filled, required)
- **Years of Experience** (dropdown)
- **Resume Upload** (required, PDF/DOC/DOCX, max 5MB)
- **Cover Letter** (optional)

## Technical Details
- **Backend**: Node.js with Express
- **File Upload**: Multer middleware
- **Frontend**: Vanilla JavaScript with Fetch API
- **File Validation**: Server-side validation for file types and size
- **Error Handling**: Comprehensive error handling and user feedback

## Troubleshooting

### Server Won't Start
- Check if Node.js is installed: `node --version`
- Check if port 3000 is available
- Install dependencies: `npm install`

### File Upload Issues
- Ensure resume is PDF, DOC, or DOCX format
- Check file size (max 5MB)
- Verify recruitment folder has write permissions

### Form Submission Errors
- Check browser console for JavaScript errors
- Verify server is running on port 3000
- Check network connectivity

## Security Notes
- File uploads are validated for type and size
- Candidate names are sanitized for folder creation
- Timestamps prevent folder name conflicts
- Server validates all form data before saving

## Support
For technical issues, check the server logs and browser console for error messages.
