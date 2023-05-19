///// CONTROLLER /////


const {Form} = require('../models/form');
const {nullOrUndefined} = require("../utils/checks");
const {clients} = require('../database/connection');



async function createForm(name,description) {
    const query = {
        text: 'insert into forms (name, description) values ($1,$2)    returning id, name, description',
        values : [name,description]
    };

    const result = await clients.client.query(query);

    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Form(dbObject.id,dbObject.name,dbObject.description);
}

async function getForms() {
    const result = await clients.client.query(`select id,name,description from forms order by id asc`);
    const dbObjects = result.rows;
    const resultArray=[];
    for (let {id,name,description} of dbObjects){
        resultArray.push(new Form(id,name,description));
    }
    return resultArray;
}

async function deleteForm(id){
    const result = await clients.client.query(`delete from forms where id=${id}
    returning id`);
    if(result.rowCount === 0) return null;
    return result.rows[0];

}

async function existsInDB(id){
    const result = await clients.client.query(`select exists(select 1 from forms where id=${id})`);
    return result.rows[0].exists;
}

const lookUpForm = async (id) => {
    const result = await clients.client.query(`select id,name,description from forms where id=${id}`);
    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Form(dbObject.id,dbObject.name,dbObject.description);
}

async function editForm(id,name, description){
    let query = `UPDATE forms SET `;
    let updateFields = [];
    if(!nullOrUndefined(name))  updateFields.push({prop: 'name', val: `'${name}'`})
    if(!nullOrUndefined(description))   updateFields.push({prop: 'description', val: `'${description}'`})
    query += updateFields.map(({prop, val}) => `${prop}=${val}`).join(', ');

    query += `WHERE id=${id} RETURNING id, name, description`;
    const result = await clients.client.query(query);

    if(result.rowCount === 0) return null;
    const dbObject = result.rows[0];
    return new Form(dbObject.id,dbObject.name,dbObject.description);
}


module.exports = {
    lookUpForm,
    createForm,
    getForms,
    editForm,
    deleteForm,
    existsInDB
}
