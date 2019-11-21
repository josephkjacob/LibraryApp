const express = require("express");
const signupRouter = express.Router();


function router(nav) {
    signupRouter.route("/")
        .get((req, res) => {
            res.render("signup.ejs",
            {
                nav,
                title: "Register"
            });
        });

        signupRouter.route("/login")
        .get((req, res) => {
            res.render("login.ejs",
            {
                nav,
                title: "LogIn"
            })
        })
        return signupRouter;

}


module.exports = router;