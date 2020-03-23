
import React from 'react';
import LazyLoad from 'react-lazyload';

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';



function MoviesList(props) {

    let htmlMovie = props.moviesList.map((movie,index) => {
        return (
            <div className="col-md-3" key = {index}>
                <Card className="cardBody">
                <LazyLoad>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                    </LazyLoad>
                    <Card.Body className="cardText">
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text > {movie.overview}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            Popularity: {movie.popularity}
                        </ListGroupItem>
                        <ListGroupItem>
                            Vote Average: ❤️{movie.vote_average}
                        </ListGroupItem>
                        <ListGroupItem>
                            Release date: {movie.release_date}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#" onClick={()=>props.openModal(movie.id)}>View Trailer</Card.Link>
                        <Card.Link href="#">Full Movie</Card.Link>
                    </Card.Body>
                </Card>

            </div>
        )
    })
    return (
        <div className="row">
            {htmlMovie}
        </div>
    );
}

export default MoviesList;