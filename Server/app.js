const dotenv = require('dotenv');
dotenv.config({ path: './Config/Config.env' });
const express = require('express');

const app = express();
const database = require('./Database/Database');
const cors = require('cors');

const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes Import
const Authentication = require('./Routes/Authentication.routes');
const UserData = require('./Routes/UserData.routes');

// Routes Initialization
app.use('/api/v1', Authentication)
app.use('/api/v1', UserData)

database().then(
    app.listen(PORT, () => {
        console.log("Jay Shree Ram");
    })
)