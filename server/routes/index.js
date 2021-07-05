var express = require("express");
var router  = express.Router();
var blog    = require("../models/blog");

router.get("/login", function isAuthenticatedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/admin#/blogs");
    } else {
        next();
    }} , function (req, res) {
        res.render("admin/login", { message: req.flash('error')});
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login")
});

router.get("/", (req, res) => {
    blog.find({}).sort({ created_at: -1 }).exec((err, blogs) => {
        if (err) throw(err);

        res.render("client/index", {
            title: "kodor",
            blogs: blogs,
            des: "kodor's blog",
            url: "/"
        });
    });
});

router.get("/blog/programming/:name/:id", (req, res) => {

    var name = req.params.name;
    var id = req.params.id;

    blog.findById(id, (req, blog) => {
        res.render("client/blog/blog", {
            title: name.split("-").join(" "),
            blog: blog,
            desc: blog.short_desc,
            url: "/blog/cs/" + name + "/" + id
        })
    });
});

router.get("/sitemap.xml", (req, res) => {
    blog.find({}).sort({ created_at: -1 }).exec((err, blogs) => {
        if (err) throw(err);

        res.setHeader('content-type', 'application/xml');
        res.render("sitemap", {
            blogs: blogs
        });
    });
});

module.exports = router;