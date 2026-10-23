@echo off
title Gyurov Wood - publishing to Netlify
rem Builds from a clean copy so a running "npm run dev" cannot lock the .next folder.
set SITE_ID=02fd5edc-d769-4dae-a416-a4e4b227e0f7
set NEXT_PUBLIC_SITE_URL=https://gyurov-wood.netlify.app
set BROWSER=none
set BUILD=%TEMP%\gyurov-wood-build
echo Copying the project to a clean build folder...
robocopy "%~dp0." "%BUILD%" /MIR /XD node_modules .next .netlify .git /NFL /NDL /NJH /NJS /NP
if errorlevel 8 (echo Copy failed. & pause & exit /b 1)
cd /d "%BUILD%"
echo Installing packages...
call npm install --no-audit --no-fund || (echo npm install failed. & pause & exit /b 1)
echo.
echo Checking Netlify login (if a link appears, open it and click Authorize)...
call npx --yes netlify-cli@latest login || (echo Login failed. & pause & exit /b 1)
echo.
echo Building and publishing the site...
call npx --yes netlify-cli@latest deploy --build --prod --site %SITE_ID%
if errorlevel 1 (echo Publishing failed - see the message above. & pause & exit /b 1)
echo.
echo Done. Your live site: https://gyurov-wood.netlify.app
pause
