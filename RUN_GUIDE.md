# 🚀 Student Feedback & Review System - Run & Deployment Guide

This guide provides step-by-step instructions to set up, run, and deploy the **Student Feedback & Learning Management System**.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
1.  **Java JDK 17+**
2.  **Node.js (v18+) & npm**
3.  **PostgreSQL (v12+)**
4.  **Maven (v3.8+)** (Optional if using `mvnw` wrapper)

---

## 🛠️ Step 1: Database Setup

1.  **Open PostgreSQL** (via pgAdmin or terminal).
2.  **Create the Database**:
    ```sql
    CREATE DATABASE student_feedback_lms;
    ```
3.  **Run the Schema Script**:
    - Open `database/schema.sql`.
    - Execute the entire script in the newly created database to set up tables, views, and indexes.

    **🔹 Docker Quick Commands (Run in Terminal):**
    If you are running PostgreSQL in Docker (container name: `postgres-db`), run these commands in your project root:

    1. **Create Database**:
       ```powershell
       docker exec -i postgres-db psql -U postgres -c "CREATE DATABASE student_feedback_lms;"
       ```
    
    2. **Run Schema Script**:
       ```powershell
       # PowerShell
       Get-Content database\schema.sql | docker exec -i postgres-db psql -U postgres -d student_feedback_lms
       
       # Command Prompt (cmd)
       type database\schema.sql | docker exec -i postgres-db psql -U postgres -d student_feedback_lms
       
       # Bash / Git Bash
       cat database/schema.sql | docker exec -i postgres-db psql -U postgres -d student_feedback_lms
       ```

---

## 🔙 Step 2: Backend Setup (Spring Boot)

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Configure Database Credentials**:
    - Open `src/main/resources/application.yml`.
    - Update the `spring.datasource` section with your PostgreSQL credentials:
      ```yaml
      spring:
        datasource:
          username: your_postgres_username  # e.g., postgres
          password: your_postgres_password  # e.g., password
      ```

3.  **Configure Judge0 API (Optional)**:
    - If you want the online compiler to work, sign up for [Judge0 on RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce).
    - Add your API Key in `application.yml` under `app.judge0.api-key`.

4.  **Build and Run**:
    ```bash
    # install dependencies
    mvn clean install

    # run the application
    mvn spring-boot:run
    ```
    ✅ **Success**: The backend will start on `http://localhost:8080`.

---

## 🎨 Step 3: Frontend Setup (React)

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    ✅ **Success**: The frontend will start on most likely `http://localhost:5173`.

---

## 🔄 Step 4: Verify the Application

1.  Open your browser and search for `http://localhost:5173`.
2.  **Register Users** (since the database is empty):
    - **Student**: Go to Register -> Select **Student**.
    - **Staff**: Go to Register -> Select **Staff**.
    - **Admin**: Currently, you may need to insert an admin manually into the DB or enable admin registration in the UI code if specifically allowed.
      - *Quick Admin SQL*:
        ```sql
        INSERT INTO users (name, email, password_hash, role, status, created_at)
        VALUES ('Admin User', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'ADMIN', 'ACTIVE', NOW());
        ```
3.  **Login** with the created credentials.

---

## 🚢 Production Deployment

For deploying to a production server (Ubuntu/Linux), follow these brief steps. See [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md) for full details.

### 1. Build Artifacts
**Backend**:
```bash
cd backend
mvn clean package -DskipTests
# Output: target/student-feedback-lms-0.0.1-SNAPSHOT.jar
```

**Frontend**:
```bash
cd frontend
npm run build
# Output: dist/ folder
```

### 2. Run Database
Ensure PostgreSQL is installed on the server and `schema.sql` is executed.

### 3. Run Backend (Service)
Run the JAR file in the background (or use a systemd service):
```bash
java -jar backend/target/student-feedback-lms-0.0.1-SNAPSHOT.jar
```

### 4. Serve Frontend (Nginx)
Install Nginx and configure it to serve the `dist` folder and reverse-proxy API requests to localhost:8080.

```nginx
server {
    listen 80;
    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
    }
}
```

---

## 🧪 Testing

- **Backend Tests**: Run `mvn test` in `backend/`.
- **API Testing**: Use the Postman collection described in `backend/TESTING.md`.

