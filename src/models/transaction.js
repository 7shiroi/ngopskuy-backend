const db = require('../helpers/db');

exports.getTransaction = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.name product_name,
      tp.quantity,
      ts.name,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE t.is_deleted=0 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransaction = () => new Promise((resolve, reject) => {
  db.query(`SELECT 
      COUNT(*) AS totalData 
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE t.is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.name product_name,
      tp.quantity,
      ts.name,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE t.id=${id}
    AND t.is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionUser = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.name product_name,
      tp.quantity,
      ts.name,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE id_user=${data.id}
    AND t.is_deleted=0
    LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransactionUser = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      COUNT(*) AS totalData 
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE id_user=${data.id}
    AND t.is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.name product_name,
      tp.quantity,
      ts.name,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE tp.id_product=${data.id}
      AND t.is_deleted=0
    LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      COUNT(*)
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    JOIN transaction_product tp ON tp.id_transaction=t.id
    JOIN product p ON tp.id_product=p.id
    WHERE tp.id_product=${data.id}
      AND t.is_deleted=0`, (err, res) => {
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
