const db = require('../helpers/db');

exports.getDeliveryTypes = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM delivery_type where name LIKE '${data.search}%'
  LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getDeliveryTypesCount = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) rowsCount FROM delivery_type where name LIKE '${data.search}%'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getDeliveryType = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM delivery_type where id='${id}'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.checkDeliveryType = (name) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM delivery_type where name='${name}'`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.addDeliveryType = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO delivery_type SET ?', data, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.updateDeliveryType = (id, data) => new Promise((resolve, reject) => {
  db.query(
    'UPDATE delivery_type SET ? WHERE id = ?',
    [data, id],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
});

exports.deleteDeliveryType = (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM delivery_type WHERE id = ?', [id], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});
