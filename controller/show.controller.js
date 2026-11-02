const showService = require('../services/show.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES : STATUS} = require('../utils/constants');



const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);
        successResponseBody.message ="successfully created the show";
        successResponseBody.data = response;
        res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.OK).json(errorResponseBody);
    }
}

module.exports = {
    create
}