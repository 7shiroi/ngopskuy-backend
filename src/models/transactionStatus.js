const db = require('../helpers/db');

exports.getStatus = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM transaction_status', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getStatusId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction_status WHERE id=${id}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getStatusName = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction_status WHERE name='${data.name}'`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.addStatus = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO transaction_status SET ?', data, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.editStatus = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE transaction_status SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deleteStatus = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM transaction_status WHERE id=${id}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
