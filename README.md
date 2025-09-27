Hospital Management System
Overview

The Hospital Management System (HMS) is a web-based application designed to manage hospital operations efficiently. It allows users to manage doctors, patients, appointments, and other hospital-related data through an intuitive interface.

Features
Admin

Add, edit, and delete doctor information.

Add, edit, and delete patient information.

Manage appointments and schedules.

View detailed reports of hospital activities.

Patient

Register as a new patient.

View personal information and medical history.

Book and cancel appointments.

Access hospital services efficiently.

Doctors

View personal profile and patient appointments.

Manage schedules and availability.

Technologies Used

Frontend: React.js

Backend: Node.js, Express.js

Database: mongoDB

Hosting: Vercel (Frontend), vercel (Backend)

Installation
Prerequisites

Node.js and npm installed.

mongoDB database setup.

Git installed.

Steps

Clone the repository:

git clone https://github.com/hamzakhanbtm/hospital-management-system.git


Navigate to the backend folder and install dependencies:

cd backend
npm install


Setup .env file with database and server configurations:

DATABASE_URL=your_postgres_database_url
PORT=5000


Start the backend server:

npm start


Navigate to the frontend folder and install dependencies:

cd frontend
npm install


Configure frontend .env with backend URL:

REACT_APP_API_URL=https://hospital-management-system-backend-by-hamza.vercel.app


Start the frontend server:

npm start

API Endpoints

Patients

GET /api/patients – Get all patients.

POST /api/patients – Add a new patient.

PUT /api/patients/:id – Update patient information.

DELETE /api/patients/:id – Delete patient information.

Doctors

GET /api/doctors – Get all doctors.

POST /api/doctors – Add a new doctor.

PUT /api/doctors/:id – Update doctor information.

DELETE /api/doctors/:id – Delete doctor information.

Appointments

GET /api/appointments – Get all appointments.

POST /api/appointments – Book a new appointment.

PUT /api/appointments/:id – Update appointment.

DELETE /api/appointments/:id – Cancel appointment.
