const db = require('../helpers/db');

exports.getUsers = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user
    WHERE is_deleted=0
      AND (first_name LIKE '%${data.search}%'
      OR last_name LIKE '%${data.serach}%'
      OR display_name LIKE '%${data.serach}%'
      OR email LIKE '%${data.serach}%')
      LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUsersCount = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) rowsCount FROM user
    WHERE is_deleted=0 
      AND (first_name LIKE '%${data.search}%'
      OR last_name LIKE '%${data.serach}%'
      OR display_name LIKE '%${data.serach}%'
      OR email LIKE '%${data.serach}%')`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUser = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user
    WHERE is_deleted=0 AND id=${id}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserAll = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user
    WHERE id=${id}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserByEmail = (email) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user WHERE is_deleted=0 AND email='${email}'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserByPhoneNumber = (phoneNumber) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user WHERE is_deleted=0 AND phone_number='${phoneNumber}'`, (error, res) => {
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

exports.updateUser = (id, data) => new Promise((resolve, reject) => {
  db.query(
    'UPDATE user SET ? WHERE id = ?',
    [data, id],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
});

exports.deleteUser = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM user WHERE id = ?', [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
