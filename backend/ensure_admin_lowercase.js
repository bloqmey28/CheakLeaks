
import { query } from './db.js';

const ensureLowercase = async () => {
    try {
        await query(`
            UPDATE users 
            SET email = LOWER(email) 
            WHERE email = 'alejandro.palomo.espino@ieselcalamot.com' OR email = 'Alejandro.Palomo.Espino@ieselcalamot.com'
        `);
        console.log("Admin email normalized to lowercase.");
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

ensureLowercase();
