const Theatre = require('../models/theatre.model');


// params data -> object containing deatils of the theatre to be vreated 
// returns -> object with the new theatre details 

const createTheatre = async(data) => {
    try{
    const response = await Theatre.create(data);
    return response;
    }
    catch(error){

        if(error.name == "ValidationError" ){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err : err , code : 422};
        }
        console.log(error);
        throw error;
    }
}


// params id -> unique id using which we can identufy the theatre to be deleted
// return -> returns the deleted theatre object 

const deleteTheatre = async (id) => {
    try{
        const response = await Theatre.findByIdAndDelete(id);
       if(!response){
        return {
            err :"No record of a theatre found for the given theatre",
            code : 404
        }
       }

        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


// 
const getTheatre = async (id)=>{
    //params id - id the unique id based on which we will fecth a theatre
    try{

    const response = await Theatre.findById(id);
    if(!response){
        // no element or no record found for the given id
        return {
            err : "no theatre found for the given id ",
            code : 404
        }
    }
    return response;

    }
    catch(error){
        console.log(error);
        throw error;
    }
    
}



// params data -> data to be used to filter out theatres based on city / pincode
// returns -> object with the filters contents of the theatres

const getAllTheatres = async () =>{
    try{
        const response = await Theatre.find({});
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


const updateTheatre = async(id , data)=>{
    try{
        const response = await Theatre.findByIdAndUpdate(id , data , {new : true , runValidators : true});
        if(!response){
            return {
                err : "no theatre found for the corresponding id",
                code : 404
            }
        }
        return response;
    }
    catch(error){
        if(error.name == 'ValidationError'){
            let err ={};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {err : err , code : 422};
        }
        throw error;
    }
}


module.exports= {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre
}