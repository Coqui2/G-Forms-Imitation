
const {httpStatusCodes} = require('../errors/constants');
const {nullOrUndefined} = require('../utils/checks');
const {ResponseError} = require('../errors/model');
function handleResponse(res,req,error,body=null,status=httpStatusCodes.serverError.internalServerError){
    if(nullOrUndefined(error)) return res.status(status).send(body);
    if(error instanceof ResponseError) return res.status(error.status).send(error.message);
    return res.status(status).send(error);
}

module.exports = {handleResponse};