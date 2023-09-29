import 'dotenv/config';
import local from 'passport-local';
import passport from 'passport';
import GithubStrategy from 'passport-github2';
import { createHash, validatePassword } from './bcrypt.js';
import userModel from '../models/users.models.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req,username,password,done) => {
            const {firstName, lastName, email, age} = req.body;
            try {
                const user = await userModel.findOne({ email :email })
                if (user) {
                    return done(null, false);
                }
                const passwordHash = createHash(password);
                const userCreated = await userModel.create({
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    age : age,
                    password : passwordHash
                })
                console.log (userCreated);
                return done(null, userCreated);
            }catch (err) {
                return done(err);
            }
        }
    ));

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async(accessToken, refreshToken, profile, done) => {

        try{
            const user = await userModel.findOne({email: profile._json.email});
            if(user){
                done(null,false);
            }else {
                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18,
                    password: 'password'
                })
                done(null,userCreated);
            }
        }catch (err){
            done(err);
        }
        
    }
    ))  

    passport.use('login', new LocalStrategy({usernameField:'email'},async(username,password,done) =>{
        try {
            const user = await userModel.findOne({ email: username });
            if(!user){
                return done(null,false);
            }

            if(validatePassword(password,user.password)){
                return done(null, user);
            }

            return done(null, false);
        }catch (err) {
            return done(err);
        }
    }))

    passport.serializeUser((user,done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done) => {
        const user = await userModel.findById(id);
        done(null, user)
    });
}

export default initializePassport;