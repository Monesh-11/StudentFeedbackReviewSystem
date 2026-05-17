# Production Deployment Guide

## 🚀 Deployment Checklist

### 1. Environment Configuration

Ensure `application.yml` uses environment variables for sensitive data:

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/student_feedback_lms}
    username: ${DB_USER:postgres}
    password: ${DB_PASS:password}
  jpa:
    hibernate:
      ddl-auto: ${DDL_AUTO:validate} # Use 'validate' in production, never 'update'
    show-sql: ${SHOW_SQL:false}

jwt:
  secret: ${JWT_SECRET} # Must be set securely

app:
  judge0:
    api-key: ${JUDGE0_API_KEY}
```

### 2. Docker Deployment

Create a `Dockerfile` for the backend:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 3. Frontend Build

Build the React app for production:

```bash
cd frontend
npm run build
```

Serve the `dist` folder using Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
    }
}
```

### 4. Database Optimization

- Ensure all indexes are active (see `schema.sql`)
- Configure connection pooling (HikariCP included in Spring Boot)
- Set up regular backups

### 5. Logging & Monitoring

- Logs are output to console by default (container standard)
- Integrate with ELK Stack (Elasticsearch, Logstash, Kibana) or Prometheus/Grafana if needed
- Set logging level to INFO in production: `logging.level.root=INFO`

### 6. Security Hardening

- Enable HTTPS (SSL/TLS) on Nginx
- Set shorter JWT expiration times (e.g., 15 mins) and use refresh tokens
- Configure CORS to allow only specific domains
- secure HttpOnly cookies for tokens if possible (requires architecture change)

## ⚡ Performance Tuning

- **Pagination**: Use `page` and `size` parameters for lists (e.g., feedback, users)
- **Caching**: Enable Spring Cache if needed for static data (e.g., badges, categories)
- **Compression**: Enable GZIP compression in Nginx

---

**Status**: Ready for Deployment 🚀
