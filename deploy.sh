#!/bin/bash

# Deployment script for Nasam Frontend Dashboard
# This script builds and deploys the React dashboard to AWS S3 and CloudFront

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# AWS Configuration
AWS_PROFILE="nasam-frontend-deployer"
AWS_DEFAULT_REGION="me-south-1"

# Check if environment parameter is provided
if [ $# -ne 1 ]; then
    echo -e "${RED}❌ Usage: $0 <testing|prod>${NC}"
    echo -e "${YELLOW}Example: $0 testing${NC}"
    exit 1
fi

ENVIRONMENT=$1

# Set environment-specific variables
case "$ENVIRONMENT" in
    testing)
        S3_BUCKET="nasam-web-app-test"
        CLOUDFRONT_DISTRIBUTION_ID="E2MSZ0VBTI1QZY"
        BUILD_COMMAND="npm run build:testing"
        ENV_FILE=".env.testing"
        ;;
    prod)
        S3_BUCKET="nasam-web-app-prod"
        CLOUDFRONT_DISTRIBUTION_ID="E2AGQE672CVK3E"
        BUILD_COMMAND="npm run build:prod"
        ENV_FILE=".env.production"
        ;;
    *)
        echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
        echo -e "${YELLOW}Valid environments: testing, prod${NC}"
        exit 1
        ;;
esac

BUILD_DIR="${PROJECT_ROOT}/dist"

echo -e "${BLUE}🚀 Starting deployment to ${ENVIRONMENT} environment...${NC}"
echo -e "${YELLOW}📋 Configuration:${NC}"
echo -e "   Environment: ${ENVIRONMENT}"
echo -e "   S3 Bucket: ${S3_BUCKET}"
echo -e "   CloudFront Distribution: ${CLOUDFRONT_DISTRIBUTION_ID}"
echo -e "   Build Command: ${BUILD_COMMAND}"
echo ""

# Check if we're in the right directory
if [ ! -f "${PROJECT_ROOT}/package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found at ${PROJECT_ROOT}${NC}"
    exit 1
fi

# Check if environment file exists
if [ ! -f "${PROJECT_ROOT}/${ENV_FILE}" ]; then
    echo -e "${RED}❌ Error: Environment file ${ENV_FILE} not found${NC}"
    exit 1
fi

# Export AWS profile and region
export AWS_PROFILE
export AWS_DEFAULT_REGION

# Verify AWS credentials
echo -e "${YELLOW}🔍 Verifying AWS credentials...${NC}"
aws sts get-caller-identity --profile ${AWS_PROFILE} --output json
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ AWS credentials are invalid or not properly configured${NC}"
    echo -e "${YELLOW}Please configure the AWS profile '${AWS_PROFILE}' using 'aws configure --profile ${AWS_PROFILE}'${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS credentials verified${NC}"

# Change to project directory
cd "${PROJECT_ROOT}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Build the application
echo -e "${YELLOW}🔨 Building application for ${ENVIRONMENT}...${NC}"
$BUILD_COMMAND

# Check if build was successful
if [ ! -d "${BUILD_DIR}" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Upload files to S3
echo -e "${YELLOW}📤 Uploading files to S3 bucket: ${S3_BUCKET}...${NC}"

# Sync HTML files with no-cache headers
aws s3 sync ${BUILD_DIR}/ s3://${S3_BUCKET} \
    --profile ${AWS_PROFILE} \
    --delete \
    --exclude "*" \
    --include "*.html" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "text/html"

# Sync JS files with cache headers
aws s3 sync ${BUILD_DIR}/ s3://${S3_BUCKET} \
    --profile ${AWS_PROFILE} \
    --delete \
    --exclude "*" \
    --include "*.js" \
    --cache-control "public, max-age=31536000, immutable" \
    --content-type "application/javascript"

# Sync CSS files with cache headers
aws s3 sync ${BUILD_DIR}/ s3://${S3_BUCKET} \
    --profile ${AWS_PROFILE} \
    --delete \
    --exclude "*" \
    --include "*.css" \
    --cache-control "public, max-age=31536000, immutable" \
    --content-type "text/css"

# Sync other static assets
aws s3 sync ${BUILD_DIR}/ s3://${S3_BUCKET} \
    --profile ${AWS_PROFILE} \
    --delete \
    --exclude "*.html" \
    --exclude "*.js" \
    --exclude "*.css" \
    --cache-control "public, max-age=31536000"

# Check if upload was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded to S3 successfully${NC}"
else
    echo -e "${RED}❌ Failed to upload files to S3${NC}"
    exit 1
fi

# Create CloudFront invalidation
echo -e "${YELLOW}🔄 Creating CloudFront invalidation...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --profile ${AWS_PROFILE} \
    --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ CloudFront invalidation created with ID: ${INVALIDATION_ID}${NC}"
else
    echo -e "${RED}❌ Failed to create CloudFront invalidation${NC}"
    exit 1
fi

# Display deployment information
echo ""
echo -e "${GREEN}🎉 Deployment to ${ENVIRONMENT} completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Deployment Summary:${NC}"
echo -e "   Environment: ${ENVIRONMENT}"
echo -e "   S3 Bucket: ${S3_BUCKET}"
echo -e "   CloudFront Distribution: ${CLOUDFRONT_DISTRIBUTION_ID}"
echo -e "   Invalidation ID: ${INVALIDATION_ID}"
echo ""

if [ "$ENVIRONMENT" == "testing" ]; then
    echo -e "${GREEN}🌐 Your dashboard should be available at: https://d3nbpygm7i59vf.cloudfront.net${NC}"
else
    echo -e "${GREEN}🌐 Your dashboard should be available at: https://d1tkmfy98rj1yh.cloudfront.net${NC}"
fi

echo -e "${YELLOW}Note: CloudFront invalidation may take a few minutes to complete.${NC}"