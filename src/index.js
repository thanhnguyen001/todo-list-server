require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoDb = require('./config');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 1368;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors());
mongoDb.connect();
routes(app);

app.listen(PORT, () => console.log('Server is running on ', PORT))