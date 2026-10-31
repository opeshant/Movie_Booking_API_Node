const USER_STATUS = {
    approved : "APPROVED",
    pending : "PENDING",
    rejcted : "REJECTED"
};

const USER_ROLE ={
    customer : "CUSTOMER",
    admin : "ADMIN",
    client : "CLIENT"
}

const STATUS_CODES = {
    OK : 200,
    INTERNAL_SERVER_ERROR : 500,
    CREATED : 201,
    UNAUTHORIZED : 401 , 
    NOT_FOUND : 404,
    BAD_REQUEST : 400,
}

module.exports ={
    USER_STATUS,
    USER_ROLE,
    STATUS_CODES,
}
