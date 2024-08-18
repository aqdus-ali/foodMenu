import { useContext, useEffect, useState } from 'react';
import './styles.css'
import { themeContext } from '../../App';

//useState
//useReducers -> use to manage complex state
const Search =(props) =>{
    console.log(props);
    const {theme}=useContext(themeContext)
    const {getDataFromSearchComponet,apicallsucessfull,setApiCallSucessfull}=props;


   //  console.log('getDataFromSearchComponet :' ,getDataFromSearchComponet,'apicallsucessfull :',apicallsucessfull,'setApiCallSucessfull :',setApiCallSucessfull)
 const [inputValue, setInputValue]=useState('');
 const handleInputValue= (event)=>
 {
    const {value}=event.target;//destructure the value
    //update the state
    setInputValue(value);
 }
 const handleSubmitValue =(event)=>
 {
    event.preventDefault();
    getDataFromSearchComponet(inputValue);
 }
 console.log(inputValue);
      useEffect(()=>
      {
         //set input value to empty
         setInputValue('');
         //set Api Value to False
         setApiCallSucessfull(false);
      },[apicallsucessfull,setApiCallSucessfull])

    return (
        <form onSubmit={handleSubmitValue} className="Search">
             <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Food Search"  id="search"/>
             <button type="submit" style={theme ? {backgroundcolor:"#12343b"}:{}}>Search</button>
        </form>
       
    );
}
export default Search;