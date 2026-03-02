@echo off
echo ========================================
echo Royal Kiana Backend Server
echo ========================================
echo.
echo Killing any existing Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting backend server...
cd royal-kiana-backend
npm start
