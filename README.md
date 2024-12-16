# Attendance Management System

## Overview
The Attendance Management System is a full-stack web application that allows users to mark attendance, request leaves, and view attendance history. Admins can manage attendance, approve/reject leave requests, view user details, and generate reports. The application uses MongoDB for data storage, Express.js for server-side logic, and Axios for API communication.

---

## Features

### User Features:
1. User Registration and Login
   - Secure authentication with JWT tokens.
2. Attendance Management
   - Mark daily attendance.
3. Leave Requests
   - Submit leave requests with a reason and date range.
4. Profile Management
   - Update profile picture.

### Admin Features:
1. User Management
   - View all users.
2. Attendance Management
   - Manage attendance records.
3. Leave Requests
   - Approve or reject leave requests.
4. Reports
   - Generate and view attendance reports.

---

## Technologies Used

### Frontend:
- HTML
- CSS
- JavaScript
- Axios

### Backend:
- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- Multer (for file uploads)
- JWT (JSON Web Tokens for authentication)

### Database:
- MongoDB

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB installed and running.
- Postman for API testing (optional).

### Steps
1. Clone the Repository:
   ```bash
   git clone https://github.com/your-repo/attendance-management-system.git
   cd attendance-management-system
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/attendance-system

   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=adminpassword
   ```

4. Start the Server:
   ```bash
   node server.js
   ```

5. Run the Frontend:
   Open the `index.html` file in your browser.

---

## API Endpoints

### Authentication:
- POST `/api/auth/register` - User registration.
- POST `/api/auth/login` - User/Admin login.
- GET `/api/auth/verify` - Verify token.

### Attendance:
- POST `/api/attendance/mark` - Mark attendance.
- GET `/api/attendance` - View attendance records.

### Leaves:
- POST `/api/leave` - Submit leave request.
- GET `/api/leave` - View leave requests.

### Admin:
- GET `/api/users` - Fetch all users.
- PATCH `/api/leave/:id` - Approve or reject leave requests.
- GET `/api/reports` - Generate attendance reports.

---

## Project Structure
```
attendance-management-system/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── models/
│   ├── Attendance.js
│   ├── Leave.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── attendanceRoutes.js
│   └── adminRoutes.js
├── .env
├── server.js
└── README.md
```

---

## Usage
1. Admin Setup: Use the credentials provided in the `.env` file to log in as an admin.
2. Mark Attendance: Navigate to the user dashboard and mark attendance.
3. Request Leave: Fill out the leave request form and submit.
4. Admin Management: Log in as an admin to approve/reject leave requests and manage attendance.

---

## Troubleshooting
- Error: Cannot connect to MongoDB
  - Ensure MongoDB is running and the `MONGODB_URI` in the `.env` file is correct.
- JWT Malformed Error
  - Ensure the `JWT_SECRET` is set in the `.env` file.
- CSS/JS File Not Found
  - Verify file paths in the HTML files.

---

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.



