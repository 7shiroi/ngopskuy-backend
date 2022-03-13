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

exports.getUserByEmail = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id!=${data.id}`;
  }
  db.query(`SELECT * FROM user WHERE is_deleted=0 AND email='${data.email}' ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserByPhoneNumber = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id!=${data.id}`;
  }
  db.query(`SELECT * FROM user WHERE is_deleted=0 AND phone_number='${data.phoneNumber}' ${extraQuery}`, (error, res) => {
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

exports.getProfile = (id) => new Promise((resolve, reject) => {
  // todo: add total order, join from transaction
 db.query(`SELECT 
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.display_name,
      u.phone_number,
      u.address,
      u.birth_date,
      u.gender,
      u.image,
      (SELECT COUNT(*) FROM transaction t where t.id_user=u.id) total_order
    FROM user u 
    LEFT JOIN transaction t ON t.id_user=u.id
    WHERE u.id = ?`, [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
