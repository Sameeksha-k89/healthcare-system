# 🏥 Digital Healthcare Records & Appointment System

A secure backend system built using Node.js, Express.js, MongoDB, and JWT authentication for managing healthcare operations like patients, doctors, appointments, EMR, prescriptions, and admin control.

---

## 📌 Project Overview

This project provides a secure backend API system for healthcare management with role-based access control for:
- Patients
- Doctors
- Admins

It solves problems like appointment conflicts, insecure medical data, and poor record management.

---

## 🚀 Features

### 🔐 Authentication
- Register / Login users
- JWT authentication
- Password hashing using bcrypt
- Role-based access (patient, doctor, admin)

---

### 👤 User Management (Admin)
- View all users
- Block / Unblock users
- Admin-only access control

---

### 🏥 EMR System
- Create medical records
- View records based on role
- Update records with audit logs (who, what, when)
- Delete records

---

### 📅 Appointment System
- Book appointments
- Prevent double booking
- Doctor availability check
- Status updates:
  - scheduled
  - completed
  - cancelled
  - no-show

---

### 💊 Prescription System
- Create prescriptions
- View prescriptions (role-based)
- Update / Delete prescriptions

---

### 👨‍⚕️ Doctor Module
- Doctor profiles
- Availability tracking
- Patient assignment support

---

### 📊 Admin Reports
- Total users
- Patients & doctors count
- Appointment statistics
- System overview

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcryptjs
- Postman

---

## 📁 Project Structure

/models  
/routes  
/middleware  
server.js  
.env  

---

## ⚙️ Setup

### Install dependencies
npm install

### Run server
npm run dev

---

## 🔗 API Routes

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Admin
GET /api/admin/users  
PUT /api/admin/block/:id  
PUT /api/admin/unblock/:id  
GET /api/admin/reports  

### EMR
POST /api/emr  
GET /api/emr  
PUT /api/emr/:id  
DELETE /api/emr/:id  

### Appointments
POST /api/appointments  
GET /api/appointments  
PUT /api/appointments/:id  
PUT /api/appointments/status/:id  
DELETE /api/appointments/:id  

### Prescriptions
POST /api/prescriptions  
GET /api/prescriptions  
PUT /api/prescriptions/:id  
DELETE /api/prescriptions/:id  

---

## 🔐 Authentication Flow

1. Register
2. Login
3. Get JWT token
4. Use token in headers:

Authorization: Bearer <token>

---

## 🧠 Key Features

- Secure authentication
- Role-based authorization
- Appointment conflict prevention
- Doctor availability validation
- EMR audit logging
- Admin reporting system

---

## 📊 Sample Admin Report

{
  "users": {
    "total": 10,
    "patients": 6,
    "doctors": 3
  },
  "appointments": {
    "total": 20,
    "scheduled": 10,
    "completed": 5,
    "cancelled": 3,
    "noShow": 2
  }
}

---

## 👩‍💻 Author

Sameeksha K and Vaishnavi Kini

---

## 🏁 Status

Project completed and ready for submission