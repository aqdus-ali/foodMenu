import { useContext } from 'react';
import './styles.css'
import { themeContext } from '../../App';


const RecipeItem =(props) =>{
    const {theme}=useContext(themeContext)
    const{id,image,title,AddToFavorite}=props;
        console.log(props,'Recipe Item Props');
    return (
        
        <div key={id}className="recipe-item">
            <div>
                <img src={image} alt="Recipe Image"/>
            </div>
            <p style={theme ? {color:"#12343b"}:{}}>{title}</p>
            <button type="button" style={theme ? {backgroundColor:"#12343b"}:{}} onClick={AddToFavorite}>Add To Favorite</button>
        </div>
       
    );
}
export default RecipeItem;