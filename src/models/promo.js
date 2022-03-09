const db = require('../helpers/db');

exports.getPromo = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM promo', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
