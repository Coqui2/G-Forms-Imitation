import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button'
import FormContainer from './components/FormContainer/FormContainer'



function App() {
  const Form ={
    
  }
  return (
    <div className="App">
      <div className='header'>
        <h1 className='title'>Form Name</h1>
        <div className='optionContainer'>
          <Button className='header-btn' onClick={()=>{console.log("Preguntas")}} text='Preguntas'> </Button>
          <Button className='header-btn' onClick={()=>{console.log("Respuestas")}} text='Respuestas'> </Button>
        </div>
      </div>
      <FormContainer></FormContainer>
    </div>
  );
}

export default App;
