#! /usr/bin/env node
import mongoose from 'mongoose';
import mainMenu from './mainMenu';

async function database() {
    await mongoose.connect('mongodb://127.0.0.1:6000/rank-openning');
}

async function run() {
    console.log('Test rank of anime openings');
    console.log();
    await database();
    await mainMenu();
}

run();
