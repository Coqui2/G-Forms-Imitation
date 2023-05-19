
class Question {
    title;
    answer;
    form_id;
    id;
    constructor(id,title,form_id,answer=null) {
        this.id = id;
        this.title = title;
        this.form_id = form_id;
        this.answer = answer;
    }
}

module.exports = {
    Question
}