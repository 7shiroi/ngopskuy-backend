const db = require('../helpers/db');

exports.getTransaction = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.productSearch) {
    extraQueryWhere += ` AND p.name LIKE '%${data.productSearch}%'`;
  }
  if (data.userSearch) {
    extraQueryWhere += ` AND (u.first_name LIKE '%${data.userSearch}%' OR u.last_name LIKE '%${data.userSearch}%' OR  u.display_name LIKE '%${data.userSearch}%')`;
  }
  db.query(`SELECT 
      t.id,
      u.id id_user,
      u.first_name,
      u.email,
      p.id id_product,
      p.name product_name,
      p.price,
      tp.quantity,
      ts.name status,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image,
      (p.price*tp.quantity) sub_total
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
    JOIN user u ON t.id_user=u.id
    WHERE t.is_deleted=0
    ${extraQueryWhere}
    LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.totalTransaction = (data = null) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.productSearch) {
    extraQueryWhere += ` AND p.name LIKE '%${data.productSearch}%'`;
  }
  if (data.userSearch) {
    extraQueryWhere += ` AND (u.first_name LIKE '%${data.userSearch}%' OR u.last_name LIKE '%${data.userSearch}%' OR  u.display_name LIKE '%${data.userSearch}%')`;
  }
  db.query(`SELECT 
      COUNT(*) AS totalData 
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
    JOIN user u ON t.id_user=u.id
    WHERE t.is_deleted=0
    ${extraQueryWhere}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.id id_product,
      p.name product_name,
      p.price,
      tp.quantity,
      ts.name status,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image,
      (p.price*tp.quantity) sub_total
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
    WHERE t.id=${id}
    AND t.is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionUser = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.id id_product,
      p.name product_name,
      p.price,
      tp.quantity,
      ts.name status,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image,
      (p.price*tp.quantity) sub_total
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
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
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
    WHERE id_user=${data.id}
    AND t.is_deleted=0`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getTransactionProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT 
      t.id,
      p.id id_product,
      p.name product_name,
      p.price,
      tp.quantity,
      ts.name status,
      payment_method,
      is_delivered,
      table_number,
      total_price,
      p.image,
      (p.price*tp.quantity) sub_total
    FROM transaction t
    JOIN transaction_status ts ON t.id_transaction_status=ts.id
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
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
    LEFT JOIN transaction_product tp ON tp.id_transaction=t.id
    LEFT JOIN product p ON tp.id_product=p.id
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
