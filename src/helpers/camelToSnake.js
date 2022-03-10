// camel case suatu variabel dimana setiap kata dipisahkan dengan huruf besar dimana huruf pertama kecil
// Snake case suatu nama variabel dimana setiap kata akan menjadi kecil akan tetapi dipisahkan oleh underscore

exports.camelToSnake = (data) => {
  for (const [key, value] of Object.entries(data)) {
    console.log(key.split());
  }
  // console.log(data);
};
