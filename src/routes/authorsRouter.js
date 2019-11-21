const express = require("express");
const authorsRouter = express.Router();

var authors = [
    {
        name:"M. T. Vasudevan Nair",
        book:"Randamuzham",
        award:"Padma Bhushan",
        image:"/images/mt.jpg"
    },
    {
        name:"Chetan Bhagat",
        book:"2 States",
        award:"Filmfare Award",
        image:"/images/chetan.jpg"
    },
    {
        name:"A P J Abdul Kalam",
        book:"Wings of Fire",
        award:"Bharat Ratna",
        image:"/images/wingsoffire.jpg"
    },
    {
        name:"J. K. Rowling",
        book:"Harry Potter",
        award:"Kids’ Choice Award for Favorite Book",
        image:"/images/rj.jpg"
    },
];
function router(nav) {
    authorsRouter.route("/")
        .get((req, res) => {
            res.render("authors.ejs",
                {
                    nav: nav,
                    title: 'Authors',
                    authors:authors
                })
        });

        authorsRouter.route("/add")
        .get((req, res) => {
            res.render("addAuthorForm.ejs",
            {
               nav,
               title:"Add Author",
            });
        })
        authorsRouter.route("/save")
        .post((req, res) => {
            console.log(req.body);
            authors.push(req.body);
            res.render("authors.ejs",{
                nav,
                title: "Authors",
                authors
            });
        });
        authorsRouter.route('/:id')
        .get((req, res) => {
            var id = req.params.id; // or  req.param[id]
            res.render("author.ejs",
                {
                    nav: nav,
                    title: 'Author',
                    author: authors[id]
                });
        });
    
     
        return authorsRouter;
}

/*app.get("/authors", (req, res) => {
    res.render("authors.ejs",
    {

    });
});*/
module.exports = router;