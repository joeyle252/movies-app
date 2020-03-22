
import React from 'react';
import LazyLoad from 'react-lazyload';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function AnimationMovies(props) {

    let htmlAnimation = props.animationMovies.filter((animationMovie)=>{
    if (animationMovie.genre_ids.includes(16)) {
        return true
    }
})
        return (
            <div className="col-md-3">
                <Card className="cardBody">
                <LazyLoad>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${props.animationMovies.poster_path}`} />
                    </LazyLoad>
                    <Card.Body className="cardText">
                        <Card.Title>{props.filterAnimation.title}</Card.Title>
                        <Card.Text > {props.filterAnimation.overview}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            Popularity: {props.filterAnimation.popularity}
                        </ListGroupItem>
                        <ListGroupItem>
                            Vote Average: {props.filterAnimation.vote_average}
                        </ListGroupItem>
                        <ListGroupItem>
                            Release date: {props.filterAnimation.release_date}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">View Trailer</Card.Link>
                        <Card.Link href="#">Full Movie</Card.Link>
                    </Card.Body>
                </Card>

            </div>
        )
    return (
        <div className="row">
            {htmlAnimation}
        </div>
    );
}

export default AnimationMovies;