-- Create the database
CREATE DATABASE IF NOT EXISTS medconsult_db;
USE medconsult_db;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    user_type ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',
    phone_number VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience_years INT,
    consultation_fee DECIMAL(10, 2),
    availability_schedule TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- Insert sample data for testing

-- Admin user
INSERT INTO users (username, password, email, full_name, user_type, phone_number)
VALUES ('admin', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'admin@medconsult.com', 'System Admin', 'admin', '1234567890');

-- Sample doctors
INSERT INTO users (username, password, email, full_name, user_type, phone_number, date_of_birth)
VALUES 
('drsmith', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'smith@medconsult.com', 'Dr. John Smith', 'doctor', '9876543210', '1975-05-15'),
('drdavis', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'davis@medconsult.com', 'Dr. Emily Davis', 'doctor', '8765432109', '1980-08-20'),
('drpatel', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'patel@medconsult.com', 'Dr. Raj Patel', 'doctor', '7654321098', '1978-03-12');

-- Add doctor details
INSERT INTO doctors (user_id, specialization, qualification, experience_years, consultation_fee, availability_schedule)
VALUES 
(2, 'Cardiology', 'MD, PhD, FACC', 15, 150.00, 'Monday, Wednesday, Friday: 9:00 AM - 5:00 PM'),
(3, 'Dermatology', 'MD, FAAD', 10, 130.00, 'Tuesday, Thursday: 10:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM'),
(4, 'Orthopedics', 'MBBS, MS (Ortho)', 12, 140.00, 'Monday, Tuesday, Thursday: 8:00 AM - 4:00 PM');

-- Sample patients
INSERT INTO users (username, password, email, full_name, user_type, phone_number, date_of_birth)
VALUES 
('patient1', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'patient1@example.com', 'Sarah Johnson', 'patient', '5432167890', '1990-07-15'),
('patient2', '$2y$10$8WxYR0UK2FMbgvN1e9BdxudLmGqvMb1CBB11MhpWIYZMlQiZ7mTw.', 'patient2@example.com', 'Michael Brown', 'patient', '6543217890', '1985-11-30');

-- Sample appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, notes)
VALUES 
(5, 1, CURDATE() + INTERVAL 1 DAY, '10:00:00', 'scheduled', 'Initial consultation'),
(6, 2, CURDATE() + INTERVAL 2 DAY, '14:30:00', 'scheduled', 'Follow-up appointment'),
(5, 3, CURDATE() + INTERVAL 3 DAY, '11:15:00', 'scheduled', 'X-ray review'); 