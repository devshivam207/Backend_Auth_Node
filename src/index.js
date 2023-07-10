const express = require('express');
const app = express();

const User = require('./models/user');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://devshivam207:Aa12345@userdetails.iazull6.mongodb.net/community_broadcasting").then(
    function(){
        console.log("DB connect hogya bro");

        app.get('/',async function(req,res){
            const response = {message : "Api Works Try It Out"};
            res.json(response);
        });

        //Get Data (Read)        
        app.get('/users/list',async function(req,res){
            var user = await User.find();
            res.json(user);
        });
        //Add User (Create)
        app.post('/user/add',async function(req,res){
            const newuser = new User({
                userid: req.body.userid,
                email: req.body.email,
                password: req.body.password,
            });
            await newuser.save();
            const response = {message : "New User Added!"};
            res.json(response);
        });
        //Delete User (Delete)
        app.post('/user/delete',async function(req,res){
            await User.deleteOne({userid : req.body.userid});
            const response = {message : "User Is Deleted"};
            res.json(response);
        });


    }
).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

const PORT = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server Chal gya bero : AT : "+PORT);
});