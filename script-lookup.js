const argv = process.argv.splice(2);

const pg  = require('pg'),
      settings  = require("./settings.json");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



function getFirstName(name, cb){
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [name], cb);
}

function getLastName(name, cb){
  client.query("SELECT * FROM famous_people WHERE last_name = $1", [name], cb);
}

client.connect((err) => {
  if (err) {
    return console.log("error on query")
  }

  getFirstName(argv[0], (err, result) => {
    if (err) {
      console.log("getting first name error");
    }
      console.log(result.rows);
  })
  getLastName(argv[0], (err, result) => {
     if (err) {
      console.log("getting first name error");
    }
    console.log(result.rows);
    client.end();
  })

});