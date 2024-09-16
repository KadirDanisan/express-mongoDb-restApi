const express = require("express");
const cors = require ("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();
const db = require('./config/db');
const authRouters = require('./routers/authRouters');
const hotelRouters = require('./routers/hotelRouters');
const roomRouters = require('./routers/roomRouters');
const userRouters = require('./routers/userRouters');

db();
const app = express();
app.use(cors);
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extneded: true}))
app.use(cookieParser());
app.use('/', authRouters);
app.use('/', hotelRouters);
app.use('/', roomRouters);
app.use('/', userRouters);

app.listen( process.env.PORT || 3000, ()=> {
    console.log("Server başarıyla kurulmuştur");
});