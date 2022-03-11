const db = require('../helpers/db');

exports.getPromoSizes = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT ps.id, p.name promo_name, s.name size_name, s.label, s.description FROM promo_size ps
      JOIN promo p on p.id=ps.id_promo
      JOIN size s on s.id=ps.id_size
    WHERE p.is_deleted = 0
      AND (p.name LIKE '%${data.search}%'
        OR s.name LIKE '%${data.search}%')
    LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getPromoSizesCount = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) FROM promo_size ps
      JOIN promo p on p.id=ps.id_promo
      JOIN size s on s.id=ps.id_size
    WHERE p.is_deleted = 0
      AND (p.name LIKE '%${data.search}%'
        OR s.name LIKE '%${data.search}%'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getPromoSize = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT ps.id, p.id id_promo, p.name promo_name, s.id id_size, s.name size_name, s.label, s.description FROM promo_size ps
      JOIN promo p on p.id=ps.id_promo
      JOIN size s on s.id=ps.id_size
    WHERE ps.id=${id} 
      AND p.is_deleted = 0`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.checkPromoSize = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id != ${data.id}`;
  }
  db.query(`SELECT * FROM promo_size 
    WHERE id_promo=${data.id_promo}
      AND id_size=${data.id_size}
      ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.addPromoSize = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO promo_size SET ?', data, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.updatePromoSize = (id, data) => new Promise((resolve, reject) => {
  db.query(
    'UPDATE promo_size SET ? WHERE id = ?',
    [data, id],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
});

exports.deletePromoSize = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM promo_size WHERE id = ?', [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
