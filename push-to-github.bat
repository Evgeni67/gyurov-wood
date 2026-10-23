@echo off
title Gyurov Wood - pushing code to GitHub
cd /d "%~dp0"
where git >nul 2>nul || (echo Git is not installed. Get it from https://git-scm.com and run this again. & pause & exit /b 1)
if not exist .git git init -q
git config user.name >nul 2>nul || git config user.name "Evgeni67"
git config user.email >nul 2>nul || git config user.email "Evgeni67@users.noreply.github.com"
git add -A
git commit -q -m "Gyurov Wood website: Next.js, SEO, 12 products" || echo Nothing new to commit.
git branch -M main
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Evgeni67/gyurov-wood.git
echo Pushing to GitHub (sign in if a GitHub window appears)...
git push -u origin main || (echo Push failed - see the message above. & pause & exit /b 1)
echo.
echo Done: https://github.com/Evgeni67/gyurov-wood
pause
