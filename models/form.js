///// MODEL /////

const uniqid = require('uniqid');

class Form {
    name;
    description;
    id;
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    
}

module.exports = {
    Form
}
