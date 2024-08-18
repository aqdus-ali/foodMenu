
import { createContext, useState } from 'react';
import './App.css';
import ThemeButton from './components/theme-button/index.jsx';
import Homepage from './pages/homepage';

  //create Context
 
  export const themeContext=createContext(null);
function App() {

  const[theme,setTheme]=useState(false);

  return (
    
    <themeContext.Provider value={{theme,setTheme}}>
      <div className="App" style={theme ? {backgroundColor:"#feb300"}:{}}>
       <ThemeButton/>
      <h1>Food Menu</h1>
     
      <Homepage/>
    </div>
    </themeContext.Provider>
    
  );
}

export default App;
