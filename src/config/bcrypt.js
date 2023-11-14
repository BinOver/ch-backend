// import 'dotenv/config';
import config from './config.js';
import bcrypt from 'bcrypt';

const { salt } = config;

export const createHash = ( password ) => bcrypt.hashSync( password, bcrypt.genSaltSync(parseInt(salt)) );

export const validatePassword = ( passwordSend, passwordBDD ) => bcrypt.compareSync( passwordSend, passwordBDD );

