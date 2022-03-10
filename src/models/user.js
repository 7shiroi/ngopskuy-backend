const db = require('../helpers/db');

exports.getUserByEmail = (email) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user WHERE email='${email}'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.addUser = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO user SET ?', data, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
