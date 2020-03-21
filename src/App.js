import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar.js'
import MoviesList from './components/MoviesList.js'

let apiKey = process.env.REACT_APP_APIKEY;

function App() {
  let [movies, setMovies] = useState([]);
  let [filterText, setFilterText] = useState('');

  // let genres = async () => {
  //   let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  //   let data = await fetch(url);
  //   let dataResults = await data.json();
  //   console.log("genres", dataResults);
  //   // setMovies(dataResults.results)
  // }

  let sortByPopularity = () => {
    const sortedMovies = [...movies]; // spread operator
    // console.log('sort',movies.sort((a,b)=> b.popularity -a.popularity))
    sortedMovies.sort((a,b)=> b.popularity -a.popularity);
    console.log('sortedMovies after', sortedMovies);
    setMovies(sortedMovies);
  }
  

  let nowPlayingMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url);
    let dataResults = await data.json();
    console.log("data", dataResults);
    setMovies(dataResults.results)
  }
  useEffect(nowPlayingMovie, []);
  return (
    <div>
    <div className="navBar">

      <NavBar 
        setFilterText = {setFilterText} 
        sortByPopularity={sortByPopularity}
       />
      </div>
      <div className="moviesContainer">
      < MoviesList moviesList={movies.filter((movie) => movie.title.toLowerCase().includes(filterText))} />
      
    </div>
    </div>

  );
}

export default App;
