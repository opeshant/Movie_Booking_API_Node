const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');



const MovieRoutes = require('./routes/movies.routes');
const TheatreRoutes = require('./routes/theatre.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.routes');

env.config();
const app = express();
// express app object 

// port number is 30000 

// every 10 different app has 10 different port numbers 
// ip is home and port number is room number or name of the reciver 
// ip adreess is whole computer (genrally)


// one basic route 

// configration body parser

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
mongoose.set('debug' , true);





MovieRoutes(app); // invoking movie routes
TheatreRoutes(app); // invoking theatre routes
authRoutes(app); // invoking auth routes 
userRoutes(app); // invoking user routes




//*************************************************/
// app.get('/home' , (req , res) =>{

//     // console.log("hetting /home");

//     return res.json({
//         success : true,
//         number : 108, 
//         message : "this is fetched home"
//     })


// })

//*************************************************/



app.listen (process.env.PORT ,async()=>{
    // this callback is executed once the succesfully start the severe on the given port 
    console.log(`server started on port ${process.env.PORT}`)
    try{
        
    await mongoose.connect(process.env.DB_URL)
    // connects to the mongo server
    console.log("successsfully connected to mongomm")
    }
    catch(err){
        console.log("not abel to connect mongo")
    }
    // console.log("successfully connected to mongoose")
} )


