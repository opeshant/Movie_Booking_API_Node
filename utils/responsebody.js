// this object to be used as template for building erros reponses

const errorResponseBody = {
    err :{},
    data :{},
    message:"something went wrong",
    sucesss:false,
    code : 404
}

// this object to be used as a template for building success response body 
const successResponseBody={
     err :{},
    data :{},
    message:"successfully proceessed the request",
    sucesss:true,
}

module.exports ={
    successResponseBody,
    errorResponseBody
}

