const mysql = require('mysql');

function preuzmiPoruku() {

  const connection = mysql.createConnection({
    host: '',
    port: ,
    user: '',
    password: '',
    database: ''
  });

  connection.connect();

  return new Promise((sveporuke) => {
    ///////////////////////////////////////
    connection.query("SELECT * FROM poruke", function (err, result) {
      if (err) {
        console.log(err);
      }
      sveporuke(JSON.stringify(result));
    });
    ///////////////////////////////////////
    connection.end();
  });
}
module.exports = preuzmiPoruku;