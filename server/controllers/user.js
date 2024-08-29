const User = require('../models/User');

const updateUser = async (res, req, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true});
    res.status(200).json(user);
  }catch(err){
    res.status(404).json({message : err});
  }
}

const deleteUser = async (res, req, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message: "silme işlemi başarılı "});
    }catch(err){
      res.status(404).json({message : err});
    }
}

const detailUser = async (res, req, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    }catch(err){
      res.status(404).json({message : err});
    }
}

const getAllUser = async (res, req, next) => {
    try {
      const user = await User.find()
      res.status(200).json(user);
    }catch(err){
      res.status(404).json({message : err});
    }
}

module.exports = { 
    getAllUser, 
    deleteUser, 
    detailUser, 
    updateUser
};