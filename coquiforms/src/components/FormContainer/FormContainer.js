import './FormContainer.css'
import TitleContainer from './TitleContainer/TitleContainer'
import QuestionsContainer from './QuestionsContainer/QuestionsContainer'
import NewQuestionButton from '../NewQuestionButton/NewQuestionButton'
import { useState } from 'react'
import Question from './QuestionsContainer/Question/Question'


const FormContainer = (props) =>{

    const [questions,addOption]=useState([]);
    function clickHandler(){
        addOption([...questions,<Question></Question>]);
    }

    return  (<div className='bodyContainer'>
                <TitleContainer></TitleContainer>
                <QuestionsContainer questions={questions}></QuestionsContainer>
                <div>
                    <button className='prueba' onClick={()=>clickHandler()}>ADD QUESTION</button>
                </div>
            </div>
            )
}

//<NewQuestionButton className='newQuestion-btn' questions={questions} text='Add Question'> </NewQuestionButton>
export default FormContainer