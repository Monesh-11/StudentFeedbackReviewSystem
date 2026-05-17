# Database Setup Guide

## Prerequisites

- PostgreSQL 12 or higher installed
- psql command-line tool
- Database user with CREATE DATABASE privileges

---

## Step 1: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE student_feedback_lms;

# Connect to the new database
\c student_feedback_lms

# Or create from command line
createdb -U postgres student_feedback_lms
```

---

## Step 2: Run Schema Script

```bash
# From the database directory
psql -U postgres -d student_feedback_lms -f schema.sql
```

Or from psql:
```sql
\i schema.sql
```

---

## Step 3: Verify Installation

### Check Tables
```sql
-- List all tables
\dt

-- Expected output: 20+ tables
```

### Check Views
```sql
-- List all views
\dv

-- Expected: student_dashboard_stats, staff_analytics, admin_system_stats
```

### Check Sample Data
```sql
-- Verify users
SELECT * FROM users;

-- Verify student profile
SELECT * FROM student_profiles;

-- Verify staff profile
SELECT * FROM staff_profiles;
```

---

## Step 4: Create Database User for Application

```sql
-- Create application user
CREATE USER lms_app WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT CONNECT ON DATABASE student_feedback_lms TO lms_app;
GRANT USAGE ON SCHEMA public TO lms_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lms_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO lms_app;

-- Grant future privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lms_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT USAGE, SELECT ON SEQUENCES TO lms_app;
```

---

## Step 5: Configure Spring Boot

Update `application.properties` or `application.yml`:

### application.properties
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/student_feedback_lms
spring.datasource.username=lms_app
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

### application.yml
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/student_feedback_lms
    username: lms_app
    password: your_secure_password
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
```

---

## Step 6: Test Connection

### From psql
```bash
psql -U lms_app -d student_feedback_lms -h localhost
```

### From Spring Boot
Create a simple test:
```java
@SpringBootTest
public class DatabaseConnectionTest {
    
    @Autowired
    private DataSource dataSource;
    
    @Test
    public void testConnection() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            assertNotNull(connection);
            System.out.println("Database connected successfully!");
        }
    }
}
```

---

## Common Commands

### Backup Database
```bash
pg_dump -U postgres student_feedback_lms > backup.sql
```

### Restore Database
```bash
psql -U postgres student_feedback_lms < backup.sql
```

### Drop and Recreate
```bash
dropdb -U postgres student_feedback_lms
createdb -U postgres student_feedback_lms
psql -U postgres -d student_feedback_lms -f schema.sql
```

### View Table Structure
```sql
\d table_name
```

### View Indexes
```sql
\di
```

### View Constraints
```sql
SELECT conname, contype FROM pg_constraint WHERE conrelid = 'table_name'::regclass;
```

---

## Troubleshooting

### Connection Refused
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

### Permission Denied
```sql
-- Grant all privileges to user
GRANT ALL PRIVILEGES ON DATABASE student_feedback_lms TO lms_app;
```

### Schema Not Found
```sql
-- Set search path
SET search_path TO public;
```

### Foreign Key Violations
```sql
-- Disable triggers temporarily (for data migration)
SET session_replication_role = replica;
-- Your INSERT statements
SET session_replication_role = DEFAULT;
```

---

## Performance Tuning

### Analyze Tables
```sql
ANALYZE;
```

### Vacuum Database
```sql
VACUUM ANALYZE;
```

### Check Query Performance
```sql
EXPLAIN ANALYZE SELECT * FROM student_dashboard_stats WHERE student_id = 1;
```

### Create Additional Indexes (if needed)
```sql
-- Example: Index on feedback created_at for faster sorting
CREATE INDEX idx_feedback_created_desc ON feedback(created_at DESC);
```

---

## Security Best Practices

1. **Use Strong Passwords**: Generate secure passwords for database users
2. **Limit Privileges**: Grant only necessary permissions
3. **Use SSL**: Enable SSL for production databases
4. **Regular Backups**: Schedule automated backups
5. **Monitor Logs**: Enable and review PostgreSQL logs
6. **Update Regularly**: Keep PostgreSQL updated

---

## Production Deployment

### Enable SSL
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_feedback_lms?ssl=true&sslmode=require
```

### Connection Pooling
```properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
```

### Enable Query Logging (Development Only)
```properties
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

---

## Next Steps

1. ✅ Database schema created
2. ⬜ Create JPA Entity classes
3. ⬜ Create Repository interfaces
4. ⬜ Create Service layer
5. ⬜ Create REST Controllers
6. ⬜ Implement JWT authentication
7. ⬜ Connect frontend to backend

---

**Setup Complete!** 🎉

Your PostgreSQL database is now ready for the Student Feedback & Learning Management System.
