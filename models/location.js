const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    cityName : {
        type: String, 
        require: true
    }
});

module.exports = mongoose.model("location", locationSchema);