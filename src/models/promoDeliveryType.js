const db = require('../helpers/db');

exports.getIdPromo = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE id = ?', [data.id_promo], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getIdDeliveryType = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM delivery_type WHERE id = ?', [data.id_delivery_type], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getIsOnlyOne = (data) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo_delivery_type WHERE id_promo=? AND id_delivery_type=?', [data.id_promo, data.id_delivery_type], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.postPromoDeliveryType = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO promo_delivery_TYPE SET ?', [data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getData = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT pdt.id , p.name as product_promo_name, dt.name as delivery_type_name FROM promo_delivery_type pdt 
  LEFT JOIN promo p ON pdt.id_promo = p.id 
  LEFT JOIN delivery_type dt ON pdt.id_delivery_type = dt.id WHERE pdt.id_promo=${data.id_promo} AND pdt.id_delivery_type = ${data.id_delivery_type}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getDataById = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo_delivery_type WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.patchPromoDeliveryType = (id, data) => new Promise((resolve, reject) => {
  db.query('UPDATE promo_delivery_type SET ? WHERE id = ?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deletedPromoDeliveryType = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM promo_delivery_type WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getListPromoDT = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo_delivery_type', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getListPromoDTByIdPromo = (id_promo) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo_delivery_type WHERE id_promo = ?', [id_promo], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
