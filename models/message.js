const db = require("../config/db");
const moment = require("../config/moment");

class Message {
  constructor(row) {
    this.row = row;
  }

  get id() {
    return this.row.id;
  }

  get content() {
    return this.row.content;
  }

  get create_at() {
    return moment.unix(this.row.create_at);
  }

  static create(content, cb) {
    let start = Math.trunc(Date.now() / 1000);
    console.log(start);
    db.run(
      `INSERT INTO messages (content, create_at) VALUES (?,?)`,
      [content, start],
      (err, result) => {
        if (err) throw err;
        cb(result);
      }
    );
  }

  static all(cb) {
    db.all(`SELECT * FROM messages`, (err, rows) => {
      if (err) throw err;
      cb(rows.map((row) => new Message(row)));
    });
  }

  static find(id, cb) {
    db.get(`SELECT * FROM messages WHERE id = ?`, [id], (err, row) => {
      if (err) throw err;
      cb(new Message(row));
    });
  }
}

module.exports = Message;
