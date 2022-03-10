/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const validator = require('../helpers/validator');
const responseHandler = require('../helpers/responseHandler');
const promoModel = require('../models/promo');
const db = require('../helpers/db');
const promo = require('../routes/promo');

exports.getPromo = async (req, res) => {
  try {
    const results = await promoModel.getPromo();
    if (results.length > 0) {
      responseHandler(res, 200, 'List of promo', results);
    } else {
      responseHandler(res, 404, 'Data not found', null, null, null);
    }
  } catch (err) {
    responseHandler(res, 500, 'Unexpeceted error', null, err, null);
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
    const { error, data } = validator.inputValidator(req, fillable);
    if (!dateStart || !dateEnd) {
      error.push('cek input date');
    }
    data.dateStart = req.body.dateStart;
    data.dateEnd = req.body.dateEnd;
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    const isOnlyOne = await promoModel.isOnlyOne(data);
    if (isOnlyOne.length === 0) {
      const result = await promoModel.postPromo(data);
      if (result.affectedRows === 1) {
        return responseHandler(res, 200, 'Insert Successfully');
      }
      return responseHandler(res, 400, 'Inserted failed', null, null, null);
    }
    responseHandler(res, 400, 'Input failed. name and code Promo has been input', null, null, null);
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
    const produk = await promoModel.getProduk(id, nameP);
    if (produk.length !== 1) {
      return responseHandler(res, 404, 'Produk not found. cek your id and name', null, null, null);
    }
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
    const { error, data } = validator.inputValidator(req, fillable);
    if (!dateStart || !dateEnd) {
      return responseHandler(res, 400, 'cek input date', null, null, null);
    }
    data.dateStart = req.body.dateStart;
    data.dateEnd = req.body.dateEnd;
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    const update = await promoModel.updatePromo(data, id);
    if (update.affectedRows === 1) {
      responseHandler(res, 200, 'Updated successfully');
    }
    responseHandler(res, 400, 'Updated failed', null, null, null);
  } catch (err) {
    responseHandler(res, 400, 'Unexpected error', null, err, null);
  }
};

exports.deletePromo = async (req, res) => {
  try {
    const { id, name } = req.query;
    const produk = await promoModel.getProduk(id, name);
    if (produk.length === 1) {
      const result = await promoModel.deletePromo(id);
      if (result.affectedRows === 1) {
        return responseHandler(res, 200, 'Deleted successfully', produk[0]);
      }
      return responseHandler(res, 500, 'Deleted failed', null, null);
    }
    return responseHandler(res, 404, 'Data not found', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err, null);
  }
};
