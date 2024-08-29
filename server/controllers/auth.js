const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async(req, res, next) => {
    const {username, password, email} = req.body
    try{
        const user = await User.findOne(email);
        if(user){
            return res.status(404).json({message : "Bu isimde bir kullanıcı bulunmakta..."});
        }
        if(password.length < 6)
           res.status(404).json({message : "Bu parola yeterince uzun degil..."});
           const passwordHash = await bcrypt.hash(password, 12);
        
        if(!isEmail(email))
            res.status(404).json({message : "Bu email dogru degil tekrar deneyiniz..."});
        
        const newUser = await User.create({...req.body, password: passwordHash});
        const token = await jwt.sign({id: newUser._id, idAdmin: newUser.isAdmin}, "SECRET_KEY", {expiresIn: "1h"});
    
        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            newUser
        })
    }catch(err){
        return res.status(404).json(err);
    }
}

const login = async(req, res, next) => {
    const {password, email} = req.body
    try{
        const user = await User.findOne(email);
        if(!user){
            return res.status(404).json({message : "Bu isimde bir kullanıcı bulunmamakta..."});
        }

           const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(404).json({message : "Paralolar eşleşmemekte"});
        }
        

        const token = await jwt.sign({id: user._id, idAdmin: user.isAdmin}, "SECRET_KEY", {expiresIn: "1h"});
    
        res.cookie("token", token, { httpOnly: true }).status(200).json({
            token,
            user
        })
    }catch(err){
        return res.status(404).json(err);
    }
}

function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailAdress.match(regex))
        return true;
    else
        return false;
}

module.exports = {
    register,
    login
}