const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();

mongoose.connect("mongodb://localhost:27017/prac_day");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));


app.use("/", require("./routes/auth"));
app.use("/courses", require("./routes/course"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});