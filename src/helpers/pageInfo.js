/* eslint-disable no-console */
const { APP_URL } = process.env;

exports.pageInfo = (total, limit, page, url, route) => {
  // const {
  //   total, limit, page, url, route,
  // } = data;
  console.log(limit, total);
  console.log(page);
  const last = Math.ceil(total / limit);
  console.log(last);
  const pageInfo = {
    prev: page > 1 ? `${APP_URL}/${route}?page=${page - 1}&${url}` : null,
    next: page < last ? `${APP_URL}/${route}?page=${page + 1}&${url}` : null,
    totalData: total,
    currentPage: page,
    lastPage: last,
  };
  return pageInfo;
};
