const argon2 = require('argon2');

const userModel = require('../models/user');
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, comparePassword } = require('../helpers/validator');
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const getProfile = await userModel.getProfile(userId);
    if (getProfile.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    return responseHandler(res, 200, 'Profile data', getProfile[0]);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const getProfile = await userModel.getProfile(userId);
    if (getProfile.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const fillable = [
      {
        field: 'first_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'last_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: false, type: 'email', max_length: 100,
      },
      {
        field: 'display_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'phone_number', required: false, type: 'phone_number', max_length: 14,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'birth_date', required: false, type: 'date',
      },
      {
        field: 'gender', required: false, type: 'enum', options: ['male', 'female'],
      },
    ];

    const { data, error } = inputValidator(req, fillable);
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }

    if (req.file) {
      data.image = req.file.path;
    }

    if (Object.keys(data).length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'All new data cannot be empty');
    }
    data.id = userId;
    if (data.email) {
      const emailFound = await userModel.getUserByEmail(data);
      if (emailFound.length > 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Email has already been used');
      }
    }
    if (data.phone_number) {
      const phoneNumberFound = await userModel.getUserByPhoneNumber(data);
      if (phoneNumberFound.length > 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Phone number has already been used');
      }
    }

    if (data.image) {
      if (getProfile[0].image) {
        deleteFile(cloudPathToFileName(getProfile[0].image));
      }
    }
    const editUserData = await userModel.updateUser(userId, data);
    if (editUserData.affectedRows === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const updatedData = await userModel.getUser(userId);
    if (updatedData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    return responseHandler(res, 200, 'Profile updated!', updatedData[0]);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const getProfile = await userModel.getUser(userId);
    if (getProfile.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Errro');
    }

    const fillable = [
      {
        field: 'oldPassword', required: true, type: 'password', by_pass_validation: true,
      },
      {
        field: 'newPassword', required: true, type: 'password',
      },
      {
        field: 'confirmNewPassword', required: true, type: 'password', by_pass_validation: true,
      },
    ];

    const { data, error } = inputValidator(req, fillable);

    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    if (await argon2.verify(getProfile[0].password, data.oldPassword) === false) {
      return responseHandler(res, 400, null, null, 'Your old password is incorrect!');
    }

    if (comparePassword(data.newPassword, data.oldPassword)) {
      return responseHandler(res, 400, null, null, 'You cannot use your old password!');
    }

    if (!comparePassword(data.newPassword, data.confirmNewPassword)) {
      return responseHandler(res, 400, null, null, 'Confirm password is not the same!');
    }

    const updatePassword = userModel.updateUser(
      userId,
      { password: await argon2.hash(data.newPassword) },
    );

    if (updatePassword.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    return responseHandler(res, 200, 'Your password has been changed');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
