import React, { Component } from 'react';
import moviesApi from '../services/moviesApi';
import Loader from '../components/Loader/Loader';
import styles from './Cast.module.scss';

class Cast extends Component {

  static propTypes = {};

  state = {
    credits: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    moviesApi
      .fetchMoviesWithCredits(this.props.match.params.movieId)
      .then(credits => this.setState({ credits }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { credits, error, loading } = this.state;

    return (
      <section>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        <ul className={styles["list"]}>
          {credits.map(credit => (
            <li key={credit.id}>
              <img
                src={moviesApi.imgpath + credit.profile_path}
                alt={credit.name}
              />
              <p>{credit.name}</p>
              <p>Character: {credit.character}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Cast;
