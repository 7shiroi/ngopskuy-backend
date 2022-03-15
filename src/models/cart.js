const db = require('../helpers/db');

exports.getCart = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT t.id AS id, p.name, p.image, t.total_price, t.is_delivered, t.table_number, ts.name AS status
  FROM transaction t JOIN product p ON p.id=t.id_product JOIN transaction_status ts ON t.id_transaction_status=ts.id WHERE id_user=${data.id} AND t.is_deleted=0 AND t.id_transaction_status=1 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
