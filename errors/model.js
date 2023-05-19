
const {httpStatusCodes} = require('../errors/constants');
class ResponseError extends Error{
    constructor(message,status) {
        super();
        this.message = message;
        this.status = status;
    }
}
class BadRequestError extends ResponseError {
    constructor(message) {
        super(message,httpStatusCodes.clientError.badRequest);
    }
}

class NotFoundError extends ResponseError{
    constructor(message) {
        super(message,httpStatusCodes.clientError.notFound);
    }
}

class InternalServerError extends ResponseError{
    constructor(message) {
        super(message,httpStatusCodes.serverError.internalServerError);
    }
}

class NoContentError extends ResponseError{
    constructor(message) {
        super(message,httpStatusCodes.success.noContent);
    }
}



module.exports = {
    BadRequestError,
    ResponseError,
    NotFoundError,
    InternalServerError,
    NoContentError,
};