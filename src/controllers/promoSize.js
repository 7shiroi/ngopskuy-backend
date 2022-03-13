const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const promoSizeModel = require('../models/promoSize');
const promoModel = require('../models/promo');
const sizeModel = require('../models/size');

const { APP_URL } = process.env;

exports.getPromoSizes = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const offset = (page - 1) * limit;
    const data = { search, offset, limit };

    const results = await promoSizeModel.getPromoSizes(data);
    if (results.length === 0) {
      return responseHandler(res, 200, 'Promo sizes list is empty');
    }
    const dataCount = await promoSizeModel.getPromoSizesCount(data);
    const { rowsCount } = dataCount[0];
    const lastPage = Math.ceil(rowsCount / limit);
    const pageInfo = {
      prev: page > 1 ? `${APP_URL}/promo_size?search=${search}&page=${page - 1}&limit=${limit}` : null,
      next: page < lastPage ? `${APP_URL}/promo_size?search=${search}&page=${page + 1}&limit=${limit}` : null,
      totalData: rowsCount,
      currentPage: page,
      lastPage,
    };
    return responseHandler(res, 200, 'Promo sizes list', results, null, pageInfo);
  } catch (error) {
    return responseHandler(res, 500, 'Unexpected error!');
  }
};

exports.getPromoSize = async (req, res) => {
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid Id Format!');
    }
    const { id } = req.params;
    const results = await promoSizeModel.getPromoSize(id);
    if (results.length === 0) {
      return responseHandler(res, 404, `Promo size with id ${id} is not found`);
    }
    return responseHandler(res, 200, 'Promo sizes list', results[0]);
  } catch (error) {
    return responseHandler(res, 500, 'Unexpected error!');
  }
};

exports.addPromoSize = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    const fillable = [
      {
        field: 'id_promo', required: true, type: 'integer',
      },
      {
        field: 'id_size', required: true, type: 'integer',
      },
    ];

    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    const promoCheck = await promoModel.getPromo(data.id_promo);
    if (promoCheck.length === 0) {
      return responseHandler(res, 400, `Promo with id ${data.id_promo} is not found!`);
    }

    const sizeCheck = await sizeModel.getSizeId(data.id_size);
    if (sizeCheck.length === 0) {
      return responseHandler(res, 400, `Size with id ${data.id_size} is not found!`);
    }

    const promoSizeCheck = await promoSizeModel.checkPromoSize(data);
    if (promoSizeCheck.length > 0) {
      return responseHandler(res, 400, 'Data already exist!');
    }

    const addPromoSizeData = await promoSizeModel.addPromoSize(data);
    if (addPromoSizeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const insertedData = await promoSizeModel.getPromoSize(addPromoSizeData.insertId);
    if (insertedData.length > 0) {
      return responseHandler(res, 200, `${addPromoSizeData.affectedRows} promo size added`, insertedData);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.editPromoSize = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, 'Invalid id format!');
    }
    const { id } = req.params;
    const results = await promoSizeModel.getPromoSize(id);
    if (results.length === 0) {
      return responseHandler(res, 400, 'Promo size not found');
    }
    const fillable = [
      {
        field: 'id_promo', required: false, type: 'integer',
      },
      {
        field: 'id_size', required: false, type: 'integer',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    if (data.id_promo) {
      const promoCheck = await promoModel.getPromo(data.id_promo);
      if (promoCheck.length === 0) {
        return responseHandler(res, 400, `Promo with id ${data.id_promo} is not found!`);
      }
    }

    if (data.id_size) {
      const sizeCheck = await sizeModel.getSizeId(data.id_size);
      if (sizeCheck.length === 0) {
        return responseHandler(res, 400, `Size with id ${data.id_size} is not found!`);
      }
    }

    const updateData = {};
    updateData.id_promo = data.id_promo ? data.id_promo : results[0].id_promo;
    updateData.id_size = data.id_size ? data.id_size : results[0].id_size;
    updateData.id = results[0].id;
    const promoSizeCheck = await promoSizeModel.checkPromoSize(updateData);
    if (promoSizeCheck.length > 0) {
      return responseHandler(res, 400, 'Data already exist!');
    }

    const updatePromoSizeData = await promoSizeModel.updatePromoSize(id, data);
    if (updatePromoSizeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unepected Error');
    }
    const updatedData = await promoSizeModel.getPromoSize(id);
    if (updatedData.length > 0) {
      return responseHandler(res, 200, `Promo size with id ${id} has been updated`, updatedData[0]);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.deletePromoSize = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid Id Format!');
    }
    const { id } = req.params;

    const promoSizeData = await promoSizeModel.getPromoSize(id);
    if (promoSizeData.length === 0) {
      return responseHandler(res, 400, null, null, `Promo size with id ${id} is not found`);
    }

    const deletePromoSizeData = await promoSizeModel.deletePromoSize(id);
    if (deletePromoSizeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    return responseHandler(res, 200, `Promo size with id ${id} has been deleted`, promoSizeData);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
