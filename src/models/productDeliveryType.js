const db = require('../helpers/db');

exports.getProdDelType = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.countProdDelType = () => new Promise((resolve, reject) => {
  db.query('SELECT COUNT(*) AS totalData FROM product_delivery_type', (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProdDelTypeId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type WHERE id=${id} `, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.checkProdDelType = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type WHERE id_product=${data.id_product} AND id_delivery_type=${data.id_delivery_type}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProdDelType = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO product_delivery_type SET ?', data, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.editProdDelType = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE product_delivery_type SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.deleteProdDelType = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM product_delivery_type WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
