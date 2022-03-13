const db = require('../helpers/db');

exports.getTransactionProducts = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.id_transaction) {
    extraQueryWhere += ` AND t.id=${data.id_transaction}`;
  }
  if (data.id_product) {
    extraQueryWhere += ` AND t.id=${data.id_product}`;
  }
  let extraQueryLimit = '';
  if (data.limit && data.offset) {
    extraQueryLimit = `LIMIT ${data.limit} OFFSET ${data.offset}`;
  }
  db.query(`SELECT tp.id, t.id id_transaction, p.id id_product, p.name product_name, quantity FROM transaction_product tp
      JOIN transaction t on t.id=tp.id_transaction
      JOIN product p on p.id=tp.id_product
    WHERE 1=1 ${extraQueryWhere}
    ${extraQueryLimit}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getTransactionProductsCount = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id_transaction) {
    extraQuery += ` AND t.id=${data.id_transaction}`;
  }
  if (data.id_product) {
    extraQuery += ` AND t.id=${data.id_product}`;
  }
  db.query(`SELECT COUNT(*) FROM transaction_product tp
      JOIN transaction t on t.id=tp.id_transaction
      JOIN product p on p.id=tp.id_product
      WHERE 1=1 ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getTransactionProduct = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT tp.id, t.id id_transaction, p.id id_product, p.name product_name, quantity FROM transaction_product tp
      JOIN transaction t on t.id=tp.id_transaction
      JOIN product p on p.id=tp.id_product
    WHERE tp.id=${id} `, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.checkTransactionProduct = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id != ${data.id}`;
  }
  db.query(`SELECT * FROM transaction_product 
    WHERE id_transaction=${data.id_transaction}
      AND id_product=${data.id_product}
      ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.addTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO transaction_product SET ?', data, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.updateTransactionProduct = (id, data) => new Promise((resolve, reject) => {
  db.query(
    'UPDATE transaction_product SET ? WHERE id = ?',
    [data, id],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
});

exports.deleteTransactionProduct = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM transaction_product WHERE id = ?', [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
