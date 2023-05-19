const { Client } = require('pg')

let clients = {};
async function innitConnection (){
    clients.client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'coquiforms',
    })
    await clients.client.connect();

}

module.exports = {
    clients,
    innitConnection
}