import React, { Component, Suspense } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import moviesImg from '../services/moviesImg';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import styles from './MovieDitailsPage.module.scss';
import infoRouters from '../Router/infoRouters';

const baseURL_details = `https://api.themoviedb.org/3/movie/`;

const API_KEY = process.env.REACT_APP_API_KEY_YT;

class MovieDetailsPage extends Component {
  static propTypes = {};

  state = {
    homeMovies: null,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const id = this.props.match.params.movieId;

    try {
      const responseDetails = await axios.get(
        `${baseURL_details}${id}?api_key=${API_KEY}`,
      );

      this.setState(homeMovies => ({ homeMovies: responseDetails.data }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleOnBack = () => {
    if (this.props.location.state) {
      this.props.history.push(this.props.location.state);
    }
  };

  render() {
    const { error, loading } = this.state;

    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        <button
          className={styles.backBtn}
          type="button"
          onClick={this.handleOnBack}
        >
          {' '}
          go back
        </button>

        {this.state.homeMovies && (
          <>
            <section className={styles.about}>
              <img
                className={styles.img}
                src={
                  moviesImg.posterimgpath + this.state.homeMovies.poster_path
                }
                alt={this.state.homeMovies.title}
              />

              <section>
                <h1>
                  {this.state.homeMovies.title} (
                  {this.state.homeMovies.release_date.substring(0, 4)})
                </h1>
                <p>User score: {this.state.homeMovies.vote_average}</p>
                <p className={styles.bold}>Overwiew</p>
                <p> {this.state.homeMovies.overview}</p>
                <p className={styles.bold}>Genres</p>
                <ul className={styles.listGenres}>
                  {this.state.homeMovies.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </section>
            </section>

            <section className={styles.addInfoSection}>
              <p className={styles.bold}>Additional information</p>

              <ul className={styles.listGenres}>
                <Suspense fallback={<Loader />}>
                  {infoRouters.map(router => (
                    <li className={styles.listItem} key={router.path}>
                      <NavLink
                        to={{
                          pathname: `${this.props.match.url}${router.path}`,
                          state: this.props.location.state,
                        }}
                        exact={router.exact}
                        className={styles.NavLinkStyle}
                      >
                        {router.name}
                      </NavLink>
                    </li>
                  ))}
                </Suspense>
              </ul>

              <Suspense fallback={<Loader />}>
                <Switch>
                  {infoRouters.map(router => (
                    <Route
                      key={router.path}
                      path={`${this.props.match.path}${router.path}`}
                      exact={router.exact}
                      component={router.component}
                    />
                  ))}
                </Switch>
              </Suspense>
            </section>
          </>
        )}
      </div>
    );
  }
}

export default MovieDetailsPage;
