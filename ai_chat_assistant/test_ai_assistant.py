#!/usr/bin/env python3
"""
Sudev Basti AI Portfolio Assistant - Python Test Script
Tests the Gemini AI integration with your comprehensive system prompt
"""

import requests
import json
import time
from typing import List, Dict

class SudevPortfolioAI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        self.system_prompt = self._load_system_prompt()
        
    def _load_system_prompt(self) -> str:
        """Load the comprehensive system prompt for Sudev Basti"""
        return """You are an expert AI assistant representing SUDEV BASTI, a B.E. AIML engineering student with hands-on experience in Python, SQL, and ML frameworks. You provide accurate, professional, and detailed responses about Sudev's educational background, projects, internships, skills, and achievements.

CORE PERSONA:
- Name: SUDEV BASTI
- Status: B.E. AIML Engineering Student  
- Email: sudevbasti0717@gmail.com
- Summary: Passionate about building scalable AI solutions with experience across domains

EDUCATION:
- B.E. AIML at SDM College of Engineering and Technology, Dharwad (2022-2026, CGPA: 7.9)
- Minor in AI at IIT Ropar (NOV 2024 – DEC 2025)

SKILLS: Python, C, SQL, Java, TensorFlow, PyTorch, Scikit-learn, OpenCV, YOLOv8, CNN, LSTM, Transformers, Flask, FastAPI, React, Docker

PROJECTS:

1. NETWORK INTRUSION DETECTION SYSTEM (NIDS)
- AI-powered cybersecurity system using CNN + LSTM hybrid
- 96% accuracy, <100ms latency, handles 1M+ records
- Flask API with real-time dashboard
- Datasets: NSL-KDD, CICIDS
- Strong performance on DoS attacks, challenges with rare R2L/U2R attacks

2. AI-BASED INDIAN ROAD POTHOLE DETECTION  
- YOLOv8 + CNN + Transformer hybrid model
- Custom dataset: 2,000+ images with region-specific keywords
- 92% accuracy vs 60% with foreign datasets
- Real-time detection with reduced false positives
- Handles shadows, water patches, lighting variations

3. HATE SPEECH DETECTION (ICON 2024 - 3rd Place)
- Multilingual system for Hindi-English code-mixed text
- TF-IDF + Random Forest + SMOTE for class imbalance
- 78% fake news accuracy, 77%+ F1 for hate speech
- Published research paper, 3rd place Task A, 13th place Task B

4. LAW GPT 2.0 - AI LEGAL ASSISTANT
- Production-ready system with 163,504+ legal records
- FastAPI backend + React frontend + Google Gemini AI
- Supports 12 Indian languages, semantic search
- 90%+ English accuracy, 80%+ Hindi accuracy, <5s response
- Deployed: law-gpt-professional.web.app

INTERNSHIP: ML Intern at IIIT Dharwad (Hate Speech Detection project)

ACHIEVEMENTS: ICON 2024 3rd place, Research publication, Department Coordinator INSIGNIA 24

RESPONSE GUIDELINES:
- Provide brief (1-2 sentences), medium (4-6 sentences), or detailed responses based on query complexity
- Include specific metrics and technical details
- Maintain professional, knowledgeable tone
- Connect projects to demonstrate practical skills application"""

    def ask_question(self, question: str) -> Dict:
        """Send a question to the AI assistant and get response"""
        try:
            prompt = f"{self.system_prompt}\n\nUser Question: {question}\n\nProvide a helpful, accurate response about Sudev Basti's portfolio:"
            
            payload = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 40,
                    "topP": 0.95,
                    "maxOutputTokens": 1000,
                }
            }
            
            start_time = time.time()
            response = requests.post(self.api_url, json=payload, timeout=30)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if data.get('candidates') and data['candidates'][0].get('content'):
                    ai_response = data['candidates'][0]['content']['parts'][0]['text']
                    return {
                        "success": True,
                        "response": ai_response,
                        "response_time": round(response_time, 2),
                        "question": question
                    }
                else:
                    return {
                        "success": False,
                        "error": "Invalid response format",
                        "raw_response": data
                    }
            else:
                return {
                    "success": False,
                    "error": f"HTTP {response.status_code}: {response.text}",
                    "response_time": round(response_time, 2)
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def run_comprehensive_test(self) -> None:
        """Run a comprehensive test of the AI assistant"""
        print("🚀 SUDEV BASTI AI PORTFOLIO ASSISTANT - COMPREHENSIVE TEST")
        print("=" * 65)
        
        # Test questions covering different aspects
        test_questions = [
            {
                "category": "Projects Overview",
                "question": "Tell me about your projects",
                "expected_keywords": ["NIDS", "pothole", "hate speech", "LAW GPT"]
            },
            {
                "category": "Technical Details - NIDS",
                "question": "Explain the NIDS architecture in detail",
                "expected_keywords": ["CNN", "LSTM", "96%", "accuracy", "Flask"]
            },
            {
                "category": "Comparison Analysis",
                "question": "How does your pothole detection compare to foreign datasets?",
                "expected_keywords": ["92%", "60%", "Indian", "foreign", "YOLOv8"]
            },
            {
                "category": "Skills & Expertise",
                "question": "What machine learning skills do you have?",
                "expected_keywords": ["Python", "TensorFlow", "PyTorch", "CNN", "LSTM"]
            },
            {
                "category": "Achievements",
                "question": "What are your major achievements?",
                "expected_keywords": ["ICON 2024", "3rd place", "research paper", "publication"]
            },
            {
                "category": "Law GPT Details",
                "question": "How does LAW GPT 2.0 work with multiple languages?",
                "expected_keywords": ["12 languages", "semantic search", "163,504", "Hindi"]
            }
        ]
        
        results = []
        
        for i, test in enumerate(test_questions, 1):
            print(f"\n📋 Test {i}/6: {test['category']}")
            print(f"❓ Question: {test['question']}")
            print("-" * 50)
            
            result = self.ask_question(test['question'])
            
            if result['success']:
                response = result['response']
                response_time = result['response_time']
                
                print(f"✅ Response received in {response_time}s")
                print(f"📝 Response: {response[:200]}...")
                
                # Check for expected keywords
                keywords_found = []
                for keyword in test['expected_keywords']:
                    if keyword.lower() in response.lower():
                        keywords_found.append(keyword)
                
                keyword_score = len(keywords_found) / len(test['expected_keywords']) * 100
                
                print(f"🎯 Keyword Coverage: {keyword_score:.1f}% ({len(keywords_found)}/{len(test['expected_keywords'])})")
                print(f"🔑 Found: {', '.join(keywords_found)}")
                
                results.append({
                    "test": test['category'],
                    "success": True,
                    "response_time": response_time,
                    "keyword_score": keyword_score,
                    "response_length": len(response)
                })
                
            else:
                print(f"❌ Error: {result['error']}")
                results.append({
                    "test": test['category'],
                    "success": False,
                    "error": result['error']
                })
            
            # Brief pause between requests
            time.sleep(1)
        
        # Summary
        self._print_test_summary(results)
    
    def _print_test_summary(self, results: List[Dict]) -> None:
        """Print comprehensive test summary"""
        print("\n" + "=" * 65)
        print("📊 TEST SUMMARY & PERFORMANCE ANALYSIS")
        print("=" * 65)
        
        successful_tests = [r for r in results if r['success']]
        failed_tests = [r for r in results if not r['success']]
        
        print(f"✅ Successful Tests: {len(successful_tests)}/{len(results)}")
        print(f"❌ Failed Tests: {len(failed_tests)}")
        
        if successful_tests:
            avg_response_time = sum(r['response_time'] for r in successful_tests) / len(successful_tests)
            avg_keyword_score = sum(r['keyword_score'] for r in successful_tests) / len(successful_tests)
            avg_response_length = sum(r['response_length'] for r in successful_tests) / len(successful_tests)
            
            print(f"⏱️  Average Response Time: {avg_response_time:.2f}s")
            print(f"🎯 Average Keyword Coverage: {avg_keyword_score:.1f}%")
            print(f"📝 Average Response Length: {avg_response_length:.0f} characters")
            
            print(f"\n📈 PERFORMANCE METRICS:")
            print(f"   • API Response Speed: {'🟢 Excellent' if avg_response_time < 3 else '🟡 Good' if avg_response_time < 5 else '🔴 Needs Improvement'}")
            print(f"   • Content Accuracy: {'🟢 Excellent' if avg_keyword_score > 80 else '🟡 Good' if avg_keyword_score > 60 else '🔴 Needs Improvement'}")
            print(f"   • Response Completeness: {'🟢 Detailed' if avg_response_length > 500 else '🟡 Moderate' if avg_response_length > 200 else '🔴 Brief'}")
        
        if failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"   • {test['test']}: {test['error']}")
        
        print(f"\n✨ CONCLUSION: {'System is performing excellently!' if len(successful_tests) == len(results) and (successful_tests and sum(r['keyword_score'] for r in successful_tests) / len(successful_tests) > 75) else 'System needs some adjustments.'}")

def main():
    """Main function to run the test"""
    API_KEY = "AIzaSyBcUxDliBGtoj4gRASV1xRlNBRgnsCDpgM"
    
    print("🔧 Initializing Sudev Basti AI Portfolio Assistant...")
    assistant = SudevPortfolioAI(API_KEY)
    
    print("🧪 Starting comprehensive testing...")
    assistant.run_comprehensive_test()
    
    print(f"\n🎉 Testing completed! Check the HTML interface at:")
    print(f"📁 File: e:\\sudevbasti\\ai_chat_assistant\\live_test_chat.html")
    print(f"🌐 Open it in your browser to interact with the AI assistant!")

if __name__ == "__main__":
    main()