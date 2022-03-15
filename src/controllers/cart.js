const { APP_URL } = process.env;
const responseHandler = require('../helpers/responseHandler');
const cusHistoryModel = require('../models/custHistory');

exports.getCart = async (req, res) => {
  try {
    const { id } = req.user;
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 9;
    const offset = (page - 1) * limit;
    const data = {
      page, limit, offset,
    };
    data.id_user = id;
    const getHistory = await cusHistoryModel.getCar(data);
    if (getHistory.length < 1) {
      return responseHandler(res, 404, null, null, 'No history found', null);
    }
    const getTotal = await cusHistoryModel.totalCustHistory(id);
    const url = `${APP_URL}/customer-history?`;
    const last = Math.ceil(getTotal[0].totalData / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
      totalData: getTotal[0].totalData,
      currentPage: page,
      lastPage: last,
    };
    if (getHistory.length === 1) {
      return responseHandler(res, 200, 'List of histories', [getHistory], null, null);
    }
    return responseHandler(res, 200, 'List of histories', getHistory, null, pageInfo);
  } catch {
    return responseHandler(res, 500, null, null, 'Unexpected error', null);
  }
};
