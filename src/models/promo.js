const db = require('../helpers/db');

exports.getPromos = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM promo WHERE is_deleted=0 ORDER BY ${data.orderBy} ${data.sort} LIMIT ${data.limit} OFFSET ${data.offset} `, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getPromosCount = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS total FROM promo WHERE is_deleted=0 ORDER BY ${data.orderBy} ${data.sort}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getPromo = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE is_deleted=0 AND id=?', id, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.postPromo = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO promo SET ?', [data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.isOnlyOne = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM promo WHERE name='${data.name}' || promo_code='${data.promo_code}'`, (err, res) => {
    if (err)reject(err);
    resolve(res);
  });
});

exports.getProduct = (id, name) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE id = ? && name = ? && is_deleted = 0', [id, name], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updatePromo = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE promo SET ? WHERE id = ?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deletedPromo = (id) => new Promise((resolve, reject) => {
  db.query('UPDATE promo SET is_deleted = 1 WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getPromoIsDeleted = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE is_deleted=1 AND id=?', id, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
