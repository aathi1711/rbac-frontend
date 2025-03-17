# Hospital Management System (MERN Stack)

## Description
This is a Hospital Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows administrators, doctors, nurses, and patients to manage appointments, patient records, and vitals efficiently.

## Features
- **Admin Panel**: Manage users, approve/reject appointments, assign roles (admin, doctor, nurse, patient).
- **Doctor Panel**: View and manage patient records, accept/reject appointments, add notes.
- **Nurse Panel**: View approved patients, update vitals (blood pressure, heart rate, temperature).
- **Patient Panel**: Make appointments, view their records and statuses.
- **Authentication & Authorization**: Secure login and role-based access control.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **State Management**: React Context API
- **API Requests**: Axios

## Installation

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

   ```
3. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user

### User Management (Admin)
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Update user role

### Appointments
- `POST /appointments` - Create an appointment
- `GET /appointments` - Get all appointments
- `PUT /appointments/:id/status` - Approve/reject appointment

### Patient Records
- `GET /patients/:id/records` - Get patient records
- `POST /patients/:id/note` - Add doctor note
- `PUT /patients/:id/vitals` - Update patient vitals

## Future Enhancements
- Add prescription management
- Implement notifications for appointment updates
- Introduce patient history tracking

## Author
Developed by Aathish

