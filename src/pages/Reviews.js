import React, { Component } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import styles from './Cast.module.scss';

const baseURL_reviews = `https://api.themoviedb.org/3/movie/`;

const API_KEY = process.env.REACT_APP_API_KEY_YT;

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

    try {
      const responseRewiews = await axios.get(
        `${baseURL_reviews}${id}/reviews?api_key=${API_KEY}`,
      );
      this.setState(reviews => ({ reviews: responseRewiews.data.results }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
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
