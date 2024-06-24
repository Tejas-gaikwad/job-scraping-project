
const express = require('express');
const bodyParser = require('body-parser');
const scrap_jobs_Routes = require('./routes/scrap_jobs_routes');
const session = require('express-session');
const app = express();


    app.use(bodyParser.json());
    
    app.use(session({
        secret: 'job-scrap-app', // Replace with a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true in production if using HTTPS
    }));

    app.get('/', (req, res) => {
        res.send('Job Tracker API');
    });

    app.use('/api', scrap_jobs_Routes);


module.exports = app;
