# Testing Authentication Endpoints

## Quick Test Script

### 1. Start the Application
```bash
cd backend
mvn spring-boot:run
```

### 2. Test Endpoints

#### Register Student
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "student@test.com",
    "password": "password123",
    "role": "STUDENT",
    "rollNumber": "CS2024001",
    "department": "Computer Science",
    "year": 2,
    "semester": 4
  }'
```

#### Register Staff
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Staff",
    "email": "staff@test.com",
    "password": "password123",
    "role": "STAFF",
    "employeeId": "EMP001",
    "department": "Computer Science",
    "designation": "Professor"
  }'
```

#### Register Admin
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "admin@test.com",
    "password": "password123",
    "role": "ADMIN"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "password123"
  }'
```

**Save the token from response!**

#### Test Protected Endpoint (will create later)
```bash
curl -X GET http://localhost:8080/api/student/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Expected Responses

### Successful Registration
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "name": "Test Student",
  "email": "student@test.com",
  "role": "STUDENT"
}
```

### Successful Login
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "name": "Test Student",
  "email": "student@test.com",
  "role": "STUDENT"
}
```

### Validation Error
```json
{
  "email": "Email should be valid",
  "password": "Password must be at least 6 characters"
}
```

### Duplicate Email
```json
{
  "status": 400,
  "message": "Email is already registered",
  "timestamp": "2026-02-01T21:40:00"
}
```

### Invalid Credentials
```json
{
  "status": 401,
  "message": "Bad credentials",
  "timestamp": "2026-02-01T21:40:00"
}
```

---

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Student LMS Auth",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register Student",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test Student\",\n  \"email\": \"student@test.com\",\n  \"password\": \"password123\",\n  \"role\": \"STUDENT\",\n  \"rollNumber\": \"CS2024001\",\n  \"department\": \"Computer Science\",\n  \"year\": 2,\n  \"semester\": 4\n}"
        },
        "url": {"raw": "http://localhost:8080/api/auth/register"}
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"student@test.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {"raw": "http://localhost:8080/api/auth/login"}
      }
    }
  ]
}
```

---

## Database Verification

### Check User Created
```sql
SELECT * FROM users WHERE email = 'student@test.com';
```

### Check Password Hashed
```sql
-- Password should be BCrypt hash starting with $2a$ or $2b$
SELECT password_hash FROM users WHERE email = 'student@test.com';
```

### Check Profile Created
```sql
SELECT * FROM student_profiles WHERE student_id = 
  (SELECT user_id FROM users WHERE email = 'student@test.com');
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check credentials in application.yml
- Verify database exists

### JWT Secret Error
- Ensure JWT secret is at least 256 bits (32 characters)
- Update in application.yml

---

**Ready to Test!** 🚀
