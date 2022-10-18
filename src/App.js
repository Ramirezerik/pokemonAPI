import React, { useEffect, useState } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [ pokemon, setPokemon ]= useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  //loading app to let users know that by default our app is loading
  const [loading, setLoading] = useState(true)

  useEffect (()=> {
    //anytime we make a request, we want to set our loading to true
    //while data is loading, loading state will be true.
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res =>  {
        //once our request is successful & we have all our data, 
        //our loading app is set to false as we are no longer loading data.
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })
      //anytime a function is called multiple times, this function
      //will cancel our prev request & only handle our current reqeust
      return () => cancel()
  }, [currentPageUrl])
  
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
      //this will render all of our pokemon
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
      goToNextPage={ nextPageUrl ? goToNextPage: null}
      goToPrevPage={ prevPageUrl ? goToPrevPage: null}
      />
    </>
  );
}

export default App;

//we will have 3 components to this project. 
//1st, list of pokemon
//2nd and 3rd, hitting the previous and next pagination buttons(sequence of pokemon assigned per page ) 20
