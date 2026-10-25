
const Movie = require('../models/movie.model');
// controller function to create a new movie it returns 
// // movie created 
// in req expects as object 


const createMovie = async (req , res) =>{

      try { 
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success : true,
            error :{},
            data : movie , 
            message : "successfully created a new movie"

        })
        
      }
      catch (err){
        console.log(err);
        return res.status(500).json({
            success:true , 
            data:{},
            message:"something is wrong"
        })
      }
}

module.exports = {
    createMovie
}
