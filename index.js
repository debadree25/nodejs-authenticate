const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log('Database connected');
        }
        else {
            console.log('Database connection failed');
            console.log(err);
        }
    });

app.use(express.json());

app.use('/api/user', auth);

app.listen(3000, () => console.log("Server is running"));
