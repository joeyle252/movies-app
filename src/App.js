import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar.js'
import MoviesList from './components/MoviesList.js'
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube';


function PageButton(props) {
  return (
    <button onClick={props.onClick}>Next Page</button>
  )
}

function App() {
  let [modal,setModal]=useState(false);
  let [movies, setMovies] = useState([]);
  let [filterText, setFilterText] = useState('');
  let [page, setPage] = useState(1);

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
  let nowPlayingMovie = async (pageValue) => {
    console.log("here",pageValue);

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageValue}`
    console.log('nowPlaying - url: ', url);
    let data = await fetch(url);
    let dataResults = await data.json();
    console.log("nowplaying movie", dataResults);
    setMovies(dataResults.results)
  }
  
  useEffect(() => nowPlayingMovie(page), []);

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
      <div className="moviesContainer">
        <MoviesList openModal={openModal} moviesList={ movies.filter((movie) => movie.title.toLowerCase().includes(filterText))} />
        {/* //NHAN ADDS HERE:        */}
        <ReactModal
        isOpen={modal}
        // style={{ overlay: {display:"flex",justifyContent:"center",alignItems:"center"}, content: {position:"relative",width:"70%",height:"70%"} }}
        onRequestClose={()=>setModal(false)}>
        <YouTube video={trailer} autoplay className="video"/>

        </ReactModal>
        <div className="pageButton">  
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
