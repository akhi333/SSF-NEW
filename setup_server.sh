#!/bin/bash

echo "Setting up Starlink Security Force Recruitment Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create recruitment folder
echo "Creating recruitment folder..."
mkdir -p recruitment

echo "Setup complete!"
echo ""
echo "To start the server, run:"
echo "npm start"
echo ""
echo "Or for development with auto-restart:"
echo "npm run dev"
echo ""
echo "The server will be available at: http://localhost:3000"
