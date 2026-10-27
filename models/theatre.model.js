const mongoose = require('mongoose');

// defines the schema of theater resource to be stored in the db


const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength : 5 
    },

    description : String,

    city:{
        type:String,
        required:true,
    },
    pincode :{
        type : Number,
        required : true
    },
    address: String,
    movies :{
        type:[mongoose.Schema.Types.ObjectId],
        // if wanted to add just one movie
        // mongoose.Schema.Types.ObjectsId without the sqaure brackets and it will work properly
        
        ref : 'Movie'
    }
}, {timestamps : true});
 

const theatre = mongoose.model('theatre' , theatreSchema);

module.exports = theatre