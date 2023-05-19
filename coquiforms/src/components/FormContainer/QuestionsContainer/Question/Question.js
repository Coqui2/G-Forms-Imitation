import './Question.css'
import TextField from '@mui/material/TextField';


const Question = (props) => {
    return (
        <li>
            <TextField id="standard-basic" label="Question" variant="standard" className='questionInput'/>
            <TextField id="standard-basic" label="Answer" variant="standard" className='answerInput'/>
        </li>
    )
}


export default Question