const express = require("express");
const fs = require("fs");
const signupRouter = express.Router();

var users = [
    /*{
        fullName: 'Admin',
        email: 'admin@admin.com',
        password: '12345',
        confirmPassword: '12345',
        contactNumber: '9696969696',
        gender: 'male',
        country: 'India',
        address: 'Great'
    }*/
]
fs.readFile("./users.json", "utf-8", (err, data) => {
    if(err) throw err;
    else users = JSON.parse(data);
})
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
            nav[nav.length - 1].title = "LogIn";
            res.render("login.ejs",
                {
                    nav,
                    title: "LogIn",
                    loginMsg:""
                })
        });

        signupRouter.route("/login/validate")
        .post((req, res) =>{
            var success = validateUser(req.body)
            if(success){
                nav[nav.length - 1].title = "LogOut";
                res.render("index.ejs",
                {
                    nav,
                    title: "Library"
                })
            }
            else{
                res.render("login.ejs",
                {
                    nav,
                    title: "LogIn",
                    loginMsg: "Missmatch Username or Password!"
                })
            }
        });
    signupRouter.route("/register")
        .post((req, res) => {
            console.log(req.body);
            /*var exist = verifyUserExist(req.body)
            if(!exist){
                return false;
            }*/
            users.push(req.body);
            console.log("-------------", users, "-----------")
            res.render("index.ejs",
                {
                    nav,
                    title: "Libarary"
                });
                saveUsers();
        });
    return signupRouter;

}
function validateUser(data){ 
    var success = false;   
    users.forEach(element => {
        if(data.username.toString.toLowerCase == element.fullName.toString.toLowerCase && data.password == element.password){     
            console.log("login success");  
            success = true;
            return;           
        }        
    });     
    if(success){
        console.log("---   login success"); 
        return true;
    } 
    else{
        console.log("username or password missmatch"); 
         
    }      
    return false;
}
function verifyUserExist(data){
    var exist = false;
    users.forEach(element =>{        
        if(data.fullName.toString.toLowerCase == element.fullName.toString.toLowerCase){
            exist = true;
            return ;
        }
    })
     return exist;
}

function saveUsers(){
    fs.writeFile("./users.json", JSON.stringify(users), "utf-8", (err) => {
        if(err) throw err;
        console.log("User data saved");
    })
}
module.exports = router;