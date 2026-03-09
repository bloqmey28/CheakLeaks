
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const dbConfig = {
    user: process.env.DB_USER || 'leakcheck',
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'leakcheck_db', // Fixed default
    password: process.env.DB_PASSWORD || 'secure_password',
    port: process.env.DB_PORT || 5432,
};

console.log('Connecting to DB with:', { ...dbConfig, password: '****' });

const pool = new Pool(dbConfig);

export const query = (text, params) => pool.query(text, params);
