
const mongoose = require('mongoose');
const urlDb = `mongodb+srv://megazord:1368ssc@cluster0.h0o6c.mongodb.net/test-interview?retryWrites=true&w=majority`;
const connect = async () => {
    try {
        mongoose.connect(
            urlDb,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = { connect };