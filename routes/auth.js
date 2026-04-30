const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

const router = express.Router();

// HOME
router.get("/", (req, res) => {
    res.redirect("/login");
});

// REGISTER
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { username, password, gender, number } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashed,
        gender,
        number
    });

    await user.save();
    res.redirect("/login");
});

// LOGIN
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.send("Wrong password");

    req.session.user = user;
    res.redirect("/courses");
});

// LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;