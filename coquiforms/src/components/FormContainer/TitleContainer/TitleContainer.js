import './TitleContainer.css'
import TextField from '@mui/material/TextField';

//<TextField id="standard-basic" label="Standard" variant="standard" />



const TitleContainer = (props) => {

    
    return (
    <div className='titleContainerMain'>
        <TextField id="standard-basic" label="Title" variant="standard" className='titleContainerInput titleTitleInput'/>
        <TextField id="standard-basic" label="Description" variant="standard" className='titleContainerInput titleDescriptionInput'/>
        
    </div>
    )
}

export default TitleContainer