const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(express.static('.'));

// Session configuration
app.use(session({
    secret: 'voddev-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
    }
});

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        let folder = 'assets/uploads/';

        if (ext === '.fbx') {
            folder = 'assets/fbx/';
        } else if (ext === '.exe') {
            folder = 'assets/exe/';
        } else if (['.mp4', '.webm', '.ogg'].includes(ext)) {
            folder = 'assets/videos/';
        }

        // Create directory if it doesn't exist
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024 // 200 MB in bytes
    }
});

// In-memory user database (replace with real database in production)
const users = [];

// User registration endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        if (users.find(u => u.email === email || u.username === username)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Add user to database
        const newUser = { id: users.length + 1, email, username, password };
        users.push(newUser);

        // Send email notification to TeranoxGames@Gmail.com
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'TeranoxGames@Gmail.com',
            subject: 'New User Registration - Voddev',
            html: `
                <h2>New User Registration</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email notification sent successfully');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue even if email fails
        }

        res.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// User login endpoint
app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u =>
            (u.username === username || u.email === username) && u.password === password
        );

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({ success: true, message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true, username: req.session.username });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
});

// Get list of FBX files
app.get('/api/fbx', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const fbxDir = path.join(__dirname, 'assets/fbx');

    if (!fs.existsSync(fbxDir)) {
        return res.json({ files: [] });
    }

    const files = fs.readdirSync(fbxDir)
        .filter(file => file.endsWith('.fbx'))
        .map(file => ({
            name: file,
            url: `/assets/fbx/${file}`,
            size: fs.statSync(path.join(fbxDir, file)).size
        }));

    res.json({ files });
});

// Get list of EXE files
app.get('/api/exe', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const exeDir = path.join(__dirname, 'assets/exe');

    if (!fs.existsSync(exeDir)) {
        return res.json({ files: [] });
    }

    const files = fs.readdirSync(exeDir)
        .filter(file => file.endsWith('.exe'))
        .map(file => ({
            name: file,
            url: `/assets/exe/${file}`,
            size: fs.statSync(path.join(exeDir, file)).size
        }));

    res.json({ files });
});

// File upload endpoint (for admin use)
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
        success: true,
        message: 'File uploaded successfully',
        file: {
            name: req.file.filename,
            path: req.file.path
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to configure email credentials in server.js');
});
