#!/bin/bash

# Manual Test Script for Advanced Filter System
# This script tests the new filter endpoints and search functionality

BASE_URL="http://localhost:5000/api"

echo "=========================================="
echo "Testing Advanced Filter System"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Get Amenities
echo "Test 1: GET /filters/amenities"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/filters/amenities")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 2: Get Environments
echo "Test 2: GET /filters/environments"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/filters/environments")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 3: Get Audiences
echo "Test 3: GET /filters/audiences"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/filters/audiences")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 4: Search with price filter
echo "Test 4: GET /listings?min_price=1000000&max_price=5000000"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/listings?min_price=1000000&max_price=5000000")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 5: Search with area filter
echo "Test 5: GET /listings?min_area=20&max_area=50"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/listings?min_area=20&max_area=50")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 6: Search with amenities filter
echo "Test 6: GET /listings?amenities[]=1&amenities[]=2"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/listings?amenities[]=1&amenities[]=2")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 7: Search with review filter
echo "Test 7: GET /listings?has_review=true"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/listings?has_review=true")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

# Test 8: Combined filters
echo "Test 8: GET /listings with multiple filters"
response=$(curl -s -w "\n%{http_code}" "${BASE_URL}/listings?min_price=1000000&max_price=5000000&min_area=20&amenities[]=1")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "Response: $body" | head -c 200
    echo "..."
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
fi
echo ""

echo "=========================================="
echo "Test Complete!"
echo "=========================================="
