
const {Question} = require('../models/question');
const {clients} = require('../database/connection');
const {nullOrUndefined} = require ('../utils/checks');


async function createQuestion(title,form_id, answer) {
    const query = {
        text:'insert into questions (title,form_id,answer) values ($1,$2,$3) returning id, title, form_id, answer',
        values : [title,form_id,answer]
    };

    const result = await clients.client.query(query);

    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Question(dbObject.id, dbObject.title, dbObject.form_id, dbObject.answer);
}

async function existsInDB(id){
    const result = await clients.client.query(`select exists(select 1 from questions where id=${id})`)
    return result.rows[0].exists;
}


async function getQuestions() {
    const result = await clients.client.query('select id,title,form_id,answer from questions order by id asc');
    if(result.rowCount === 0 )return null;
    const dbObjects = result.rows;
    const resultArray = [];
    for (let {id,title,form_id,answer} of dbObjects){
        resultArray.push(new Question(id,title,form_id,answer));
    }
    return resultArray;
}

async function lookUpQuestion(id){
    const result = await clients.client.query(`select id,title,form_id,answer from questions where id=${id}`);
    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Question(dbObject.id,dbObject.title,dbObject.form_id,dbObject.answer);
}
async function lookUpQuestionsFromFormId(form_id){
    const result = await clients.client.query(`select id,title,form_id,answer from questions where form_id=${form_id}`);
    if(result.rowCount === 0) return null;
    const dbObjects = result.rows;
    const resultArray = [];
    for (let {id,title,form_id,answer} of dbObjects){
        resultArray.push(new Question(id,title,form_id,answer));
    }
    return resultArray;
}

async function editQuestion(id, newTitle, answer){
    let query = `UPDATE questions SET `;
    let updateFields= [];
    if(!nullOrUndefined(newTitle)) updateFields.push({prop : 'title', val : `'${newTitle}'`});
    if(!nullOrUndefined(answer)) updateFields.push(({prop : 'answer', val : `'${answer}'`}));
    query += updateFields.map(({prop,val}) => `${prop}=${val}`).join(', ');

    query += `WHERE id= ${id} RETURNING id, title, form_id, answer`;
    const result = await  clients.client.query(query);

    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Question(dbObject.id,dbObject.title,dbObject.form_id,dbObject.answer);
}

async function deleteQuestion(id){
    const result = await clients.client.query(`delete from questions where id=${id} returning id`);
    if(result.rowCount === 0) return null;
    return result.rows[0];
}

module.exports = {
    createQuestion,
    getQuestions,
    lookUpQuestionsFromFormId,
    lookUpQuestion,
    editQuestion,
    deleteQuestion,
    existsInDB
}