import React, { Component } from 'react';
import moviesApi from '../services/moviesApi';
import Loader from '../components/Loader/Loader';
import styles from './Cast.module.scss';

class Reviews extends Component {

  static propTypes = {};

  state = {
    reviews: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    moviesApi
      .fetchMoviesWithReviews(this.props.match.params.movieId)
      .then(reviews => this.setState({ reviews }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { reviews, error, loading } = this.state;
    return (
      <section>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {reviews.length > 0 ? (
          <ul className={styles["list"]}>
            {reviews.map(review => (
              <li key={review.id}>
                <p>Author:{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p> We don't have any reviews for this movie.</p>
        )}
      </section>
    );
  }
}

export default Reviews;
