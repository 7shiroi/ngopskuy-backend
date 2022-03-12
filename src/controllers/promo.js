/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const validator = require('../helpers/validator');
const responseHandler = require('../helpers/responseHandler');
const promoModel = require('../models/promo');
const { camelToSnake } = require('../helpers/camelToSnake');
const { pageInfo } = require('../helpers/pageInfo');
const { dinamisUrl } = require('../helpers/dinamisUrl');

exports.getPromo = async (req, res) => {
  try {
    let {
      page, limit, orderBy, sort,
    } = req.query;
    req.body = req.query;
    const fillable = [
      {
        field: 'page', required: false, type: 'integer', can_zero: false,
      },
      {
        field: 'limit', required: false, type: 'integer', can_zero: false,
      },
      {
        field: 'orderBy', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'sort', required: false, type: 'varchar', max_length: 100,
      },
    ];
    let { error } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    orderBy = orderBy || 'id';
    sort = sort || 'ASC'; // ASC or DESC
    let offset = (page - 1) * limit;
    const data = {
      offset, limit, orderBy, sort,
    };
    const url = dinamisUrl(req.query); // digunakan untuk membuat url berdasarkan req.query
    const results = await promoModel.getPromos(data);
    if (results.length === 0) {
      return responseHandler(res, 404, 'Data not found');
    }
    const resultTotal = await promoModel.getPromosCount(data);
    const { total } = resultTotal[0];
    const dataPageInfo = pageInfo(total, limit, page, url, 'promo');
    return responseHandler(res, 200, 'List of Promo', results, null, dataPageInfo);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err, null);
  }
};

exports.postPromo = async (req, res) => {
  try {
    let {
      name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image,
    } = req.body;

    const fillable = [
      {
        field: 'name', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'normalPrice', required: true, type: 'integer', can_zero: true,
      },
      {
        field: 'description', required: true, type: 'text',
      },
      {
        field: 'promoCode', required: true, type: 'varchar', max_length: 8,
      },
      {
        field: 'discountValue', required: true, type: 'integer',
      },
      {
        field: 'image', required: false, type: 'text',
      },
    ];
    dateStart = validator.dateValidation(req.body.dateStart);
    dateEnd = validator.dateValidation(req.body.dateEnd);
    let { error, data } = validator.inputValidator(req, fillable);
    if (!dateStart || !dateEnd) {
      error.push('cek input date');
    }
    data.dateStart = req.body.dateStart;
    data.dateEnd = req.body.dateEnd;
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    data = camelToSnake(data);
    const isOnlyOne = await promoModel.isOnlyOne(data);
    if (isOnlyOne.length !== 0) {
      return responseHandler(res, 400, 'Input failed. name and code Promo has been input');
    }
    const result = await promoModel.postPromo(data);
    if (result.affectedRows !== 1) {
      return responseHandler(res, 500, 'Insert Failed. Unexpected error');
    }
    const final = await promoModel.getPromo(result.insertId);
    return responseHandler(res, 200, 'Insert Successfully', final);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected Error', null, err, null);
  }
};

exports.patchPromo = async (req, res) => {
  try {
    let {
      name, normalPrice, description, promoCode, dateStart, dateEnd, discountValue, image,
    } = req.body;
    const { id } = req.query;
    const nameP = req.query.name;
    const fillable = [
      {
        field: 'name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'normalPrice', required: false, type: 'integer', can_zero: true,
      },
      {
        field: 'description', required: false, type: 'text',
      },
      {
        field: 'promoCode', required: false, type: 'varchar', max_length: 8,
      },
      {
        field: 'discountValue', required: false, type: 'integer',
      },
      {
        field: 'image', required: false, type: 'text',
      },
    ];
    dateStart = validator.dateValidation(req.body.dateStart);
    dateEnd = validator.dateValidation(req.body.dateEnd);
    let { error, data } = validator.inputValidator(req, fillable);
    if (!dateStart || !dateEnd) {
      return responseHandler(res, 400, 'cek input date', null, null, null);
    }
    data.dateStart = req.body.dateStart;
    data.dateEnd = req.body.dateEnd;
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    const produk = await promoModel.getProduct(id, nameP);
    if (produk.length !== 1) {
      return responseHandler(res, 404, 'Produk not found. cek your id and name', null, null, null);
    }
    data = camelToSnake(data);
    console.log(data);
    const update = await promoModel.updatePromo(data, id);
    if (update.affectedRows !== 1) {
      return responseHandler(res, 500, 'Updated failed');
    }
    const final = await promoModel.getPromo(id);
    return responseHandler(res, 200, 'Updated Successfully', final);
  } catch (err) {
    return responseHandler(res, 400, 'Unexpected error', null, err, null);
  }
};

exports.deletePromo = async (req, res) => {
  try {
    const { id, name } = req.query;
    const product = await promoModel.getProduct(id, name);
    if (product.length !== 1) {
      return responseHandler(res, 404, 'Data not found. Cek your id');
    }
    const isDeleted = await promoModel.deletedPromo(id);
    if (isDeleted.affectedRows !== 1) {
      return responseHandler(res, 500, 'Deleted failed');
    }
    const final = await promoModel.getPromoIsDeleted(id);
    return responseHandler(res, 200, 'Deleted Successfully', final);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err, null);
  }
};
