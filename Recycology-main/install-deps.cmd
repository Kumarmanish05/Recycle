@echo off
setlocal

cd /d "%~dp0backend"
call npm.cmd install
if errorlevel 1 exit /b %errorlevel%

cd /d "%~dp0frontend"
call npm.cmd install
if errorlevel 1 exit /b %errorlevel%

echo Dependencies installed for backend and frontend.
