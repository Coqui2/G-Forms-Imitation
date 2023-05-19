import './Button.css'
import { useState } from 'react'

const Button = (props) =>{
    const [clickCount,setClickCount]=useState(0);
    function clickHandler(){
        props.onClick();
        setClickCount(clickCount+1);
    }
    function doubleClickChecker(){
        props.onClick();
        setTimeout(()=> setClickCount(0),400);
        setClickCount(clickCount+1);
        if(clickCount===1) props.onDoubleClick();
    }
    return <button className={props.className} onClick={() => clickHandler()} onDoubleClick={() => doubleClickChecker()}>{props.text} - Me hicieron click {clickCount}</button>
  }

export default Button