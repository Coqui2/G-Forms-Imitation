

const httpStatusCodes = {
    clientError: {
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        conflict: 409,
        gone: 410,
        unprocessableEntity: 422,
        locked: 423,
        failedDependency: 424
    },
    success: {
        ok: 200,
        created: 201,
        noContent: 204,
        resetContent: 205
    },
    redirection: {
        notModified: 304
    },
    serverError: {
        internalServerError: 500,
        serviceUnavailable: 503
    }
};

module.exports = {httpStatusCodes};