# Quick GitHub Push Guide

## Automated Setup (Recommended)

Run the provided bash script:

```bash
chmod +x github-push.sh
./github-push.sh
```

This will:
- Initialize git repository
- Configure git (if needed)
- Stage all files
- Create initial commit
- Push to GitHub (with your repo URL)

## Manual Setup

If you prefer to do it manually:

### 1. Initialize Git
```bash
git init
```

### 2. Configure Git (first time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Stage Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: Tech Tales blogging platform"
```

### 5. Create Repository on GitHub
- Go to https://github.com/new
- Create new repository (don't add README, .gitignore, or license)
- Copy the repository URL

### 6. Add Remote & Push
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Verify Setup

Check your repository:
```bash
git remote -v
git log
```

## Authentication Issues?

If you get authentication errors:

1. **Using HTTPS**: Use a Personal Access Token as password
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token with 'repo' scope
   - Use token as password when prompted

2. **Using SSH** (recommended for future pushes):
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   # Follow prompts, then add public key to GitHub Settings > SSH Keys
   git remote set-url origin git@github.com:username/repo.git
   ```

## Future Commits

```bash
# Make changes...
git add .
git commit -m "Your commit message"
git push
```

## Useful Git Commands

```bash
git status              # Check status
git log                 # View commit history
git branch -a           # List all branches
git pull                # Get latest from remote
git clone <url>         # Clone repository
```

---

Happy coding! 🚀
