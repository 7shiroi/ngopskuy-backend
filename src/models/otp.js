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

exports.getRequestId = (data) => new Promise((resolve, reject) => {
  db.query('SELECT id, email, code, id_otp_type FROM otp WHERE email=? AND id_otp_type=? AND is_expired=0 ', [data.email, data.idOtpType], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.registerByEmail = (email) => new Promise((resolve, reject) => {
  db.query('SELECT u.email, code FROM otp o join user u WHERE u.email = ? ', [email], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getOtp = (id) => new Promise((resolve, reject) => {
  db.query('SELECT email, code FROM otp WHERE id=?', [id], (error, res) => {
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
