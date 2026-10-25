
const errorresponseBody = {
    err :{},
    data :{},
    message:"something went wrong",
    sucesss:false,
    code : 404
}

const successResponseBody={
     err :{},
    data :{},
    message:"successfully proceessed the request",
    sucesss:true,
}

module.exports ={
    successResponseBody,
    errorresponseBody
}

