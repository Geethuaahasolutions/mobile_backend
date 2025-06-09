const db = require('../db');

class UserModel {
    static create({ username, email_id, password, confirm_password }) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, email_id, password, confirm_password) VALUES (?, ?, ?, ?)';
            db.query(query, [username, email_id, password, confirm_password], (err, results) => {
                if (err) return reject(err);
                resolve({ id: results.insertId, username, email_id });
            });
        });
    }
}
module.exports = UserModel;