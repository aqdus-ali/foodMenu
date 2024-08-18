import { useContext } from 'react'
import './styles.css'
import { themeContext } from '../../App'
const Themebutton =()=>
{
    const {theme,setTheme} =useContext(themeContext)
    console.log("theme :",theme, "set :",setTheme)
    return(
            
        <button style={theme ? {backgroundColor:"#12343b"}:{}} onClick={()=>setTheme(!theme)} className="theme-button"> Change Current Theme</button>
    )
    
}
export default Themebutton