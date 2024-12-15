
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
{
    nombre: { type: String, require: true },
    descripcion:{type:String, require:true},
    fecha:{type:String,require:true },
    ubicacion:{type:String,require:true},
    sport:{type: String,require:true},
    organizador:{type:String,require:true},
    users:[{type : Schema.Types.ObjectId,ref:"athletes"}],

},

{
    collection: 'event',
    timestamps: true, 
}
);
const sportsEvent = mongoose.model('event', eventSchema);
module.exports = sportsEvent;


