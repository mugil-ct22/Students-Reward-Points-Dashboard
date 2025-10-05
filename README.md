🎓 Student Reward Points Dashboard
A full-stack web application designed for colleges to manage a student reward points system. Students can log in, view their enrolled courses, track points earned from attending events like workshops and paper presentations, and submit feedback. This project demonstrates a complete front-end to back-end workflow with a database connection.

✨ Features
Secure Student Login: Authentication system using hashed passwords (bcryptjs).

Main Dashboard: A central view with a quick summary of total points earned.

Course Management: View enrolled main and elective courses.

Event Tracking: See a list of attended events, categorized by type (e.g., Online Workshops, Paper Presentations).

Points Breakdown: A detailed table showing how points were awarded for each event and applied to specific courses.

Feedback System: A simple form for students to submit feedback to the administration.

🛠️ Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)

Backend: Node.js, Express.js

Database: MySQL

Key Node.js Libraries:

mysql2 for database connection.

bcryptjs for password hashing.

cors for handling cross-origin requests.

dotenv for managing environment variables.

🚀 Setup and Installation
Follow these steps to get the project running on your local machine.

1. Prerequisites
Node.js installed on your machine.

[suspicious link removed] and a client like MySQL Workbench installed.

2. Database Setup
Open MySQL Workbench and connect to your local MySQL server.

Create the database by running the following command:

SQL

CREATE DATABASE student_rewards;
Run the entire database.sql script provided with this project. This will create all the necessary tables and insert sample data for two users.

3. Backend Setup
Open a terminal and navigate to the project's root folder.

Install the necessary npm packages:

Bash

npm install
Create a new file in the root folder named .env.

Add your MySQL database credentials to the .env file. (Replace 'your_mysql_password' with your actual password).

Code snippet

DB_HOST=localhost
DB_USER=root
DB_PASSWORD='your_mysql_password'
DB_DATABASE=student_rewards
Start the backend server:

Bash

node server.js
The server should now be running at http://localhost:3000.

4. Frontend Setup
The easiest way to run the frontend is with the Live Server extension in Visual Studio Code.

Right-click the index.html file and select "Open with Live Server".

Your browser will open to the login page, typically at a URL like http://127.0.0.1:5500.

5. Sample Login Credentials
You can now log in with one of the two sample users:

User 1:

Email: alex@college.edu

Password: password123

User 2:

Email: jane@college.edu

Password: jane123

🔌 API Endpoints
The backend server provides the following API endpoints:

Method	Path	Description
POST	/api/login	Authenticates a student and returns their ID.
GET	/api/courses/:studentId	Fetches all courses for a specific student.
GET	/api/events/:studentId	Fetches all events attended by a student.
GET	/api/points/:studentId	Fetches the points breakdown for a student.