
import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function MoviesList(props) {

    let htmlMovie = props.moviesList.map((movie,index) => {
        return (
            <div className="col-md-3" key = {index}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text> {movie.overview}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            Popularity: {movie.popularity}
                        </ListGroupItem>
                        <ListGroupItem>
                            Vote Average: {movie.vote_average}
                        </ListGroupItem>
                        <ListGroupItem>
                            Release date: {movie.release_date}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">View Trailer</Card.Link>
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