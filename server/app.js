const express = require("express");
const cors = require ("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routers/authRouters');
const hotelRouters = require('./routers/hotelRouters');
const roomRouter = require('./routers/roomRouter');
const userRouters = require('./routers/userRouters');

const app = express();
app.use(cors);
app.use(bodyParser.json({limit : "30mb", extanded: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extanded: true}))
app.use(cookieParser());
app.use('/', authRoutes);
app.use('/', hotelRouters);
app.use('/', roomRouter);
app.use('/', userRouters);

db();

app.listen( process.env.PORT || 3000, ()=> {
    console.log("Server başarıyla kurulmuştur");
});