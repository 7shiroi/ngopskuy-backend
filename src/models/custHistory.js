const db = require('../helpers/db');

exports.getCustHistory = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT t.id AS id, p.name, p.image, t.quantity, t.total_price, t.is_delivered, t.table_number, ts.name AS status
  FROM transaction t JOIN product p ON p.id=t.id_product JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE id_user=${data.id_user} AND t.is_deleted=0 AND t.id_transaction_status>1 ORDER BY t.id DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalCustHistory = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM transaction t 
  JOIN product p ON p.id=t.id_product
  JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE id_user=${id} AND t.is_deleted=0 AND t.id_transaction_status>1`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getCustCart = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT t.id AS id, p.name, p.image, t.quantity, t.total_price, t.is_delivered, t.table_number, ts.name AS status
  FROM transaction t JOIN product p ON p.id=t.id_product JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE id_user=${data.id_user} AND t.is_deleted=0 AND t.id_transaction_status=1 ORDER BY t.id DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalCustCart = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM transaction t 
  JOIN product p ON p.id=t.id_product
  JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE id_user=${id} AND t.is_deleted=0 AND t.id_transaction_status=1`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getCustHistoryId = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT t.id AS id, p.name, p.image, t.quantity, t.total_price, t.is_delivered, t.table_number, ts.name AS status
  FROM transaction t JOIN product p ON p.id=t.id_product JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE t.id=${data.id} AND id_user=${data.id_user} AND t.is_deleted=0 AND t.id_transaction_status>1`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getCustCartId = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT t.id AS id, p.name, p.image, t.quantity, t.total_price, t.is_delivered, t.table_number, ts.name AS status
  FROM transaction t JOIN product p ON p.id=t.id_product JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE t.id=${data.id} AND id_user=${data.id_user} AND t.is_deleted=0 AND t.id_transaction_status=1`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.checkoutCart = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE transaction SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.addCart = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO transaction SET ?', [data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deleteHistory = (id) => new Promise((resolve, reject) => {
  db.query(`UPDATE transaction SET is_deleted=1 WHERE id=${id}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
