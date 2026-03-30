@echo off
setlocal

cd /d "%~dp0backend"
call npm.cmd start
