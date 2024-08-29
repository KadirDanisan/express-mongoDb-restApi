const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const createRoom = async(res, req, next) => {  // Room OLUŞTURUYORUZ (CREATE)
    const hotelId = req.params.hotelId; 
    try{
    const room = await Room.create(req.body);
    
    await Hotel.findByIdAndUpdate(hotelId, { $push : {rooms : room._id}})

     res.status(201).json(room);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const updateRoom = async(res, req, next) => {  // Room OLUŞTURUYORUZ (CREATE)
    try{
    const room =  await Room.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true } );
     res.status(200).json(room);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const deleteRoom = async(res, req, next) => {
    const hotelId = req.params.hotelId; 
    try{

     await Room.findByIdAndDelete(req.params.id);

     await Hotel.findByIdAndUpdate(hotelId, { $pull : {rooms : req.params.id}});

     res.status(200).json({message : "deletion successful"});
    }catch(error){
      res.status(404).json({message: error})
    }
}

const getDetailRoom = async(res, req, next) => {
    try{

    const room =  await Room.findById(req.params.id);

     res.status(200).json(room);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const getAllRoom = async(res, req, next) => {
    try{
     const room = await Room.find();
     res.status(200).json(room);
    }catch(error){
      res.status(404).json({message: error})
    }
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getDetailRoom,
    getAllRoom
}