const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const route = express.Router();
const userSchema = require('../migration/user_migration');
const User = mongoose.model('user', userSchema);
// Signup
route.post('/',async (req,res)=>{
    try {
        const name = req.body.name;
        const email= req.body.email;
        const status = req.body.status;
        const password = req.body.password;
        const hashPasswod = await bcrypt.hash(password,10);
        // create new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashPasswod,
            status: status
        });
        res.status(200).send("User create successfully");
    } catch (error) {
        res.status(500).send('Error inserting data: ' + error.message);
    }
});
//Login
route.post('/login',async(req,res)=>{
    try {
     //check user exist with email or not
     const user = await User.find({email:req.body.email});
     if(user.length > 0){
        const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);
            if(isValidPassword){
            //generate token
            const token = jwt.sign({
                email:user[0].email,
                userId:user[0]._id,
            },'ahhshs',{
                expiresIn:'1h',
            });
            res.status(201).send({
                        token:token,
                        message:"Login succssfull"
            });    
        }else{
         res.status(405).send('Invalid email or password');
        }
     }else{
      res.status(405).send('Invalid email or password');

     }
    //  if(user){
    //    
    //     
    //     }else{
    //         res.send('Email or password not match');
    //     }
    //  }else{
    //     res.status(404).send({
    //         error:"Email or password not match"
    //     }); 
    //  }   
    }catch (error) {
        res.status(504).send(error);
    }
});

module.exports = route;
