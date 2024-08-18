import Search from "../../components/search";
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import './styles.css'
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorites-item";
import { themeContext } from "../../App";
import { useMemo } from 'react';
const Homepage =() =>{

    const [loadingState, setLoadingState]=useState(false);
    const [recipes, setRecipes]=useState([]);


    const {theme}=useContext(themeContext)


     //Api is sucessful
     const [apicallsucessfull,setApiCallSucessfull]=useState(false)
    const reducer =(state,action)=>{
        switch (action.type) {
            case "filteredFavorites":
                
             
                return {
                    ...state,
                    filteredValue:action.value
                };
        }
    }
    const initialState ={
        filteredValue :''
    }
    //FavoriteState //

    const [favorites,setFavoriteState]=useState([])


    //RemoveFrom Favorites

    const removeFromFavorites =(getCurrentId)=>
    {
            let cpyFavorites=[...favorites]
            cpyFavorites=cpyFavorites.filter(item=>item.id !==getCurrentId)
            setFavoriteState(cpyFavorites)
            localStorage.setItem('favorites',JSON.stringify(cpyFavorites))
    }

       
    //Reducer state
    const [filteredState,dispatch]=useReducer(reducer,initialState);
    const getDataFromSearchComponet =(getData)=>
    {
      
            setLoadingState(true);
            // console.log(getData,'get your Data');
            async function getRecipes()
            {
                const apiResponse=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a6c7391eeef9445696451da984f862ea&query=${getData}`);
                const result= await apiResponse.json();
               
                const {results}=result;
                if(results && results.length>0)
                {
                    setLoadingState(false);
                    setRecipes(results);
                    setApiCallSucessfull(true);
                }
                // console.log(result);
            }
            getRecipes();
    };




    // console.log(loadingState,recipes ,'loadingState,recipes');
    const AddToFavorite=useCallback((getCurrentItem)=>{
        // console.log(getCurrentItem);
            //Copy favorite Array
            let cpyFavorites=[...favorites]
            const index=cpyFavorites.findIndex(item=>item.id===getCurrentItem.id);
            console.log('index is: ',index);
            if(index===-1){
                cpyFavorites.push(getCurrentItem);
                setFavoriteState(cpyFavorites);
                //Save this value in Loacal Stroage
                localStorage.setItem('favorites',JSON.stringify(cpyFavorites));
                window.scrollTo({top:'0',behavior:'smoth'})
            }
            else
            {
                alert("Item is already Present")
            }
            // console.log(favorites);
       
    },[favorites])
   
    //Call Back

    const renderRecipe=useCallback(()=>
    (
            ( recipes && recipes.length >0?
                recipes.map((item)=>(
                    <RecipeItem AddToFavorite ={()=>AddToFavorite(item)}
                    
        id={item.id} image={item.image} title={item.title}
                />
                ))
                :null
            )
    ),[recipes,AddToFavorite]
    )



    // const AddToFavorite =(getCurrentItem) =>
    // {
    //         // console.log(getCurrentItem);
    //         //Copy favorite Array
    //         let cpyFavorites=[...favorites]
    //         const index=cpyFavorites.findIndex(item=>item.id===getCurrentItem.id);
    //         // console.log(index);
    //         if(index===-1){
    //             cpyFavorites.push(getCurrentItem);
    //             setFavoriteState(cpyFavorites);
    //             //Save this value in Loacal Stroage
    //             localStorage.setItem('favorites',JSON.stringify(cpyFavorites));
    //         }
    //         else
    //         {
    //             alert("Item is already Present")
    //         }
    //         // console.log(favorites);
    // };
    useEffect(()=>{
                // console.log("Run At Once");
                const etDataFromLocal=JSON.parse(localStorage.getItem('favorites'))||[];
                setFavoriteState(etDataFromLocal) ;
    },[])
    console.log(favorites);

   //Filter the Favorite Recipe
     const filterFavItem=favorites && favorites.length > 0 ?  favorites.filter(item=>
        item.title.toLowerCase().includes(filteredState.filteredValue)):[];
        // console.log('filterFavItem',filterFavItem);
    return (
        <div className="home">
        <Search getDataFromSearchComponet ={getDataFromSearchComponet}
        apicallsucessfull={apicallsucessfull}
        setApiCallSucessfull={setApiCallSucessfull}
        />
           
            


         {/* //Show favorites Items */}
        
        <div className="favorites-wrapper">
            <h1 style={theme ? {color:"#12343b"}:{}} className="favorites-titles">Favorites</h1>
            <div className="search-favorites">
                <input 
                onChange={
                    (event)=>dispatch(
                        {type:"filteredFavorites", value: event.target.value}
                        )}
                value={filteredState.filteredValue}
                 name="searchfavorites" placeholder="Search Recipe From Faviorute" />
            </div>
           
                <div className="favorites">
                    
                    {
                        !filterFavItem.length &&<div className="loading" style={{display:'flex' , justifyContent:'center' ,width:'100%'}}>No Favorites are found</div>
                    }
                    {
                        
                        filterFavItem && filterFavItem.length > 0 ? filterFavItem.map((item)=>
                        (
                        <FavoriteItem 
                        removeFromFavorites ={()=>removeFromFavorites(item.id)}
                        id={item.id} title={item.title}
                        image={item.image}/>) )
                    :null}
                    
                </div>
        </div>
            {/* //Show loading state */}
            {
                loadingState && <div className="loading">Loading Recipes ! Please Wait</div>
            }

            {/* //Map All Recipes */}
                <div className="items">
                    
                        {/* // renderRecipe() */}
                        {/* { useMemo(
                            () =>
                            !loadingState && recipes && recipes.length >0 
                            ? recipes.map((item) => (<RecipeItem AddToFavorite={ ()=> AddToFavorite(item)} id={item.id} image={item.image} title={item.title}/>
                            
                            )):null,[loadingState,recipes,AddToFavorite]
                           )
                        } */}
                    
            {/* { recipes && recipes.length > 0 
            ? recipes.map((item) => <RecipeItem AddToFavorite={ ()=> AddToFavorite(item)} id={item.id} image={item.image} title={item.title}/>
                ):null
                } */}
                {
                    renderRecipe()
                }
                {
                    !loadingState && !recipes.length &&<div className="loading">No Recipes are found</div>
                }
            </div>
        </div>
        
    );
}
export default Homepage;