const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, comparePassword } = require('../helpers/validator');
const userModel = require('../models/user');

const { APP_SECRET } = process.env;

exports.login = async (req, res) => {
  const fillable = [
    {
      field: 'email', required: true, type: 'email', max_length: 100,
    },
    {
      field: 'password', required: true, type: 'password', by_pass_validation: true,
    },
  ];
  const { error, data } = inputValidator(req, fillable);
  if (error.length > 0) {
    return responseHandler(res, 400, null, null, error);
  }
  const result = await userModel.getUserByEmail(data.email);
  if (result.length > 0) {
    if (await argon2.verify(result[0].password, data.password)) {
      const authData = {
        id: result[0].id,
        role: result[0].role,
      };
      const token = jwt.sign(authData, APP_SECRET);
      return responseHandler(res, 200, 'Login success!', token);
    }
    return responseHandler(res, 401, 'Invalid credential!');
  }
  return responseHandler(res, 401, 'Invalid credential!');
};

exports.register = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'first_name', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'last_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: true, type: 'email', max_length: 100,
      },
      {
        field: 'password', required: true, type: 'password',
      },
      {
        field: 'confirm_password', required: true, type: 'password', by_pass_validation: true,
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    const emailCheck = await userModel.getUserByEmail(data.email);
    if (emailCheck.length > 0) {
      error.push('Email has been used');
    }
    if (!comparePassword(data.password, data.confirm_password)) {
      error.push('Confirm password is not same');
    }
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    delete data.confirm_password;

    try {
      data.password = await argon2.hash(data.password);
    } catch (err) {
      return responseHandler(res, 500, null, null, 'Unexpected error');
    }
    data.id_role = 3;
    const registerUser = await userModel.addUser(data);
    if (registerUser.affectedRows > 0) {
      return responseHandler(res, 201, 'Register successful');
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
