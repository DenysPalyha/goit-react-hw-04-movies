import React, { Component } from 'react';
import Loader from '../components/Loader/Loader';
import moviesApi from '../services/moviesApi';
import styles from './Cast.module.scss';

class Reviews extends Component {
  static propTypes = {};

  state = {
    reviews: [],
    error: null,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const id = this.props.match.params.movieId;
    moviesApi
      .getMoviesReviews({ id })
      .then(reviews => this.setState({ reviews: reviews }));

    this.setState({ loading: false });
  }

  render() {
    const { reviews, error, loading } = this.state;
    return (
      <section>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {reviews.length > 0 ? (
          <ul className={styles.list}>
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
