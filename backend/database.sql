-- Create the database
CREATE DATABASE IF NOT EXISTS medconsult_db;
USE medconsult_db;

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('patient', 'doctor', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctor profiles
CREATE TABLE doctor_profiles (
    doctor_id INT PRIMARY KEY,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL,
    consultation_fee DECIMAL(10,2) NOT NULL,
    available_status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Patient profiles
CREATE TABLE patient_profiles (
    patient_id INT PRIMARY KEY,
    date_of_birth DATE NOT NULL,
    blood_group VARCHAR(5),
    medical_history TEXT,
    allergies TEXT,
    FOREIGN KEY (patient_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Appointments
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(user_id),
    FOREIGN KEY (doctor_id) REFERENCES users(user_id)
);

-- Medical records
CREATE TABLE medical_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT,
    record_date DATE NOT NULL,
    diagnosis TEXT,
    prescription TEXT,
    lab_results TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(user_id),
    FOREIGN KEY (doctor_id) REFERENCES users(user_id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

-- Doctor schedules
CREATE TABLE doctor_schedules (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_start TIME,
    break_end TIME,
    max_appointments INT NOT NULL DEFAULT 20,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id)
);

-- Create an admin user
INSERT INTO users (username, password, email, full_name, role) 
VALUES ('admin', '$2y$10$YourHashedPasswordHere', 'admin@medconsult.com', 'System Administrator', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_doctor_schedules_day ON doctor_schedules(day_of_week);
CREATE INDEX idx_medical_records_date ON medical_records(record_date); 