/////ROUTES/////

const express = require('express');
const {
    existsInDB : formExistsInDB
} = require('../controller/form');

const {
    InternalServerError,
    BadRequestError,
    NoContentError,
    NotFoundError
} = require('../errors/model');

const {httpStatusCodes} = require("../errors/constants");

const {
    lookUpQuestionsFromFormId,
    getQuestions,
    createQuestion,
    lookUpQuestion,
    editQuestion,
    deleteQuestion,
    existsInDB
} = require('../controller/question');

const {
    nullOrUndefined
} = require("../utils/checks");

const {handleResponse} = require("../libs/response_handler");

function questionNotFoundError(id){
    return new NotFoundError(`Requested question with ID ${id} has not been found`);
}
function formNotFoundError(id){
    return new NotFoundError(`Requested form with ID ${id} has not been found`);
}
function requiredFieldError(val){
    return new BadRequestError(`Field "${val}" is required.`)
}


const router = express.Router();

router.get('/list', async (req, res) => {
    try{
        const result = await getQuestions();
        if(result==null) throw new NoContentError('No questions in database');
        return handleResponse(res,req,null,result,httpStatusCodes.success.ok);
    }catch (error){return handleResponse(res,req,error)}
});


router.get('/formList', async (req, res) => {
    try{
        if (!req.query.form_id) throw requiredFieldError('form_id');
        let form_id = req.query.form_id;
        if(!await formExistsInDB(form_id)) throw formNotFoundError(form_id);
        const questions = await lookUpQuestionsFromFormId(form_id);
        if(questions==null) throw new NoContentError(`No questions associated with form_id ${form_id}`);
        return handleResponse(res,req,null,questions,httpStatusCodes.success.ok);
    }catch (error) {return handleResponse(res,req,error)}
});


router.get('/:id',async(req,res)=>{
    try {

        if(!await existsInDB(req.params.id)) throw questionNotFoundError(req.params.id);
        const question = await lookUpQuestion(req.params.id);
        if (question==null) throw InternalServerError('Question could not be retrieved')
        return handleResponse(res,req,null,question,httpStatusCodes.success.ok);
    }catch (error) {return handleResponse(res,req,error)}
});


router.post('/', async(req, res) => {
    try {
        if (!req.body.form_id) throw requiredFieldError('form_id');
        if (!req.body.title) throw requiredFieldError('title');
        if (!await formExistsInDB(req.body.form_id)) throw formNotFoundError(req.body.form_id);
        let answer = null;
        if(!nullOrUndefined(req.body.answer)) answer = req.body.answer;
        const newQuestion = await createQuestion(req.body.title, req.body.form_id,answer);
        if(newQuestion==null) throw InternalServerError('Question could not be created.');
        return handleResponse(res,req,null,newQuestion);
    } catch (error) {return handleResponse(res,req,error)}
});


router.put('/:id',async (req, res) => {
    try {

        if(nullOrUndefined(req.body.title)&&nullOrUndefined(req.body.answer)) throw new BadRequestError('All question parameters are empty')

        const result = await editQuestion(req.params.id, req.body.title,req.body.answer);
        if(result==null) throw questionNotFoundError(req.params.id);
        return handleResponse(res,req,null,result,httpStatusCodes.success.ok);
    } catch (error) {return handleResponse(res,req,error)}
});


router.delete('/:id', async (req, res) => {
    try {

        const result = await deleteQuestion(req.params.id);
        if (result == null) throw questionNotFoundError(req.params.id);
        return handleResponse(res,req,null,result,httpStatusCodes.success.ok);
    } catch (error) {return handleResponse(res,req,error)}
});



module.exports = router;