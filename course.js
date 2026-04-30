const express = require("express");
const Course = require("../models/course");

const router = express.Router();

// INDEX
router.get("/", async (req, res) => {
    const courses = await Course.find();
    res.render("courses/index", { courses });
});

// NEW
router.get("/new", (req, res) => {
    res.render("courses/new");
});

router.post("/", async (req, res) => {
    await Course.create(req.body);
    res.redirect("/courses");
});

// SHOW
router.get("/:id", async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render("courses/show", { course });
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render("courses/edit", { course });
});

// UPDATE (courseName NOT editable)
router.put("/:id", async (req, res) => {
    const { price, image, duration, courseStartDate } = req.body;

    await Course.findByIdAndUpdate(req.params.id, {
        price,
        image,
        duration,
        courseStartDate
    });

    res.redirect(`/courses/${req.params.id}`);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
});

module.exports = router;