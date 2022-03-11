const db = require('../helpers/db');

exports.createRequest = (dataAddOtp) => new Promise((resolve, reject) => {
  db.query('INSERT INTO otp SET ?', [dataAddOtp], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateRequest = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE `otp` SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getRequest = (code) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM otp WHERE code=?', [code], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getRequestId = (users, idOtpType) => new Promise((resolve, reject) => {
  db.query('SELECT id_user, email, code FROM otp WHERE id_user=? AND id_otp_type=? AND is_expired=0 ', [users, idOtpType], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.registerByEmail = (email) => new Promise((resolve, reject) => {
  db.query('SELECT email, code FROM otp o join user u WHERE u.email = ? ', [email], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getOtp = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT email, code FROM otp o 
  JOIN user u ON o.id_user = u.id 
  WHERE o.id=?`, [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUser = (id) => new Promise((resolve, reject) => {
  db.query('SELECT id, email, password FROM user WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
