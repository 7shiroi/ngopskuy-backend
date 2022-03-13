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
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');

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
    orderBy = orderBy || 'name';
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

exports.getPromoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await promoModel.getPromo(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    return responseHandler(res, 200, 'Promo detail', getData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.postPromo = async (req, res) => {
  try {
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
        field: 'dateStart', required: true, type: 'date',
      },
      {
        field: 'dateEnd', required: true, type: 'date',
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (data.dateStart && data.dateEnd && validator.compareDate(data.dateStart, data.dateEnd) === 1) {
      error.push('Cannot set start date before end date');
    }
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    data = camelToSnake(data);
    const isOnlyOne = await promoModel.isOnlyOne(data);
    if (isOnlyOne.length !== 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, 'Input failed. name and code Promo has been input');
    }
    if (req.file) {
      data.image = req.file.path;
    }
    const result = await promoModel.postPromo(data);
    if (result.affectedRows !== 1) {
      return responseHandler(res, 500, 'Insert Failed. Unexpected error');
    }
    const final = await promoModel.getPromo(result.insertId);
    return responseHandler(res, 200, 'Insert Successfully', final);
  } catch (err) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, 'Unexpected Error', null, err, null);
  }
};

exports.patchPromo = async (req, res) => {
  try {
    if (!validator.idValidator(req.params.id)) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const { id } = req.params;
    const result = await promoModel.getPromo(id);
    if (result.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, `Promo with id ${id} is not found`);
    }
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
        field: 'dateStart', required: false, type: 'date',
      },
      {
        field: 'dateEnd', required: false, type: 'date',
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);

    if (data.dateStart && data.dateEnd && validator.compareDate(data.dateStart, data.dateEnd) === 1) {
      error.push('Cannot set start date before end date');
    }
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, 'Bad request', null, error, null);
    }
    if (req.file) {
      data.image = req.file.path;
    }
    if (Object.keys(data).length < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Please insert new data', null);
    }
    data = camelToSnake(data);

    if (data.image) {
      if (result[0].image) {
        deleteFile(cloudPathToFileName(result[0].image));
      }
    }
    const update = await promoModel.updatePromo(data, id);
    if (update.affectedRows !== 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, 'Updated failed');
    }
    const final = await promoModel.getPromo(id);
    return responseHandler(res, 200, 'Updated Successfully', final);
  } catch (err) {
    console.log(err);
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 400, 'Unexpected error', null, err, null);
  }
};

exports.deletePromo = async (req, res) => {
  try {
    if (!validator.idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const { id } = req.params;
    const result = promoModel.getPromo(id);
    if (result.length === 0) {
      return responseHandler(res, 400, null, null, `Promo with id ${id} is not found`);
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
