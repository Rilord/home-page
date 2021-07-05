var app             = require("express");
var router          = app.Router();
var blog            = require("../models/blog");
var User            = require("../models/user");

router.use(function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
});

router.get("/", (req, res) => {
    res.render("admin/layouts/app.html");
})

router.get("/blogs-page", (req, res) => {
    res.render("admin/blog/index.html");
});

router.get("/blog/new", (req, res) => {
    res.render("admin/blog/create.html");
});

router.get("/blogs/", (req, res) => {
    blog.find((err, blogs) => {
        if (err) throw(err);

        res.json(blogs);
    });
});

router.get("/blog/:id/edit", (req, res) => {
    blog.findById(req.params.id, (err, blog) => {
        if (err) throw(err);

        res.json(blog);
    });
});

router.post("/blog/create", (req, res) => {
    blog.create(req.body, (err) => {
        if (err) throw err;

        res.json({ success: true });
    });
});

router.post("/blog/:id/update", (req, res) => {

    blog.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err) throw err;

        res.json({success: true});
    });
});

router.post("/blog/:id/delete", function(req, res) {
    blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) throw err;

        res.json({success: true});
    });
});

module.exports = router;