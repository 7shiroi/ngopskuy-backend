const db = require('../helpers/db');

exports.getSize = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM size', (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getSizeId = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM size WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getSizeName = (name) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM size WHERE name='${name}'`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addSize = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO size (name, description) VALUES('${data.name}', '${data.description}')`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.updateSize = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE size SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.deleteSize = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM size WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
