const db = require('../helpers/db');

exports.getProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.name}%' AND is_deleted=0 AND price>=${data.minPrice} AND price<=${data.maxPrice} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductByCategory = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.name}%' AND is_deleted=0 AND price>=${data.minPrice} AND price<=${data.maxPrice} AND id_category=${data.idCategory} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getTotalData = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM product WHERE name LIKE '%${data.name}%' AND is_deleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProduct = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO product SET ?', data, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE id=${id} AND is_deleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductByName = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id!=${data.id}`;
  }
  db.query(`SELECT * FROM product WHERE name='${data.name}' ${extraQuery} AND is_deleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.editProduct = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE product SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.deleteProduct = (id) => new Promise((resolve, reject) => {
  db.query(`UPDATE product SET is_deleted=1 WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
