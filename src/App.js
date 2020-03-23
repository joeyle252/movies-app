import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar.js'
import MoviesList from './components/MoviesList.js'
import ReactModal from 'react-modal';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'




function PageButton(props) {
  return (
    <button onClick={props.onClick}>Next Page</button>
  )
}

function App() {
  
  let [movies, setMovies] = useState([]);
  let [modal,setModal] = useState (false);
  let [filterText, setFilterText] = useState('');
  let [page, setPage] = useState(1);
  let [rate,setRate] = useState(0);
  let moviesList =[];


  let sortByPopularity = () => {
    const sortedMovies = [...movies]; // spread operator
    sortedMovies.sort((a, b) => b.popularity - a.popularity);
    console.log('sortedMovies after', sortedMovies);
    setMovies(sortedMovies);
  }
  let sortByVoteAverage = () => {
    const sortedMovies = [...movies]; // spread operator
    sortedMovies.sort((a,b)=> b.vote_average - a.vote_average);
    console.log('sortedmovies after sortby vote_average', sortedMovies)
    setMovies(sortedMovies)
  }

  

  let nowPlayingMovie = async (pageValue) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${pageValue}`
    console.log('nowPlaying - url: ', url);
    let data = await fetch(url);
    let dataResults = await data.json();
    console.log("nowplaying movie", dataResults);
    moviesList = dataResults.results;
    console.log('moviesList',moviesList)
    setMovies(dataResults.results)
  }

  let searchByRate = (value)=>{
    setRate(value);
    let filteredData = moviesList.filter((movie)=>movie.vote_average >= value)
    console.log('filterdata',filteredData)
    setMovies(filteredData)
  }
  
  useEffect(() => nowPlayingMovie(page), []);

  return (
    <div>
      <div className="navBar">

        <NavBar
          setFilterText={setFilterText}
          sortByPopularity={sortByPopularity}
          sortByVoteAverage = {sortByVoteAverage}
        />
      </div>
      <div className="inputRange"> 
      <p> Vote Average </p>
      <InputRange 
        maxValue ={10}
        minValue ={0}
        value = {rate}
        onChange={value => searchByRate(value)} />
      </div>
      <div className="moviesContainer">
        < MoviesList moviesList={movies.filter((movie) => movie.title.toLowerCase().includes(filterText))} />
        < ReactModal
        isOpen = {modal}
        style = {{overlay:{display:"flex",justifyContent:"center",position:"relative",aligItems:"center"},contents:{width: "70%",height:"70%"}}}
        onRequestClose = {()=>setModal(false)}
        > 
        </ReactModal>
        <div className="pageButton">
        < PageButton onClick={() => {
          // setPage (page + 1);
          const newPage = page -1;
          setPage(newPage);
          nowPlayingMovie(newPage)
        }}/>
        < PageButton onClick={() => {
          // setPage (page + 1);
          const newPage = page + 1;
          setPage(newPage);
          nowPlayingMovie(newPage)
        }}/>
        <h3>Page: {page}</h3>
        </div>
      </div>

    </div>

  );
}

export default App;
