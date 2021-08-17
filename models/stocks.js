const mongoose = require('mongoose')

const  stocksSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Stocks', stocksSchema)