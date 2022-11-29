const mysql = require('mysql');

function sacuvajPoruku(text_poruke, username, slika_korisnika, kreirana) {

  const connection = mysql.createConnection({
    host: '',
    port: '',
    user: ''
    password: '',
    database: ''
  });

  connection.connect();

  return new Promise(() => {
    ///////////////////////////////////////
    connection.query("INSERT INTO poruke (username, slika_korisnika, kreirana, text_poruke) VALUES (?,?,?,?)", [username, slika_korisnika, kreirana, text_poruke], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    ///////////////////////////////////////
    connection.end();
  });
}
module.exports = sacuvajPoruku;