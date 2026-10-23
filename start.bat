@echo off
title Gyurov Wood - localhost:3000
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org and run this again. & pause & exit /b 1)
echo Node version:
node -v
if not exist node_modules (
  echo Installing packages - first run takes a minute...
  call npm install || (echo npm install failed. & pause & exit /b 1)
)
echo Downloading product photos from alo.bg...
call node scripts\fetch-images.mjs
echo.
echo Starting the site at http://localhost:3000  (close this window to stop it)
rem Polling makes the dev server notice every file change on Windows
set WATCHPACK_POLLING=true
call npx next dev --webpack
pause
