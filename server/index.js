// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Database connection

const mongo = require("./utilities/database");
mongo.connect();

// Express route handlers
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use("/posts", require("./routes/postsRoutes"));

app.listen(5000, (err) => {
  console.log("Listening");
});
