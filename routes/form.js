/////ROUTES/////

const express = require('express');
const {
    createForm,
    getForms,
    existsInDB,
    lookUpForm,
    editForm,
    deleteForm
} = require('../controller/form')

const {
    nullOrUndefined,
} = require('../utils/checks');

const {handleResponse} = require('../libs/response_handler')

const {
    InternalServerError,
    NoContentError,
    BadRequestError, NotFoundError
} = require('../errors/model');

const {httpStatusCodes} = require("../errors/constants");

const router = express.Router();

function idNotFoundError(id){
    return new NotFoundError(`Requested form with ID ${id} has not been found`);
}
function requiredFieldError(val){
    return new BadRequestError(`Field "${val}" is required.`)
}


router.get('/list', async (req, res) => {
    try {
        const result = await getForms();
        if (result == null) throw new NoContentError('No forms in database');
        return handleResponse(res,req,null,result,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});


router.get('/:id', async (req, res) => {
    try{
        if(!await existsInDB(req.params.id)) throw idNotFoundError(req.params.id);
        const form = await lookUpForm(req.params.id);
        if(form==null) throw InternalServerError('Form could not be retrieved');
        return handleResponse(res,req,null,form,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});


router.post('/', async (req, res) => {
    try{
        if (!req.body.name) throw requiredFieldError('name');
        let description = null;
        if(!nullOrUndefined(req.body.description)) description = req.body.description;
        const newForm = await createForm(req.body.name, description);
        if(newForm==null) throw new InternalServerError('Form could not be created');
        return handleResponse(res,req,null,newForm,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});


router.put('/:id', async (req, res) => {
    try{
        if(nullOrUndefined(req.body.name)&&nullOrUndefined(req.body.description)) throw new BadRequestError('All form parameters are empty.')

        const editedForm = await editForm(req.params.id,req.body.name,req.body.description);
        if(editedForm==null) throw idNotFoundError((req.params.id));
        return handleResponse(res,req,null,editedForm,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});



router.delete('/:id', async (req, res) => {
    try{

        const deletedForm = await deleteForm(req.params.id);
        if(deletedForm==null) throw idNotFoundError(req.params.id);
        return handleResponse(res,req,null,deletedForm,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});


module.exports = router;