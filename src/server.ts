#! /usr/bin/env node
import mongoose from 'mongoose';

async function database() {
    await mongoose.connect('mongodb://127.0.0.1:6000/rank-openning', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}

async function run() {
    console.log('Test rank of anime opennings');
    console.log();
    await database();
}

run();
