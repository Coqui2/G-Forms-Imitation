import Question from './Question/Question'
import './QuestionsContainer.css'


const QuestionsContainer = (props) => {

    //const questions = [<Question></Question>,<Question></Question>,<Question></Question>];

    const questionsList = props.questions.map( question => <li>{question}</li>);

    return  (   
        <ul>{questionsList}</ul>
    )
}



export default QuestionsContainer;