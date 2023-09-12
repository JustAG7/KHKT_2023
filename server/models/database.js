const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        console.log('Connecting to database...');
        await mongoose.connect('mongodb://127.0.0.1:27017/khkt_2023', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database successfully');
    } catch (error){
        console.log(error);
    }
}

module.exports = connectDB;