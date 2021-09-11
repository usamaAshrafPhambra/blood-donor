const express = require("express");
const connectDB = require("./config/db");
// const passport = require('passport');
const App = express();

// require('./config/passport')(passport)
connectDB();

//passport middleware
// App.use(passport.initialize())

App.use(
  express.json({
    extended: false,
  })
);

App.get("/", (req, res) => {
  res.send;
  ("app is runing on this port");
});

App.use("/api/user", require("./routes/api/user"));
App.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5050;

App.listen(PORT, () => {
  console.log("server start on 5050");
});
