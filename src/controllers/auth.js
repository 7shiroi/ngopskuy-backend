const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const otp = require('../models/otp');
const mail = require('../helpers/mail');

const { APP_SECRET, APP_EMAIL } = process.env;
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, comparePassword, passwordValidation } = require('../helpers/validator');
const { generateOtp } = require('../helpers/generator');

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
      return responseHandler(res, 200, 'Login success!', [token]);
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

exports.forgotPass = async (req, res) => {
  const fillable = [
    {
      field: 'email', required: true, type: 'email', max_length: 100,
    },
    {
      field: 'code', required: false, type: 'varchar', max_length: 6,
    },
    {
      field: 'password', required: false, type: 'password',
    },
    {
      field: 'confirm_password', required: false, type: 'password', by_pass_validation: true,
    },
  ];
  const { data, error } = inputValidator(req, fillable);
  if (error.length > 0) {
    return responseHandler(res, 400, null, null, error);
  }

  const userByEmail = await userModel.getUserByEmail(data.email);
  if (userByEmail.length === 0) {
    return responseHandler(res, 400, `User with email ${data.email} is not found`);
  }

  if (!data.code) {
    const user = await otp.getRequestId({ email: data.email, idOtpType: 2 });
    if (user.length > 0) {
      return responseHandler(res, 200, 'Your reset password code has been sent to your email!');
    }
    const randomCode = generateOtp(6);
    const addOtp = { email: data.email, code: randomCode, id_otp_type: 2 };
    const reset = await otp.createRequest(addOtp);
    if (reset.affectedRows >= 1) {
      try {
        await mail.sendMail({
          from: APP_EMAIL,
          to: data.email,
          subject: 'Reset Your Password | Vehicles Rent',
          text: String(randomCode),
          html: `<b>Your Code for Reset Password is ${randomCode}</b>`,
        });
      } catch (err) {
        return responseHandler(res, 500, null, null, 'Unexpected Error');
      }
    }
    return responseHandler(res, 200, 'Your reset password code has been sent to your email!');
  }
  if (data.email) {
    try {
      const codeByEmail = await otp.getRequestId({ email: data.email, idOtpType: 2 });
      if (codeByEmail.length === 0) {
        return responseHandler(res, 400, 'You do not have a code for your verification or it has been expired!');
      }
      if (data.code !== codeByEmail[0].code) {
        return responseHandler(res, 400, 'Invalid code!');
      }
      if (!data.password || !data.confirm_password) {
        return responseHandler(res, 400, null, null, 'Password and confirm password must be filled');
      }
      if (data.password && !passwordValidation(data.password)) {
        return responseHandler(res, 400, null, null, 'Your password must include at lease 1 uppercase, 1 lowercase and 1 number');
      }
      if (data.confirm_password && !comparePassword(data.password, data.confirm_password)) {
        return responseHandler(res, 400, null, null, 'Confirm password not same as password');
      }
      const hash = await argon2.hash(data.password);
      const update = await userModel.updateUser(userByEmail[0].id, { password: hash });
      if (update.affectedRows === 1) {
        await otp.updateRequest({ is_expired: 1 }, codeByEmail[0].id);
        return responseHandler(res, 200, 'Password has been reset!');
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    } catch (err) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
  } else {
    return responseHandler(res, 400, null, null, 'You have to provide Confirmation Code');
  }
};

exports.verify = async (req, res) => {
  try {
    const users = req.user.id;
    const userData = await userModel.getUser(users);
    if (userData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    if (userData[0].is_verified === 1) {
      return responseHandler(res, 400, 'You have been verified!');
    }
    const userEmail = userData[0].email;

    const fillable = [{
      field: 'code', required: false, type: 'varchar', max_length: 6,
    }];

    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    if (!data.code) {
      const codeByIdUser = await otp.getRequestId({ email: userEmail, idOtpType: 1 });
      if (codeByIdUser.length > 0) {
        return responseHandler(res, 400, 'Code for your verification has been sent to your email, please check it!');
      }
      const randomCode = generateOtp(6);
      const dataAddOtp = { email: userEmail, code: randomCode, id_otp_type: 1 };
      const addOtp = await otp.createRequest(dataAddOtp);
      if (addOtp.affectedRows > 0) {
        const result = await otp.getOtp(addOtp.insertId);
        if (result.length > 0) {
          try {
            await mail.sendMail({
              from: APP_EMAIL,
              to: userEmail,
              subject: 'User verification | Backend Beginner',
              text: `${randomCode}`,
              html: `Please use this code below to verify your account<br><b>${randomCode}</b>`,
            });
            return responseHandler(res, 200, 'Your code for your password reset has been sent to your email!');
          } catch (err) {
            return responseHandler(res, 500, null, null, 'Unexpected Error');
          }
        }
        return responseHandler(res, 500, null, null, 'Unexpected Error');
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    const codeByEmail = await otp.getRequestId({ email: userEmail, idOtpType: 1 });
    if (codeByEmail.length === 0) {
      return responseHandler(res, 400, 'You do not have a code for your verification or it has been expired!');
    }
    if (data.code !== codeByEmail[0].code) {
      return responseHandler(res, 400, 'Invalid code!');
    }

    const verifyUserAccount = await userModel.updateUser(users, { is_verified: 1 });
    if (verifyUserAccount.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const setOtpExpired = await otp.updateRequest({ is_expired: 1 }, codeByEmail[0].id);
    if (setOtpExpired.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    return responseHandler(res, 200, 'Your account has been verified');
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
