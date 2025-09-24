#!/usr/bin/env python3
"""
Backend script to save job application data to recruitment folder
"""

import os
import json
import shutil
from datetime import datetime
import sys

def save_application_data(form_data, resume_file_path=None):
    """
    Save application data to recruitment folder with candidate name subfolder
    """
    try:
        # Create recruitment folder if it doesn't exist
        recruitment_folder = "/Users/makshaykumar/Desktop/Exp_Glance/SSF/recruitment"
        if not os.path.exists(recruitment_folder):
            os.makedirs(recruitment_folder)
        
        # Create candidate folder using name and timestamp
        candidate_name = form_data.get('name', 'Unknown').replace(' ', '_')
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        candidate_folder = os.path.join(recruitment_folder, f"{candidate_name}_{timestamp}")
        os.makedirs(candidate_folder, exist_ok=True)
        
        # Save form data as JSON
        application_data = {
            'candidate_name': form_data.get('name', ''),
            'email': form_data.get('email', ''),
            'phone': form_data.get('phone', ''),
            'position': form_data.get('position', ''),
            'experience': form_data.get('experience', ''),
            'message': form_data.get('message', ''),
            'application_date': datetime.now().isoformat(),
            'resume_filename': os.path.basename(resume_file_path) if resume_file_path else 'No resume uploaded'
        }
        
        # Save application data
        json_file = os.path.join(candidate_folder, 'application_data.json')
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(application_data, f, indent=2, ensure_ascii=False)
        
        # Copy resume file if provided
        if resume_file_path and os.path.exists(resume_file_path):
            resume_dest = os.path.join(candidate_folder, os.path.basename(resume_file_path))
            shutil.copy2(resume_file_path, resume_dest)
        
        # Create a summary file
        summary_file = os.path.join(candidate_folder, 'summary.txt')
        with open(summary_file, 'w', encoding='utf-8') as f:
            f.write(f"Job Application Summary\n")
            f.write(f"=====================\n\n")
            f.write(f"Candidate Name: {application_data['candidate_name']}\n")
            f.write(f"Email: {application_data['email']}\n")
            f.write(f"Phone: {application_data['phone']}\n")
            f.write(f"Position Applied: {application_data['position']}\n")
            f.write(f"Experience: {application_data['experience']}\n")
            f.write(f"Application Date: {application_data['application_date']}\n")
            f.write(f"Resume: {application_data['resume_filename']}\n\n")
            f.write(f"Cover Letter:\n{application_data['message']}\n")
        
        return True, f"Application saved successfully in {candidate_folder}"
        
    except Exception as e:
        return False, f"Error saving application: {str(e)}"

if __name__ == "__main__":
    # This script can be called from the web form
    if len(sys.argv) > 1:
        form_data = json.loads(sys.argv[1])
        resume_path = sys.argv[2] if len(sys.argv) > 2 else None
        success, message = save_application_data(form_data, resume_path)
        print(json.dumps({"success": success, "message": message}))
