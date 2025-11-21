#!/bin/bash

# XpeedOPR Quick Start Script
# This script helps you quickly start the application with Docker

set -e

echo "🚀 XpeedOPR Quick Start"
echo "======================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed"
    echo "Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker is installed"
echo "✅ Docker Compose is installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please review and update the .env file if needed"
    echo ""
fi

# Ask user which mode to run
echo "Select mode:"
echo "1) Production (optimized builds)"
echo "2) Development (with hot-reload)"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo ""
        echo "🏗️  Building and starting services in production mode..."
        docker-compose up --build
        ;;
    2)
        echo ""
        echo "🏗️  Building and starting services in development mode..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
