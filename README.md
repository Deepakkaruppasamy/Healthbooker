# HealthBooker - Medical Consultation Website

A comprehensive medical consultation platform that allows patients to book appointments with doctors based on specialization.

## Features

- **User Authentication**: Secure signup and login for patients and doctors
- **Doctor Listings**: Browse doctors by specialization and experience
- **Appointment Booking**: Schedule appointments with preferred doctors
- **Appointment Management**: View, reschedule or cancel appointments
- **Doctor Profiles**: View detailed information about doctors

## Tech Stack

### Frontend
- **Angular**: For building the responsive single-page application
- **Bootstrap 5**: For UI components and responsive design
- **Bootstrap Icons**: For beautiful icons across the application

### Backend
- **PHP**: For server-side API implementation
- **MySQL**: For storing user, doctor, and appointment information

## Project Structure

```
├── frontend/                # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   ├── services/    # API services
│   │   │   ├── models/      # Data models
│   │   │   ├── guards/      # Route guards for authentication
│   │   ├── assets/          # Static assets like images
│   │   ├── environments/    # Environment configuration
├── backend/                 # PHP backend API
│   ├── auth.php             # Authentication endpoints
│   ├── doctors.php          # Doctor listing endpoints
│   ├── appointments.php     # Appointment management endpoints
│   ├── config.php           # Database configuration
├── database/                # SQL scripts
│   ├── medconsult_db.sql    # Database schema and sample data
```

## Setup Instructions

### Database Setup
1. Create a MySQL database named `medconsult_db`
2. Import the SQL script from the `database/medconsult_db.sql` file

### Backend Setup
1. Place the `backend` folder in your XAMPP/WAMP server's htdocs directory
2. Update the database credentials in `backend/config.php` if needed

### Frontend Setup
1. Navigate to the `frontend` directory
2. Run `npm install` to install dependencies
3. Update API URL in `src/environments/environment.ts` if needed
4. Run `ng serve` to start the development server
5. Access the application at `http://localhost:4200`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/doctors` | GET | Get all doctors |
| `/doctors/{id}` | GET | Get doctor by ID |
| `/appointments` | GET | Get all appointments |
| `/appointments/{id}` | GET | Get appointment by ID |
| `/appointments/patient/{id}` | GET | Get appointments by patient ID |
| `/appointments/doctor/{id}` | GET | Get appointments by doctor ID |
| `/appointments` | POST | Create a new appointment |
| `/appointments/{id}` | PUT | Update appointment |
| `/appointments/{id}` | DELETE | Delete appointment |

## Sample Users

### Admin
- Username: admin
- Password: password123

### Doctors
- Username: drsmith
- Password: password123

### Patients
- Username: patient1
- Password: password123 