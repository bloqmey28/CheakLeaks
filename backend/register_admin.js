
import bcrypt from 'bcryptjs';
import { query } from './db.js';

const registerAdmin = async () => {
    const email = 'alejandro.palomo.espino@ieselcalamot.com';
    const password = 'Asdqwe123!';

    console.log(`Registering admin: ${email}`);

    try {
        // Check if exists
        const check = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (check.rows.length > 0) {
            console.log('User already exists. Updating password...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
            console.log('Password updated successfully.');
        } else {
            console.log('Creating new user...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
            console.log('User created successfully.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
};

registerAdmin();
