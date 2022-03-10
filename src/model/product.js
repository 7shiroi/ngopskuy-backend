const db = require('../helpers/db');

exports.getProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getTotalData = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM product WHERE name LIKE '%${data.name}%'`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProduct = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO product (name, id_category, price, description, stock, delivery_hour_start, delivery_hour_end, image) VALUES('${data.name}', ${data.idCategory},${data.price}, '${data.description}', ${data.stock}, '${data.deliveryHourStart}', '${data.deliveryHourEnd}', '${data.image}') `, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.editProduct = (data, id) => new Promise((resolve, reject) => {
  db.query('INSERT INTO category SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
