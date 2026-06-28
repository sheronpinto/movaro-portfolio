#!/usr/bin/env python3
"""
Backend API tests for MOVARO portfolio
Tests all backend endpoints as specified in test_result.md
"""

import requests
import json
import os
from pymongo import MongoClient
from datetime import datetime, timedelta

# Load environment variables
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://visual-prestige.preview.emergentagent.com')
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'your_database_name')

print(f"🔧 Configuration:")
print(f"   BASE_URL: {BASE_URL}")
print(f"   MONGO_URL: {MONGO_URL}")
print(f"   DB_NAME: {DB_NAME}")
print()

def test_get_api_health():
    """Test 1: GET /api - health/info endpoint"""
    print("=" * 80)
    print("TEST 1: GET /api - health/info")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api"
        print(f"📡 Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        if 'message' not in data or 'version' not in data:
            print(f"❌ FAILED: Expected {{message, version}} in response, got {data}")
            return False
        
        if data['message'] != 'MOVARO API ready':
            print(f"❌ FAILED: Expected message 'MOVARO API ready', got '{data['message']}'")
            return False
        
        print(f"✅ PASSED: GET /api returns correct health check response")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_post_contact_valid():
    """Test 2: POST /api/contact with valid data"""
    print("\n" + "=" * 80)
    print("TEST 2: POST /api/contact with valid data")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api/contact"
        payload = {
            "name": "John Anderson",
            "email": "john.anderson@example.com",
            "projectType": "Brand Film",
            "message": "Hello, I would like to discuss a cinematic brand film project for our company."
        }
        
        print(f"📡 Request: POST {url}")
        print(f"📦 Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('success'):
            print(f"❌ FAILED: Expected success:true, got {data}")
            return False
        
        # emailSent should be false because RESEND_API_KEY is not set (graceful fallback)
        if data.get('emailSent') != False:
            print(f"⚠️  WARNING: Expected emailSent:false (graceful fallback), got {data.get('emailSent')}")
        
        print(f"✅ PASSED: POST /api/contact returns success response")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_mongodb_document():
    """Test 3: Verify MongoDB document was inserted"""
    print("\n" + "=" * 80)
    print("TEST 3: Verify MongoDB document insertion")
    print("=" * 80)
    
    try:
        print(f"📡 Connecting to MongoDB: {MONGO_URL}")
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        collection = db['contact_inquiries']
        
        # Find the most recent document (within last 2 minutes)
        two_minutes_ago = datetime.utcnow() - timedelta(minutes=2)
        doc = collection.find_one(
            {'createdAt': {'$gte': two_minutes_ago}},
            sort=[('createdAt', -1)]
        )
        
        if not doc:
            print(f"❌ FAILED: No recent document found in contact_inquiries collection")
            return False
        
        print(f"✓ Found document with ID: {doc.get('id')}")
        
        # Verify required fields
        required_fields = ['name', 'email', 'projectType', 'message', 'createdAt', 
                          'emailSent', 'resendConfigured', 'emailError']
        
        missing_fields = [field for field in required_fields if field not in doc]
        if missing_fields:
            print(f"❌ FAILED: Missing required fields: {missing_fields}")
            return False
        
        print(f"✓ All required fields present")
        print(f"✓ name: {doc['name']}")
        print(f"✓ email: {doc['email']}")
        print(f"✓ projectType: {doc['projectType']}")
        print(f"✓ emailSent: {doc['emailSent']}")
        print(f"✓ resendConfigured: {doc['resendConfigured']}")
        
        # Verify emailSent is false (graceful fallback)
        if doc['emailSent'] != False:
            print(f"❌ FAILED: Expected emailSent=false, got {doc['emailSent']}")
            return False
        
        # Verify emailError contains message about missing RESEND_API_KEY
        if not doc.get('emailError'):
            print(f"❌ FAILED: Expected emailError to be present")
            return False
        
        error_message = doc['emailError'].get('message', '')
        if 'RESEND_API_KEY' not in error_message:
            print(f"❌ FAILED: Expected emailError to mention RESEND_API_KEY, got: {error_message}")
            return False
        
        print(f"✓ emailError: {error_message}")
        print(f"✅ PASSED: MongoDB document correctly inserted with all required fields")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_post_contact_missing_field():
    """Test 4: POST /api/contact with missing 'message' field"""
    print("\n" + "=" * 80)
    print("TEST 4: POST /api/contact with missing 'message' field")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api/contact"
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "projectType": "Commercial"
            # 'message' is intentionally missing
        }
        
        print(f"📡 Request: POST {url}")
        print(f"📦 Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'error' not in data:
            print(f"❌ FAILED: Expected error field in response, got {data}")
            return False
        
        error_msg = data['error'].lower()
        if 'required' not in error_msg:
            print(f"❌ FAILED: Expected error message to mention 'required', got: {data['error']}")
            return False
        
        print(f"✅ PASSED: POST /api/contact correctly rejects missing required field")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_post_contact_invalid_json():
    """Test 5: POST /api/contact with malformed JSON"""
    print("\n" + "=" * 80)
    print("TEST 5: POST /api/contact with malformed JSON")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api/contact"
        malformed_data = "this is not json"
        
        print(f"📡 Request: POST {url}")
        print(f"📦 Payload: {malformed_data}")
        
        response = requests.post(
            url, 
            data=malformed_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'error' not in data:
            print(f"❌ FAILED: Expected error field in response, got {data}")
            return False
        
        error_msg = data['error'].lower()
        if 'json' not in error_msg:
            print(f"❌ FAILED: Expected error message to mention 'json', got: {data['error']}")
            return False
        
        print(f"✅ PASSED: POST /api/contact correctly rejects malformed JSON")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_get_contact_404():
    """Test 6: GET /api/contact should return 404"""
    print("\n" + "=" * 80)
    print("TEST 6: GET /api/contact should return 404")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api/contact"
        print(f"📡 Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 404:
            print(f"❌ FAILED: Expected status 404, got {response.status_code}")
            return False
        
        print(f"✅ PASSED: GET /api/contact correctly returns 404")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_unknown_path_404():
    """Test 7: GET /api/random-unknown should return 404"""
    print("\n" + "=" * 80)
    print("TEST 7: GET /api/random-unknown should return 404")
    print("=" * 80)
    
    try:
        url = f"{BASE_URL}/api/random-unknown"
        print(f"📡 Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Response: {response.text}")
        
        if response.status_code != 404:
            print(f"❌ FAILED: Expected status 404, got {response.status_code}")
            return False
        
        print(f"✅ PASSED: GET /api/random-unknown correctly returns 404")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("\n" + "🚀" * 40)
    print("MOVARO BACKEND API TEST SUITE")
    print("🚀" * 40 + "\n")
    
    results = []
    
    # Run tests in order
    results.append(("GET /api - health/info", test_get_api_health()))
    results.append(("POST /api/contact - valid data", test_post_contact_valid()))
    results.append(("MongoDB document verification", test_mongodb_document()))
    results.append(("POST /api/contact - missing field", test_post_contact_missing_field()))
    results.append(("POST /api/contact - invalid JSON", test_post_contact_invalid_json()))
    results.append(("GET /api/contact - 404", test_get_contact_404()))
    results.append(("GET /api/unknown - 404", test_unknown_path_404()))
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status}: {test_name}")
    
    print(f"\n📊 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {total - passed} test(s) failed")
        return 1

if __name__ == "__main__":
    exit(main())
