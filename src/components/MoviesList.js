
import React from 'react';
import LazyLoad from 'react-lazyload';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';



function MoviesList(props) {
    let htmlMovie = props.moviesList.map((movie, index) => {
        return (
            <div className="col-md-3 cards-container" key={index}>
                <Card className="cardBody flipcart-container">
                    <div className="flipcart">
                        <div className="front">
                            <LazyLoad>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                            </LazyLoad>
                            <Card.Title>{movie.title} </Card.Title>
                            <Card.Title>
                                <span> {movie.vote_average}❤ </span>
                            </Card.Title>
                        </div>
                        <div className="back">
                            <Card.Body className="cardText">
                                <Card.Text > {movie.overview}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Vote Count: {movie.vote_count}</ListGroupItem>
                                <ListGroupItem>Release date: {movie.release_date} </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#" onClick={() => props.openModal(movie.id)}>View Trailer</Card.Link>
                                <Card.Link href="#">Full Movie</Card.Link>
                            </Card.Body>
                        </div>
                    </div>
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