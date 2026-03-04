# ATS Resume Scorer API

Professional, modular FastAPI application for AI-powered resume analysis.

## 📁 Project Structure

```
ats_api/
├── main.py                          # FastAPI app entry point
├── requirements.txt                  # Python dependencies
├── .env.example                      # Environment variables template
├── README.md                         # This file
└── app/
    ├── __init__.py
    ├── config.py                     # Configuration & settings
    ├── routes/                       # API endpoints
    │   ├── __init__.py
    │   ├── health.py                 # Health check endpoints
    │   └── analysis.py               # Resume analysis endpoints
    ├── services/                     # Business logic
    │   ├── __init__.py
    │   ├── groq_service.py           # Groq AI integration
    │   ├── gemini_service.py         # Gemini AI integration
    │   └── analyzer_service.py       # Orchestrates analysis
    └── utils/                        # Utilities
        ├── __init__.py
        ├── rate_limiter.py           # Rate limiting logic
        └── file_processor.py         # PDF/DOCX processing
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd ats_api
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit .env with your API keys
# Windows: notepad .env
# Mac/Linux: nano .env
```

Add your keys:
```env
GROQ_API_KEY=your_actual_groq_key
GEMINI_API_KEY=your_actual_gemini_key
```

### 3. Run the API

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload
```

### 4. Access API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/

## 📚 API Endpoints

### Health Checks

**GET /**
```bash
curl http://localhost:8000/
```

**GET /health**
```bash
curl http://localhost:8000/health
```

### Rate Limiting

**GET /api/rate-limit**
```bash
curl http://localhost:8000/api/rate-limit
```

### Resume Analysis

**POST /api/analyze**

```bash
curl -X POST "http://localhost:8000/api/analyze" \
  -F "file=@resume.pdf" \
  -F "target_role=ML Internship" \
  -F "job_description=Optional JD text here..."
```

Python example:
```python
import requests

url = "http://localhost:8000/api/analyze"

files = {"file": open("resume.pdf", "rb")}
data = {
    "target_role": "ML Internship",
    "job_description": "We are looking for..."  # Optional
}

response = requests.post(url, files=files, data=data)
result = response.json()

print(f"Score: {result['score']}/100")
print(f"Remaining requests: {result['metadata']['remaining_requests']}")
```

## ⚙️ Configuration

Edit `app/config.py` or set environment variables:

```python
# Rate Limiting
RATE_LIMIT = 7              # Requests per IP
RATE_LIMIT_HOURS = 24       # Time window

# File Upload
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc"]

# AI Models
GROQ_MODEL = "llama-3.3-70b-versatile"
GEMINI_MODEL = "gemini-2.5-flash"
```

## 🔧 Development

### Project Structure Explained

**Routes** (`app/routes/`)
- Handle HTTP requests/responses
- Validate input
- Call services
- Return formatted responses

**Services** (`app/services/`)
- Business logic
- AI API integrations
- Data processing
- Result combination

**Utils** (`app/utils/`)
- Helper functions
- Rate limiting
- File processing
- Shared utilities

**Config** (`app/config.py`)
- Environment variables
- App settings
- Validation

### Adding New Features

1. **New endpoint**: Add to `app/routes/`
2. **New AI service**: Add to `app/services/`
3. **New utility**: Add to `app/utils/`
4. **Configuration**: Update `app/config.py`

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests (when added)
pytest
```

## 🐳 Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV GROQ_API_KEY=""
ENV GEMINI_API_KEY=""

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t ats-api .
docker run -p 8000:8000 \
  -e GROQ_API_KEY="your_key" \
  -e GEMINI_API_KEY="your_key" \
  ats-api
```

## 🚀 Production Deployment

### Using Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Cloud Platforms

**Railway / Render / Heroku:**
1. Connect GitHub repo
2. Set environment variables in dashboard
3. Deploy automatically

**AWS / GCP / Azure:**
1. Use Docker container
2. Set up load balancer
3. Configure auto-scaling

### Production Checklist

- [ ] Use Redis for rate limiting (not in-memory)
- [ ] Add authentication/API keys
- [ ] Enable HTTPS
- [ ] Set up logging and monitoring
- [ ] Configure CORS for specific domains
- [ ] Add database for analytics
- [ ] Implement caching
- [ ] Set up CI/CD pipeline

## 📊 Response Format

```json
{
  "score": 88,
  "inferred_context": "ML Internship / Entry-Level",
  "details": {
    "formatting": {
      "score": 92,
      "visual_assessment": {
        "layout": "Single-column layout, ATS-friendly",
        "typography": "Clean serif font, professional",
        "spacing": "Excellent white space balance",
        "ats_compatibility": "Highly compatible with ATS systems"
      },
      "strengths": ["Clear section headers", "Consistent formatting"],
      "issues": ["Consider breaking summary into bullets"]
    },
    "keywords": {
      "score": 85,
      "found": ["Python", "Machine Learning", "TensorFlow", ...],
      "missing": ["Cloud Computing", "Docker"],
      "jd_match_percentage": null
    },
    "sections": {
      "score": 90,
      "present": ["Education", "Skills", "Projects"],
      "missing": ["Work Experience"],
      "notes": "Missing work experience is acceptable for internship"
    },
    "content_quality": {
      "score": 88,
      "strengths": ["Strong technical skills", "Clear project descriptions"],
      "improvements": ["Add quantifiable metrics", "Expand on impact"]
    },
    "recommendations": [
      "Add specific metrics to projects (accuracy %, dataset size)",
      "Include cloud technologies if applying to cloud roles",
      "Tailor summary to specific job descriptions"
    ]
  },
  "metadata": {
    "remaining_requests": 6,
    "filename": "resume.pdf",
    "timestamp": "2026-03-04T15:30:00",
    "ip": "127.0.0.1"
  }
}
```

## 🔒 Security

- API keys stored in environment variables
- Rate limiting per IP address
- File size validation
- File type validation
- Error messages don't leak sensitive info

## 🛠️ Troubleshooting

**"API keys not configured"**
- Set GROQ_API_KEY and GEMINI_API_KEY in `.env` or environment

**"Rate limit exceeded"**
- Wait 24 hours or change IP address
- For production: implement user authentication with per-user limits

**"Could not extract text from file"**
- Ensure PDF/DOCX is not corrupted
- Check file is not password-protected
- Verify file size is under 10MB

**Import errors**
- Run `pip install -r requirements.txt`
- Check Python version (3.11+ recommended)

## 📝 License

MIT License - Feel free to use in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📮 Support

For issues or questions:
- Check `/docs` endpoint for API documentation
- Review this README
- Contact: [your-email@example.com]
