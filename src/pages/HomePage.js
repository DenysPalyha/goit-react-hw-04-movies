import React, { Component, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import styles from './HomePage.module.scss';

const baseURL_home = 'https://api.themoviedb.org/3/trending/movie/day?';

const API_KEY = process.env.REACT_APP_API_KEY_YT;

class HomePage extends Component {
  static propTypes = {};

  state = {
    homeMovies: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.get(`${baseURL_home}api_key=${API_KEY}`);

      this.setState(homeMovies => ({ homeMovies: response.data.results }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
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
