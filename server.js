const express = require("express");
const session = require("express-session");
const app = express();

// Moteur de template
app.set("view.engine", "ejs");

// Middleware
app.use("/assets", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "hfeznuyhuchnui",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(require("./middlewares/flash.js"));

// Routes
app.get("/", (req, res) => {
  let Message = require("./models/message.js");
  Message.all(function (messages) {
    res.render("templates/index.ejs", { messages: messages });
  });
});

app.post("/", (req, res) => {
  if (req.body.message === undefined || req.body.message === "") {
    req.flash("error", "Vous n'avez pas posté de message.");
    res.redirect("/");
  } else {
    let Message = require("./models/message.js");
    Message.create(req.body.message, function () {
      req.flash("success", "Le message a bien était enregistré.");
      res.redirect("/");
    });
  }
});

app.get("/message/:id", (req, res) => {
  let Message = require("./models/message.js");
  Message.find(req.params.id, function (message) {
    res.render("templates/message/show.ejs", { message: message });
  });
});

app.listen(8000);
