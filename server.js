const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Allows server to read JSON from requests

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

// --- API ROUTES ---

// 1. Login Endpoint (with extra debugging)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- Start of Debugging Logs ---
        console.log('\n--- New Login Attempt ---');
        console.log('Time:', new Date().toLocaleTimeString());
        console.log('Received Email:', email);
        console.log('Received Password:', password);
        // --- End of Debugging Logs ---

        const [rows] = await db.query('SELECT * FROM students WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            console.log('Result: User not found in database.');
            return res.status(404).json({ message: 'User not found' });
        }

        const student = rows[0];
        console.log('Hash from DB:', student.password_hash);
        
        const isPasswordCorrect = await bcrypt.compare(password, student.password_hash);
        
        // --- Final Result Log ---
        console.log('Result: Passwords Match?', isPasswordCorrect); 
        // ---

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.json({ message: 'Login successful', studentId: student.student_id, studentName: student.student_name });

    } catch (error) {
        console.log('SERVER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// 2. Get Courses for a specific student
app.get('/api/courses/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const [courses] = await db.query(
            `SELECT c.course_name, c.course_type 
             FROM courses c
             JOIN enrollments e ON c.course_id = e.course_id
             WHERE e.student_id = ?`,
            [studentId]
        );
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// 3. Get Points Breakdown for a specific student
app.get('/api/points/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const [points] = await db.query(
            `SELECT c.course_name, ev.event_name, ev.points_awarded
             FROM event_attendance ea
             JOIN courses c ON ea.course_id = c.course_id
             JOIN events ev ON ea.event_id = ev.event_id
             WHERE ea.student_id = ?
             ORDER BY c.course_name`,
            [studentId]
        );
        res.json(points);
    } catch (error) {
         res.status(500).json({ message: 'Server error', error });
    }
});

// 4. Get Events for a specific student
app.get('/api/events/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const [events] = await db.query(
            `SELECT 
                ev.event_name, 
                ev.event_type, 
                ev.points_awarded,
                DATE_FORMAT(ea.date_attended, '%Y-%m-%d') AS date_attended
             FROM event_attendance ea
             JOIN events ev ON ea.event_id = ev.event_id
             WHERE ea.student_id = ?
             ORDER BY ea.date_attended DESC`,
            [studentId]
        );
        res.json(events);
    } catch (error) {
         res.status(500).json({ message: 'Server error', error });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});