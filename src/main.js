import config from './config/config.js'
import express from "express";
import session from 'express-session';
import router from './routes/index.routes.js';
import { __dirname } from "./path.js";
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.js';

const app = express();

const {port, mongoURL, sessionSecret, signedCookie} = config;

// Conexion con MongoDB Atlas
mongoose.connect( mongoURL )
.then(async () => {
  console.log("DB conectada")
  // await cartModel.create({})
})
.catch(err => console.log("Error en conexion a MongoDB Atlas: ", err))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(signedCookie));
app.use(session({
    //store: new fileStorage ({path:'./sessions', ttl:10000,retries:1}),
    store: MongoStore.create({
      mongoUrl: mongoURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 90
    }),
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session());

//Routes
app.use('/', router)

//Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});