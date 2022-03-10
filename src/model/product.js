const db = require('../helpers/db');

exports.getProduct = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.name}%' AND isDeleted=0 AND price>=${data.minPrice} AND price<=${data.maxPrice} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductByCategory = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.name}%' AND isDeleted=0 AND price>=${data.minPrice} AND price<=${data.maxPrice} AND idCategory=${data.idCategory} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getTotalData = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM product WHERE name LIKE '%${data.name}%' AND isDeleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProduct = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO product (name, idCategory, price, description, stock, deliveryHourStart, deliveryHourEnd, image) VALUES('${data.name}', ${data.idCategory},${data.price}, '${data.description}', ${data.stock}, '${data.deliveryHourStart}', '${data.deliveryHourEnd}', '${data.image}') `, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE id=${id} AND isDeleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductByName = (name) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE name='${name}' AND isDeleted=0`, (err, res) => {
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
  db.query(`UPDATE product SET isDeleted=1 WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
