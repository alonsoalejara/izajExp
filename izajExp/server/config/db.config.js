import { connect } from 'mongoose';
import { DB_URL } from './env.config.js';

const options = {};

//  setupDB
//* @name setupDB
//* @description Connects to the database
//* @returns {Promise<void>}
//* @throws {Error}
//* 

export async function setupDB() {
    try {
        await connect(DB_URL, options);
        console.log('=> Conectado a la base de datos.');
    } catch (err) {
        console.log('/configDB.js -> setupDB', err);
    }
}