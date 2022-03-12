const db = require('../helpers/db');

exports.getTransaction = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction WHERE is_deleted=0 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransaction = () => new Promise((resolve, reject) => {
  db.query('SELECT COUNT(*) AS totalData FROM transaction WHERE is_deleted=0', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction WHERE id=${id} AND is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionUser = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction WHERE id_user=${data.id} AND is_deleted=0 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransactionUser = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM transaction WHERE id_user=${data.id} AND is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM transaction WHERE id_product=${data.id} AND is_deleted=0 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM transaction WHERE id_product=${data.id} AND is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.addTransaction = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO transaction SET ?', data, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.editTransaction = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE transaction SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deleteTransaction = (id) => new Promise((resolve, reject) => {
  db.query(`UPDATE transaction SET is_deleted=1 WHERE id=${id}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
