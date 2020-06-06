const express  = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

// user model
const User = require('../models/Users');

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
            // validation passed
            User.findOne({email: email})
            .then(user => {
                if(user){
                    errors.push({msg : 'User  Already Exits'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });

                }else{
                    const newUser = new User({
                        name , 
                        email , 
                        password
                    });
                    // hash password
                    bcrypt.genSalt(18,(err, salt)=>
                    bcrypt.hash(newUser.password,salt,(err, hash)=>{
                        if(err){
                            res.send(err);
                        }else{
                            newUser.password = hash ;
                        }
                        // save the user
                        newUser.save()
                        .then(user =>{
                            // send success msg to login page
                            req.flash('success_msg','You Are now registered & can login')
                            res.redirect('/users/login');
                           
                            
                        })
                        .catch(err => console.log(err));
                        
                    }))
                   // console.log(newUser);
                    
                }
            })

        }
});




module.exports = router;