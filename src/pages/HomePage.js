import React, { Component, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import styles from './HomePage.module.scss';
import moviesApi from '../services/moviesApi';

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
      .getHomeMoviesTrending()
      .then(homeMovies => this.setState({ homeMovies: homeMovies }));

    this.setState({ loading: false });
  }

  render() {
    const { homeMovies, error, loading } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {homeMovies.length > 0 && (
          <ul className={styles.list}>
            <Suspense fallback={<Loader />}>
              {homeMovies.map(homeMovie => (
                <li key={homeMovie.id}>
                  <NavLink
                    to={{
                      pathname: `/movies/${homeMovie.id}`,
                      state: this.props.location,
                    }}
                    className={styles.addInfoList}
                  >
                    {homeMovie.title}
                  </NavLink>
                </li>
              ))}
            </Suspense>
          </ul>
        )}
      </>
    );
  }
}

export default HomePage;
