const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
        // E-posta ile kullanıcıyı arıyoruz
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Bu e-posta adresi zaten kayıtlı." }); // 409 Conflict daha uygun
        }

        // Şifrenin uzunluğunu kontrol ediyoruz
        if (password.length < 6) {
            return res.status(400).json({ message: "Şifre en az 6 karakter uzunluğunda olmalıdır." }); // 400 Bad Request
        }

        // E-posta adresinin geçerliliğini kontrol ediyoruz
        if (!isEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-posta adresi." }); // 400 Bad Request
        }

        // Şifreyi hashliyoruz
        const passwordHash = await bcrypt.hash(password, 12);

        // Yeni kullanıcıyı oluşturuyoruz
        const newUser = await User.create({ ...req.body, password: passwordHash });

        // Hassas bilgileri (hashed password) sil
        const userWithoutPassword = { ...newUser._doc }; // Mongoose dökümantasyonunu düz bir JS objesine çeviriyoruz
        delete userWithoutPassword.password; // password bilgisini siliyoruz

        // JWT token oluşturuyoruz
        const token = await jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, "SECRET_KEY", { expiresIn: "1h" });

        // Token'ı cookie olarak ayarlıyoruz ve password'suz kullanıcı objesi ile cevap veriyoruz
        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            user: userWithoutPassword // Şifresiz kullanıcı objesini gönderiyoruz
        });
    } catch (err) {
        // Hata durumunda 500 Internal Server Error döndürüyoruz
        return res.status(500).json({ message: 'Sunucu hatası', error: err.message });
    }
};


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