const db = require('../helpers/db');

exports.getProdDelType = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type WHERE isDeleted=0 LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.countProdDelType = () => new Promise((resolve, reject) => {
  db.query('SELECT COUNT(*) AS totalData FROM product_delivery_type WHERE isDeleted=0', (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProdDelTypeId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type WHERE id=${id} AND isDeleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.checkProdDelType = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product_delivery_type WHERE idProduct=${data.idProduct} AND idDeliveryType=${data.idDeliveryType} AND isDeleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProdDelType = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO product_delivery_type (idProduct, idDeliveryType) VALUES(${data.idProduct}, ${data.idDeliveryType})`, (err, res) => {
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
  db.query(`UPDATE product_delivery_type SET isDeleted=1 WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
