const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(
  "./data/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
      console.log("Getting error " + err);
      return;
    } else if (err) {
      console.log("Getting error " + err);
      exit(1);
    }
  }
);

module.exports = db;
