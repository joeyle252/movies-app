import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar.js'
import MoviesList from './components/MoviesList.js'
import ReactModal from 'react-modal';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import Pagination from "react-js-pagination";


import YouTube from '@u-wave/react-youtube';


// function PageButton(props) {
//   return (
//     <button onClick={props.onClick}>Next Page</button>
//   )
// }

function App() {
  let [modal,setModal]=useState(false);
  let [movies, setMovies] = useState([]);
  
  let [filterText, setFilterText] = useState('');
  let [page, setPage] = useState(1);
  let [rate,setRate] = useState(0);
  let moviesList =[];
  

//NHAN ADDS HERE:
  let [trailer,setTrailer]= useState('');

  let openModal=async(movieId)=>{
    let url=`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    let data=await fetch(url);
    let resultData=await data.json();
    console.log("AEFWEFWEFWEF:", resultData) 
    setTrailer(resultData.results[0].key)
    setModal(true);
  }
//NHAN ADDS HERE:


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

//NHAN FIXES APIKEY HERE:
  let apiKey = process.env.REACT_APP_APIKEY;

  let nowPlayingMovie = async () => {
    // console.log('pagenumber',pageNumber)

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
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
  let handlePageChange = async (pageNumber) =>{
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    console.log('nowPlaying - url: ', url);
    let data = await fetch(url);
    let dataResults = await data.json();
    console.log("nowplaying movie", dataResults);
    setMovies(dataResults.results)
    
  }
  
  useEffect (nowPlayingMovie, []);

  if(movies == [null]){
    return (
      <div>
        LOADING LOADING LOADING
      </div>
    )
  }
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
        <MoviesList openModal={openModal} moviesList={ movies.filter((movie) => movie.title.toLowerCase().includes(filterText))} />
        {/* //NHAN ADDS HERE:        */}
        <ReactModal
        isOpen={modal}
        // style={{ overlay: {display:"flex",justifyContent:"center",alignItems:"center"}, content: {position:"relative",width:"70%",height:"70%"} }}
        onRequestClose={()=>setModal(false)}>
        <YouTube video={trailer} autoplay className="video"/>

        </ReactModal>
        {/* <div className="pageButton">  
        
        < PageButton onClick={() => {
          // setPage (page + 1);
          const newPage = page + 1;
          setPage(newPage);
          nowPlayingMovie(newPage)
        }}/>
        <h3>Page: {page}</h3>
        </div> */}
      </div>
      <div className="pagination">
      <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
        </div>
    </div>

  );
}

export default App;
