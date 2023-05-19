
const express = require('express')
const app = express()
app.use(express.json());

const formsRouter = require('./routes/form');
const questionsRouter = require('./routes/question');

const {innitConnection} = require('./database/connection');

innitConnection().then( () =>{
    app.use('/form', formsRouter);
    app.use('/question', questionsRouter);

    console.log(`listening on port 3000`);
    app.listen(3000)
} )


