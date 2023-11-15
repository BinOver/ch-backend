import dotenv from 'dotenv';

const enviroment = "DEVELOPMENT";

dotenv.config({
    path: enviroment === "PRODUCTION" ? './.env.production' : './.env.development'
})

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    sessionSecret: process.env.SESSION_SECRET,
    signedCookie: process.env.SIGNED_COOKIE,
    salt: process.env.SALT,
    appID: process.env.APP_ID,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    jwtSecret: process.env.JWT_SECRET,
    debugLevel: process.env.DEBUGLEVEL
}