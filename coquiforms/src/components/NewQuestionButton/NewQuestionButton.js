import './NewQuestionButton.css'
import { useState } from 'react'
import Button from '@mui/material/Button';
import Question from '../FormContainer/QuestionsContainer/Question/Question'

const NewQuestionButton = (props) =>{
    const [questions,addOption]=useState([]);
    function clickHandler(){
        addOption([...questions,<Question></Question>]);
    }

    return <Button variant='contained' className={props.className} onClick={() => clickHandler()}> {props.text}</Button>
  }

export default NewQuestionButton