#!/bin/bash

# Tech Tales - GitHub Setup & Push Script
# This script initializes git and pushes to GitHub

set -e

echo "🚀 Tech Tales - GitHub Setup"
echo "=============================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Please run this script from the project root directory (where index.html is located)"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✓ Git repository initialized"
else
    echo "✓ Git repository already exists"
fi

# Configure git (optional - only if not already configured)
if [ -z "$(git config --global user.name)" ]; then
    echo ""
    echo "📝 Git not configured. Setting up git..."
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    echo "✓ Git configured"
fi

# Add all files
echo ""
echo "📤 Staging files..."
git add .
echo "✓ Files staged"

# Show status
echo ""
echo "📋 Git status:"
git status

# Create initial commit
echo ""
read -p "Enter commit message (default: 'Initial commit'): " commit_msg
commit_msg=${commit_msg:-"Initial commit"}
git commit -m "$commit_msg"
echo "✓ Commit created"

# Ask for GitHub repo URL
echo ""
echo "🔗 GitHub Repository Setup"
echo "============================"
echo ""
echo "To push to GitHub, you need a repository URL."
echo "Visit https://github.com/new to create a new repository"
echo ""
read -p "Enter your GitHub repository URL (or press Enter to skip): " repo_url

if [ -n "$repo_url" ]; then
    echo ""
    echo "Adding remote origin..."
    git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
    echo "✓ Remote origin set"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    # Try to push to main, fall back to master if it fails
    if git push -u origin main 2>/dev/null; then
        echo "✓ Successfully pushed to main branch!"
    elif git push -u origin master 2>/dev/null; then
        echo "✓ Successfully pushed to master branch!"
    else
        echo "⚠️  Push failed. You may need to:"
        echo "   1. Create a GitHub token (Settings > Developer settings > Personal access tokens)"
        echo "   2. Use 'git push -u origin main' manually"
    fi
else
    echo "⏭️  Skipped GitHub push setup"
    echo ""
    echo "To push later, use:"
    echo "  git remote add origin <your-repo-url>"
    echo "  git push -u origin main"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Make changes and commit: git commit -m 'Your message'"
echo "  2. Push to GitHub: git push"
echo "  3. Visit GitHub to verify!"
