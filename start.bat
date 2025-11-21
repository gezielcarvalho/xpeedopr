@echo off
REM XpeedOPR Quick Start Script for Windows
REM This script helps you quickly start the application with Docker

echo.
echo ================================
echo XpeedOPR Quick Start
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not installed
    echo Please install Docker from https://docs.docker.com/get-docker/
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker Compose is not installed
    echo Please install Docker Compose from https://docs.docker.com/compose/install/
    exit /b 1
)

echo [OK] Docker is installed
echo [OK] Docker Compose is installed
echo.

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [OK] .env file created
    echo Warning: Please review and update the .env file if needed
    echo.
)

REM Ask user which mode to run
echo Select mode:
echo 1) Production (optimized builds)
echo 2) Development (with hot-reload)
set /p choice="Enter choice [1-2]: "

if "%choice%"=="1" (
    echo.
    echo Building and starting services in production mode...
    docker-compose up --build
) else if "%choice%"=="2" (
    echo.
    echo Building and starting services in development mode...
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
) else (
    echo Error: Invalid choice
    exit /b 1
)
