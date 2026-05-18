#!/bin/bash
set -e

# Prompt for PAT if not already set
if [ -z "$GITHUB_PAT" ]; then
  read -rsp "GitHub Personal Access Token: " GITHUB_PAT
  echo ""
fi

REPO_URL="https://kapshyggn2007:${GITHUB_PAT}@github.com/kapshyggn2007/zokontrol-site.git"

echo "=== Cleaning previous git state ==="
rm -rf .git

echo "=== Removing nested .git inside zokontrol-site ==="
rm -rf zokontrol-site/.git

echo "=== Initialising git ==="
git init

echo "=== Configuring git ==="
git config user.email "kapshyggn2007@users.noreply.github.com"
git config user.name "kapshyggn2007"

echo "=== Creating .gitignore ==="
cat > .gitignore << 'EOF'
__pycache__/
*.pyc
.local/
attached_assets/
zipFile.zip
EOF

echo "=== Staging all files ==="
git add .

echo "=== Committing ==="
git commit -m "Initial commit: Zo Kontrol website with footer fix"

echo "=== Pushing to GitHub ==="
git branch -M main
git remote add origin "$REPO_URL"
git push -u origin main

echo ""
echo "Done! Visit: https://github.com/kapshyggn2007/zokontrol-site"
