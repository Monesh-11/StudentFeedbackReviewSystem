# EduHub - Student Feedback & Learning Management System

A modern, full-featured React frontend for a comprehensive learning management system with role-based authentication, gamification, and feedback management.

## 🌟 Features

### 🔐 Authentication
- Role-based login (Student, Staff, Admin)
- Protected routes with automatic redirection
- Persistent sessions with localStorage

### 👨‍🎓 Student Portal
- **Dashboard**: Stats, progress tracking, badges, and achievements
- **Profile**: Resume upload, skills management, social links
- **Learning Roadmap**: Track progress across DSA, DBMS, OS, and Languages
- **Coding Practice**: Online code editor with multiple language support
- **Feedback System**: Anonymous feedback submission
- **Tests & Results**: View tests, take exams, and check detailed results

### 👨‍🏫 Staff Portal
- **Dashboard**: Teaching analytics and student feedback
- **Profile**: Google Classroom integration
- **Create Tests**: Dynamic test creation with multiple questions
- **View Results**: Student performance analysis

### 🎛️ Admin Portal
- **Dashboard**: System health and activity monitoring
- **User Management**: CRUD operations for all users
- **Feedback Management**: Review and trace anonymous feedback

## 🎨 Design

- **Modern UI**: Glassmorphism effects with backdrop blur
- **Dark Theme**: Vibrant gradients and smooth animations
- **Responsive**: Mobile-first design approach
- **Accessible**: Semantic HTML and ARIA labels

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173/**

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | student@example.com | student123 |
| Staff | staff@example.com | staff123 |
| Admin | admin@example.com | admin123 |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (Auth)
│   ├── data/             # Dummy data
│   ├── pages/            # All page components
│   │   ├── auth/         # Login
│   │   ├── student/      # 7 student pages
│   │   ├── staff/        # 4 staff pages
│   │   └── admin/        # 3 admin pages
│   ├── App.jsx           # Main app with routing
│   └── index.css         # Global styles
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Context API** - State management
- **Vanilla CSS** - Styling

## 📦 Components

### Layout
- Navbar, Sidebar, Layout

### Shared
- Card, Button, Badge, ProgressBar, StatsCard, Modal

### Pages (14 Total)
- 1 Login page
- 7 Student pages
- 4 Staff pages
- 3 Admin pages

## 🎯 Key Highlights

✅ **14 Complete Pages** with full UI  
✅ **Role-based Access Control**  
✅ **Modern Design System**  
✅ **Responsive on All Devices**  
✅ **Gamification Features**  
✅ **Anonymous Feedback System**  
✅ **Ready for Backend Integration**

## 📝 License

This project is part of a full-stack learning management system.

## 🤝 Contributing

This is a demonstration project. For production use, integrate with the Java Spring Boot backend.

---

**Built with ❤️ using React + Vite**
