const db = require('../helpers/db');

exports.getProduct = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.name) {
    extraQueryWhere += ` AND name LIKE '%${data.name}%'`;
  }
  if (data.minPrice) {
    extraQueryWhere += ` AND price>= ${data.minPrice}`;
  }
  if (data.maxPrice) {
    extraQueryWhere += ` AND price<= ${data.maxPrice}`;
  }
  const q = db.query(`SELECT * FROM product WHERE is_deleted=0 ${extraQueryWhere} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
  console.log(q.sql);
});

exports.getProductByCategory = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.name) {
    extraQueryWhere += ` AND name LIKE '%${data.name}%'`;
  }
  if (data.minPrice) {
    extraQueryWhere += ` AND price>= ${data.minPrice}`;
  }
  if (data.maxPrice) {
    extraQueryWhere += ` AND price>= ${data.maxPrice}`;
  }
  if (data.idCategory) {
    extraQueryWhere += ` AND id_category=${data.idCategory}`;
  }
  db.query(`SELECT * FROM product WHERE is_deleted=0 ${extraQueryWhere} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getTotalData = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.name) {
    extraQueryWhere += ` AND name LIKE '%${data.name}%'`;
  }
  if (data.minPrice) {
    extraQueryWhere += ` AND price>= ${data.minPrice}`;
  }
  if (data.maxPrice) {
    extraQueryWhere += ` AND price>= ${data.maxPrice}`;
  }
  if (data.idCategory) {
    extraQueryWhere += ` AND id_category=${data.idCategory}`;
  }
  db.query(`SELECT COUNT(*) AS totalData FROM product WHERE is_deleted=0 ${extraQueryWhere}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.addProduct = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO product SET ?', data, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM product WHERE id=${id} AND is_deleted=0`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getProductByName = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.id) {
    extraQuery += ` AND id!=${data.id}`;
  }
  db.query(`SELECT * FROM product WHERE name='${data.name}' ${extraQuery} AND is_deleted=0`, (err, res) => {
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
  db.query(`UPDATE product SET is_deleted=1 WHERE id=${id}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getFavoriteProducts = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  let extraQueryLimit = '';
  if (data.name) {
    extraQueryWhere += ` AND p.name LIKE '%${data.name}%'`;
  }
  if (data.minPrice) {
    extraQueryWhere += ` AND price>=${data.minPrice}`;
  }
  if (data.maxPrice) {
    extraQueryWhere += ` AND price<=${data.maxPrice}`;
  }
  if (data.idCategory) {
    extraQueryWhere += ` AND c.id=${data.idCategory}`;
  }
  if (data.limit && data.offset !== undefined) {
    extraQueryLimit = ` LIMIT ${data.limit} OFFSET ${data.offset}`;
  }
  db.query(`SELECT 
      p.id, 
      p.name, 
      p.stock,
      p.price,
      c.name category,
      p.description,
      p.image,
      (SELECT SUM(quantity) from transaction_product tp where tp.id_product = p.id AND DATEDIFF(CURRENT_DATE, tp.created_at) < 31) transaction_count
    FROM product p
    JOIN transaction_product tp ON tp.id_product=p.id
    JOIN category c ON c.id=p.id_category
    WHERE 1=1
    ${extraQueryWhere}
    GROUP BY p.id
    ORDER BY transaction_count DESC
    ${extraQueryLimit}`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});

exports.getFavoriteProductsCount = (data) => new Promise((resolve, reject) => {
  let extraQueryWhere = '';
  if (data.name) {
    extraQueryWhere += ` AND p.name LIKE '%${data.name}%'`;
  }
  if (data.minPrice) {
    extraQueryWhere += ` AND price>= ${data.minPrice}`;
  }
  if (data.maxPrice) {
    extraQueryWhere += ` AND price>= ${data.maxPrice}`;
  }
  if (data.idCategory) {
    extraQueryWhere += ` AND c.id=${data.idCategory}`;
  }
  db.query(`SELECT 
      count(*) rowsCount FROM (SELECT 
        p.id, 
        p.name, 
        p.stock,
        p.price,
        c.name category,
        p.description,
        p.image,
        (SELECT SUM(quantity) from transaction_product tp where tp.id_product = p.id AND DATEDIFF(CURRENT_DATE, tp.created_at) < 31) transaction_count
      FROM product p
      JOIN transaction_product tp ON tp.id_product=p.id
      JOIN category c ON c.id=p.id_category
      WHERE 1=1
      ${extraQueryWhere}
      GROUP BY p.id) getFavoriteProductCount`, (err, res) => {
    if (err) { reject(err); }
    resolve(res);
  });
});
