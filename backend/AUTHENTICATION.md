# JWT Authentication & Security Documentation

## 🔐 Overview

Complete JWT-based authentication and role-based authorization system for the Student Feedback & Learning Management System.

---

## 📦 Components Created

### Security Layer
1. **JwtTokenProvider** - JWT token generation and validation
2. **JwtAuthenticationFilter** - Request interceptor for token validation
3. **CustomUserDetailsService** - Load user details for authentication
4. **UserPrincipal** - Spring Security UserDetails implementation
5. **SecurityConfig** - Security configuration with role-based access

### DTOs
1. **LoginRequest** - Login credentials
2. **RegisterRequest** - Registration data with role-specific fields
3. **AuthResponse** - Authentication response with JWT token

### Service & Controller
1. **AuthService** - Business logic for login/register
2. **AuthController** - REST endpoints for authentication

---

## 🔑 Features

### ✅ User Registration
- Role-based registration (Student/Staff/Admin)
- Automatic profile creation based on role
- Password encryption using BCrypt
- Email uniqueness validation
- Role-specific field validation

### ✅ User Login
- Email and password authentication
- JWT token generation
- Last login timestamp update
- User details in response

### ✅ JWT Token Management
- Token generation with configurable expiration (24 hours)
- Token validation with signature verification
- Email extraction from token
- Proper error handling for expired/invalid tokens

### ✅ Password Security
- BCrypt password hashing
- Minimum 6 characters validation
- Secure password storage

### ✅ Role-Based Authorization
- **Public**: `/auth/**` - Login, register
- **Student**: `/student/**` - Student-only endpoints
- **Staff**: `/staff/**` - Staff-only endpoints
- **Admin**: `/admin/**` - Admin-only endpoints

---

## 📡 API Endpoints

### POST `/auth/register`
Register a new user with role-specific profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT",
  "rollNumber": "CS2024001",
  "department": "Computer Science",
  "year": 2,
  "semester": 4
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "STUDENT"
}
```

### POST `/auth/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "STUDENT"
}
```

---

## 🔒 Security Configuration

### Password Encoding
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### JWT Filter Chain
1. Extract JWT from `Authorization: Bearer <token>` header
2. Validate token signature and expiration
3. Extract email from token
4. Load user details
5. Set authentication in SecurityContext

### Role-Based Access Control
```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/auth/**").permitAll()
    .requestMatchers("/student/**").hasRole("STUDENT")
    .requestMatchers("/staff/**").hasRole("STAFF")
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
)
```

---

## 🧪 Testing Authentication

### 1. Register a Student
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Student",
    "email": "alice@student.com",
    "password": "password123",
    "role": "STUDENT",
    "rollNumber": "CS2024001",
    "department": "Computer Science",
    "year": 2,
    "semester": 4
  }'
```

### 2. Register a Staff
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Teacher",
    "email": "bob@staff.com",
    "password": "password123",
    "role": "STAFF",
    "employeeId": "EMP001",
    "department": "Computer Science",
    "designation": "Assistant Professor"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@student.com",
    "password": "password123"
  }'
```

### 4. Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/student/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔧 Configuration (application.yml)

```yaml
jwt:
  secret: your-256-bit-secret-key-change-this-in-production
  expiration: 86400000 # 24 hours

cors:
  allowed-origins: http://localhost:5173,http://localhost:3000
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
```

---

## 🛡️ Security Best Practices

### ✅ Implemented
- BCrypt password hashing
- JWT token with expiration
- HTTPS-ready (use SSL in production)
- CORS configuration
- Role-based access control
- Stateless authentication
- Input validation

### 🔐 Production Recommendations
1. **Change JWT Secret**: Use a strong, random 256-bit secret
2. **Enable HTTPS**: Force SSL/TLS in production
3. **Shorter Token Expiration**: Consider 1-2 hours for sensitive apps
4. **Refresh Tokens**: Implement refresh token mechanism
5. **Rate Limiting**: Add rate limiting to prevent brute force
6. **Account Lockout**: Lock accounts after failed login attempts
7. **Email Verification**: Verify email before activation
8. **Password Policy**: Enforce stronger password requirements

---

## 🔄 Frontend Integration

### Store Token
```javascript
// After login/register
localStorage.setItem('token', response.accessToken);
localStorage.setItem('user', JSON.stringify({
  userId: response.userId,
  name: response.name,
  email: response.email,
  role: response.role
}));
```

### Add Token to Requests
```javascript
// Axios interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Handle Unauthorized
```javascript
// Axios interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🐛 Error Handling

### Validation Errors (400)
```json
{
  "email": "Email should be valid",
  "password": "Password must be at least 6 characters"
}
```

### Authentication Errors (401)
```json
{
  "status": 401,
  "message": "Bad credentials",
  "timestamp": "2026-02-01T21:40:00"
}
```

### Registration Errors (400)
```json
{
  "status": 400,
  "message": "Email is already registered",
  "timestamp": "2026-02-01T21:40:00"
}
```

---

## 📊 Database Impact

### User Table
- `password_hash` stores BCrypt hash
- `last_login` updated on each login
- `status` can be ACTIVE/INACTIVE/SUSPENDED

### Profile Tables
- `student_profiles` created for STUDENT role
- `staff_profiles` created for STAFF role
- Linked via `user_id` foreign key

---

## ✅ Testing Checklist

- [ ] Register student with valid data
- [ ] Register staff with valid data
- [ ] Login with correct credentials
- [ ] Login with incorrect password (should fail)
- [ ] Register with duplicate email (should fail)
- [ ] Access student endpoint with student token
- [ ] Access staff endpoint with student token (should fail)
- [ ] Access endpoint without token (should fail)
- [ ] Access endpoint with expired token (should fail)
- [ ] Validate password encryption in database

---

## 🚀 Next Steps

1. **Create Protected Controllers**
   - StudentController
   - StaffController
   - AdminController

2. **Add Refresh Token**
   - Implement refresh token mechanism
   - Add `/auth/refresh` endpoint

3. **Email Verification**
   - Send verification email on registration
   - Add email verification endpoint

4. **Password Reset**
   - Forgot password endpoint
   - Reset password with token

5. **Account Management**
   - Change password
   - Update profile
   - Deactivate account

---

**Authentication System Status**: ✅ Complete and Ready for Testing

**Security Level**: Production-Ready with Recommendations
