const db = require('../helpers/db');

exports.getIdProduct = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM product WHERE id = ?', [data.id_product], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getIdSize = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM size WHERE id = ?', [data.id_size], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.postProductSize = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO product_size SET ?', [data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.isOnlyProductSize = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM product_size WHERE id_product = ? AND id_size = ?', [data.id_product, data.id_size], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getData = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT ps.id , p.name as product_name, s.name as size_name FROM product_size ps 
  LEFT JOIN product p ON ps.id_product = p.id 
  LEFT JOIN size s ON ps.id_size = s.id WHERE ps.id_product=${data.id_product} AND ps.id_size = ${data.id_size}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getDataById = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM product_size WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateProductSize = (data) => new Promise((resolve, reject) => {
  db.query('UPDATE product_size SET id_size = ? WHERE id =?', [data.id_size, data.id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
