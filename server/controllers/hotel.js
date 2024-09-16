const Hotel = require('../models/Hotel');

const createHotel = async(res, req, next) => {  // HOTEL OLUŞTURUYORUZ (CREATE)
    try{
     const hotel = await Hotel.create(req.body);
     res.status(201).json(hotel);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const upDateHotel = async(res, req, next) => {  // HOTEL UPDATE YAPISI İÇİN  (findByIdAndUpdate)
    const {id} = req.params
    try{
     const hotel = await Hotel.findByIdAndUpdate(id, {$set : req.body}, {new : true});
     res.status(200).json(hotel);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const deleteHotel = async(res, req, next) => {  // HOTEL Delete YAPISI İÇİN  (findByIdAndDelete)
    const {id} = req.params
    try{
     await Hotel.findByIdAndDelete(id);
     res.status(200).json({message: "deletion successful"});
    }catch(error){
      res.status(404).json({message: error})
    }
}

const getSingleHotel = async(res, req, next) => {  // HOTEL Details YAPISI İÇİN  (findById)
    const {id} = req.params
    try{
     const hotel =  await Hotel.findById(id);
     res.status(200).json(hotel);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const getAllHotels = async(res, req, next) => {  // HOTEL tüm Details YAPISI İÇİN  (findById)
    const {min, max, ...others} = req.query;
    try{
     const hotel =  await Hotel.find({
       ...others,
       cheapestPrice : {$gt : min | 1, $lt: max | 999}
     });
     res.status(200).json(hotel);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const typeByCount = async(res, req, next) => {  // HOTEL tüm Details YAPISI İÇİN  (findById)
    try{
     const hotel = await Hotel.countDocuments({type: "hotel"});
     const villa = await Hotel.countDocuments({type: "villa"});
     res.status(200).json([
        {type : "hotel", count : hotel},
        {type : "villa", count : villa},
     ]);
    }catch(error){
      res.status(404).json({message: error})
    }
}

const typeByCity = async(res, req, next) => {  // HOTEL tüm Details YAPISI İÇİN  (findById)
    try{
     const cities = req.query.cities.split(',');

     const hotel = await Promise.all(
        cities.map((city) =>{
        return Hotel.countDocuments({city: city})
        })
    );
     res.status(200).json(hotel);
    }catch(error){
      res.status(404).json({message: error})
    }
}

module.exports = {
    createHotel,
    upDateHotel,
    deleteHotel,
    getSingleHotel,
    getAllHotels,
    typeByCount,
    typeByCity
}