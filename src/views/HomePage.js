import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../services/moviesApi';
import Loader from '../components/Loader/Loader';
import styles from './Cast.module.scss';

class HomePage extends Component {

  static propTypes = {};

  state = {
    homeMovies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    moviesApi
      .fetchMoviesWithHome()
      .then(homeMovies => this.setState({ homeMovies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { homeMovies, error, loading } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {homeMovies.length > 0 && (
          <ul className={styles["list"]}>
            {homeMovies.map(homeMovie => (
              <li key={homeMovie.id}>
                <Link
                  to={{
                    pathname: `/movies/${homeMovie.id}`,
                    state: this.props.location,
                  }}
                  className={styles["addInfo-list"]}
                >
                  {homeMovie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default HomePage;
