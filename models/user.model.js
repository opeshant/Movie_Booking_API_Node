const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_ROLE , USER_STATUS} = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true,
        unique : true
    },
    email :{
        type : String , 
        required : true,
        unique : true,
        match :[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill a valid email'],
        lowercase : true,
        trim : true
    },
    password:{
        type : String,
        required : true,
        minLength : 6
    },
    userRole:{
        type : String,
        required : true,
        enum : {

         values :[USER_ROLE.customer , USER_ROLE.admin , USER_ROLE.client] ,
         messgae : "invalid user role given "

        },

        default : USER_ROLE.customer,

    },
    userStatus :{
        type : String , 
        required : true,
        enum:{
            values : [USER_STATUS.approved , USER_STATUS.pending , USER_STATUS.rejcted],
            messgae : "invalid status for user given"
        },
        default : USER_STATUS.approved
    }
} , {timestamps : true});



//hooks or triggers
userSchema.pre('save', async function() {

    if (!this.isModified('password')) {
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

});


// input password given by user in sign in request 
// this is going to be instance method for user , to compare a password
// return boolean denoting a password is same or not 

userSchema.methods.isValidPassword = async function(plainPassword) {
    const compare = await bcrypt.compare(plainPassword , this.password);
    return compare;
}



const User = mongoose.model('User' , userSchema);
module.exports = User;
