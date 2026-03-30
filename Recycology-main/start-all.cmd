@echo off
setlocal

start "RecyWeb Backend" cmd /k "cd /d \"%~dp0backend\" && npm.cmd start"
start "RecyWeb Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm.cmd start"
