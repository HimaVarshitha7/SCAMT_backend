This backend matches the uploaded React frontend.
Install dependencies with `npm install`.
Copy .env.example to .env and set MONGO_URI and JWT_SECRET.
Run with `npm run dev`.
Auth endpoints:
POST /api/auth/register
POST /api/auth/login
Complaints endpoints (require x-auth-token header):
POST /api/complaints
GET /api/complaints
Feedback endpoints (require x-auth-token):
POST /api/feedback
GET /api/feedback
Services endpoints:
GET /api/services
POST /api/services
