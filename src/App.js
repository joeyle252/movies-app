import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar.js'
import MoviesList from './components/MoviesList.js'

let apiKey = process.env.REACT_APP_APIKEY;

function App() {
  let [movies,setMovies] = useState ([]);
  let [filterText,setFilterText] = useState ('');
  
  let nowPlayingMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url);
    let dataResults = await data.json();
    console.log("data",dataResults);
    setMovies(dataResults.results)
  }
  useEffect (nowPlayingMovie,[]);
  return (
    <div>
    <NavBar setFilterText={setFilterText} />
    < MoviesList moviesList = {movies.filter((movie)=>movie.title.includes(filterText))} />
  <div> test: {filterText} </div>
    </div>
    
  );
}

export default App;
