const db = require('../helpers/db');

exports.getUserRoles = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user_role
    WHERE name LIKE '%${data.search}%'
    LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserRolesCount = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) rowsCount FROM user_role
    WHERE name LIKE '%${data.search}%'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserRole = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM user_role
    WHERE id=${id}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.addUserRole = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO user_role SET ?', data, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.updateUserRole = (id, data) => new Promise((resolve, reject) => {
  db.query(
    'UPDATE user_role SET ? WHERE id = ?',
    [data, id],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
});

exports.deleteUserRole = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM user_role WHERE id = ?', [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
