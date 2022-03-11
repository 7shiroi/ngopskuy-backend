/* eslint-disable no-console */
const db = require('../helpers/db');

exports.getPromos = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE is_deleted=0', (err, res) => {
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
  const {
    name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image,
  } = data;
  db.query('INSERT INTO promo (`name`, `normal_price`, `description`, `promo_code`, `date_start`, `date_end`, `discount_value`, `image`) VALUES (?,?,?,?,?,?,?,?)', [name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.isOnlyOne = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM promo WHERE name='${data.name}' || promo_code='${data.promoCode}'`, (err, res) => {
    if (err)reject(err);
    resolve(res);
  });
});

exports.getProduk = (id, name) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo WHERE id = ? && name = ?', [id, name], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updatePromo = (data, id) => new Promise((resolve, reject) => {
  const {
    name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image,
  } = data;
  db.query('UPDATE promo SET name = ? , normal_price=?, description=?, promo_code=?, date_start=?, date_end=?, discount_value=?, image=? WHERE id=?', [name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.deletePromo = (id) => new Promise((resolve, reject) => {
  db.query('UPDATE promo SET is_deleted = 1 WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
