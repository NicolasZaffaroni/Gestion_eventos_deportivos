const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    name: {type:String, require:true},
    lastname:{type:String, require:true},
    email:{type:String, require:true, unique:true, unique: true,},
    password:{type: String, require:true,required: true},
    role:{type:String, enum:[ 'athlete','couch']}
},
    {
    collection:'athletes',
    timeseries:true
    })



const Athletes = mongoose.model("athletes",athleteSchema)
module.exports = Athletes