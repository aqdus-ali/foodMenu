import { useContext } from 'react';
import './styles.css'
import { themeContext } from '../../App';


const FavoriteItem =(props) =>{
    const {theme}=useContext(themeContext)
    const{id,image,title,removeFromFavorites}=props;
        console.log(props,'Recipe Item Props');
    return (
        
        <div key={id}className="favorite-item">
            <div>
                <img src={image} alt="Recipe Image"/>
            </div>
            <p style={theme ? {color:"#12343b"}:{}}>{title}</p>
            <button style={theme ? {backgroundColor:"#12343b"}:{}} type="button" onClick={removeFromFavorites}>Remove From Favorite</button>
        </div>
       
    );
}
export default FavoriteItem;