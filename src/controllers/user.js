const argon2 = require('argon2');
const { cloudPathToFileName } = require('../helpers/converter');
const { deleteFile } = require('../helpers/fileHandler');
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const userModel = require('../models/user');
const userRoleModel = require('../models/user_role');

exports.getUsers = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search || '';
    page = page || 1;
    limit = limit || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };

    const count = await userModel.getUsersCount(data);
    const { rowsCount } = count[0];
    if (rowsCount > 0) {
      const lastPage = Math.ceil(rowsCount / limit);

      const results = await userModel.getUsers(data);
      if (results.length > 0) {
        const pageInfo = {
          prev: page > 1 ? `http://localhost:5000/user?search=${search}&page=${page - 1}&limit=${limit}` : null,
          next: page < lastPage ? `http://localhost:5000/user?search=${search}&page=${page + 1}&limit=${limit}` : null,
          totalData: rowsCount,
          currentPage: page,
          lastPage,
        };
        return responseHandler(res, 200, 'List Users', results, null, pageInfo);
      }
      return responseHandler(res, 400, 'List not found', results);
    }
    return responseHandler(res, 400, 'List not found');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const { id } = req.params;
    const results = await userModel.getUser(id);
    if (results.length > 0) {
      return responseHandler(res, 200, 'Detail user', results[0]);
    }
    return responseHandler(res, 404, 'User not found');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.addUser = async (req, res) => {
  // if (!req.user || req.user.role > 2) {
  //   if (req.file) {
  //     try {
  //       deleteFile(req.file.path);
  //     } catch (err) {
  //       return responseHandler(res, 500, null, null, err.message);
  //     }
  //   }
  //   return responseHandler(res, 403, 'FORBIDEN! You are not authorized to do this action!');
  // }
  try {
    const fillable = [
      {
        field: 'first_name', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'last_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'display_name', required: false, type: 'varchar', max_length: 32,
      },
      {
        field: 'password', required: true, type: 'password', by_pass_validation: true,
      },
      {
        field: 'phone_number', required: false, type: 'varchar', max_length: 16,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'gender', required: false, type: 'enum', options: ['male', 'female'],
      },
      {
        field: 'birth_date', required: false, type: 'date',
      },
      {
        field: 'id_role', required: false, type: 'integer',
      },
    ];

    const { data, error } = inputValidator(req, fillable);

    if (req.file) {
      data.image = req.file.path;
    }
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }

    const emailFound = await userModel.getUserByEmail(data.email);
    if (emailFound.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Email has already been used');
    }

    if (data.phone_number) {
      const phoneNumberFound = await userModel.getUserByPhoneNumber(data.phone_number);
      if (phoneNumberFound.length > 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Email has already been used');
      }
    }

    if (!data.id_role) {
      data.id_role = 3;
    }
    const roleFound = await userRoleModel.getUserRole(data.id_role);
    if (roleFound.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'User role not found');
    }

    try {
      data.password = await argon2.hash(data.password);
    } catch (err) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected error');
    }

    const addUserData = await userModel.addUser(data);
    if (addUserData.affectedRows === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const insertedData = await userModel.getUser(addUserData.insertId);
    if (insertedData.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    return responseHandler(res, 200, `${addUserData.affectedRows} user added`, insertedData[0]);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.editUser = async (req, res) => {
  // if (!req.user || req.user.role > 2) {
  //   if (req.file) {
  //     try {
  //       deleteFile(req.file.path);
  //     } catch (err) {
  //       return responseHandler(res, 500, null, null, err.message);
  //     }
  //   }
  //   return responseHandler(res, 403, 'FORBIDEN! You are not authorized to do this action!');
  // }
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const fillable = [
      {
        field: 'first_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'last_name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'display_name', required: false, type: 'varchar', max_length: 32,
      },
      {
        field: 'password', required: false, type: 'password', by_pass_validation: true,
      },
      {
        field: 'phone_number', required: false, type: 'varchar', max_length: 16,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'gender', required: false, type: 'enum', options: ['male', 'female'],
      },
      {
        field: 'birth_date', required: false, type: 'date',
      },
      {
        field: 'id_role', required: false, type: 'integer',
      },
    ];

    const { error, data } = inputValidator(req, fillable);
    data.id = parseInt(req.params.id, 10);

    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }
    const results = await userModel.getUser(data.id);
    if (results === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'User not found');
    }
    if (data.email) {
      const emailFound = await userModel.getUserByEmail(data.email);
      if (emailFound.length > 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Email has already been used');
      }
    }
    if (data.phone_number) {
      const phoneNumberFound = await userModel.getUserByPhoneNumber(data.phone_number);
      if (phoneNumberFound.length > 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Phone number has already been used');
      }
    }
    if (data.id_role) {
      const roleFound = await userRoleModel.getUserRole(data.id_role);
      if (roleFound.length === 0) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, `Id role ${data.id_role} not found`);
      }
    }

    if (data.password) {
      try {
        data.password = await argon2.hash(data.password);
      } catch (err) {
        return responseHandler(res, 500, null, null, 'Unexpected error');
      }
    }

    if (req.file) {
      if (results[0].image) {
        deleteFile(cloudPathToFileName(results[0].image));
      }
      data.image = req.file.path;
    }
    const editUserData = await userModel.updateUser(data.id, data);
    if (editUserData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const updatedData = await userModel.getUser(data.id);
    if (updatedData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    return responseHandler(res, 200, `User with id ${data.id} has been updated`, updatedData);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.hardDeleteUser = async (req, res) => {
  try {
    // if (!req.user || req.user.role > 2) {
    //   return responseHandler(res, 403, 'FORBIDEN! You are not authorized to do this action!');
    // }
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const { id } = req.params;

    const results = await userModel.getUserAll(id);
    if (results.length > 0) {
      if (results[0].image) {
        deleteFile(cloudPathToFileName(results[0].image));
      }
      try {
        await userModel.deleteUser(id);
        return responseHandler(res, 200, `User with id ${id} has been deleted`, results[0]);
      } catch (error) {
        return responseHandler(res, 500, null, null, 'Unexpected Error');
      }
    } else {
      return responseHandler(res, 400, 'User not found');
    }
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    // if (!req.user || req.user.role > 2) {
    //   return responseHandler(res, 403, 'FORBIDEN! You are not authorized to do this action!');
    // }
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const { id } = req.params;

    const results = await userModel.getUser(id);
    if (results.length > 0) {
      try {
        await userModel.updateUser(id, { is_deleted: 1 });
        return responseHandler(res, 200, `User with id ${id} has been deleted`, results[0]);
      } catch (error) {
        return responseHandler(res, 500, null, null, 'Unexpected Error');
      }
    } else {
      return responseHandler(res, 400, 'User not found');
    }
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
