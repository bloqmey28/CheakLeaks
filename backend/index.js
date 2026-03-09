
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import compression from 'compression';
import { query } from './db.js';
import { searchBreaches } from './search.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database Initialization
const initDB = async () => {
    try {
        await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Database initialized: "users" table ready.');
    } catch (err) {
        console.error('Error initializing database:', err);
        setTimeout(initDB, 5000);
    }
};

initDB();

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Register
app.post('/api/auth/register', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    email = email.trim().toLowerCase();

    // Password Strength Check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 chars, include uppercase, lowercase, number, and special character.'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );

        // No email sent, just success
        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    let { email, password } = req.body;
    if (email) email = email.trim().toLowerCase();

    try {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate Token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ message: 'Logged in', user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

// Check Auth Status
app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// Search
app.post('/api/search', authenticateToken, async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'Query required' });
    const result = await searchBreaches(query);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
