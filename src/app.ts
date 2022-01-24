#! /usr/bin/env node
import mongoose from 'mongoose';
import mainMenu from './mainMenu';

const user = 'admin';
const password = 'password';

async function database() {
    try {
        await mongoose.connect(`mongodb://${user}:${password}@localhost:6000/rank-opening`, {
            authSource: 'admin'
        });
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
}

async function run() {
    console.log('Test rank of anime openings');
    console.log();
    await database();
    await mainMenu();
}

run();
