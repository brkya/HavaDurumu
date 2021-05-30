const mongoose = require('mongoose');

const raporSchema = mongoose.Schema({
    userId : {
        type: String, 
        require: true
    },
    username : {
        type: String, 
        require: true
    },
    date: {
        type: String,
        require: true
    },
    lokasyonName: {
        type: String,
        require: true
    },
    ipAdress: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("rapor", raporSchema);