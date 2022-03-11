/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// camel case suatu variabel dimana setiap kata dipisahkan dengan huruf besar dimana huruf pertama kecil
// Snake case suatu nama variabel dimana setiap kata akan menjadi kecil akan tetapi dipisahkan oleh underscore

exports.camelToSnake = (data) => {
  const camel = data; // input data camelCaseVariabel to variable name
  const snake = {}; // initial object snake
  for (const [key, value] of Object.entries(camel)) { // loop data object from camel
    let temp = ''; // initial temp
    temp = camelToUnderscore(key); // convert variable from camelCaseVariable to camel_case_variable
    snake[temp] = value; // its same with snake.camel_case_variable = camelCaseVariable.value
  }
  return snake; // its variable from camel will convert into snake_case_variable
};

function camelToUnderscore(key) {
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('_').toLowerCase();
}
