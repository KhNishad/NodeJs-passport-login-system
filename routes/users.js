const express  = require('express');
const router  = express.Router();

// login page 
router.get("/login", (req,res) =>{
    res.render("login");
});

// registration  page 
router.get("/register", (req, res) => {
    res.render("register");
});

// register
router.post('/register', (req,res)=>{
    const { name , email , password , password2} = req.body;

    let errors = [];
    // check fields
    if(!name || !email || !password || !password2){
        errors.push({msg : " Please fill up all fields"});
    }
    // check password match
    if(password !== password2){
        errors.push({msg: 'Password do not matched'});
    }
    // check pass length
    if(password.length <5){
        errors.push({msg : " Password 5 char"});
    }

    if(errors.length >0){
        res.render('register',{
            errors,
            name ,
            email,
            password,
            password2
        });
        }
        else{
            res.send("pass");
        }
});




module.exports = router;