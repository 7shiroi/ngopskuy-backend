const db = require('../helpers/db');

exports.getCategory = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM category', (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getCategoryId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM category WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addCategory = (name) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO category (name) VALUES('${name}')`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.editCategory = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE category SET name='${data.name}' WHERE id=${data.id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.deleteCategory = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM category WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
