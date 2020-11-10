import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import moviesApi from '../services/moviesApi';
import Cast from './Cast';
import Reviews from './Reviews';
import Loader from '../components/Loader/Loader';
import styles from './MovieDetailsPage.module.scss';

class MovieDetailsPage extends Component {

  static propTypes = {};

  state = {
    homeMovies: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    moviesApi
      .fetchMoviesWithDetails(this.props.match.params.movieId)
      .then(homeMovies => this.setState({ homeMovies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
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
        <button className={styles["backBtn"]} type="button" onClick={this.handleOnBack}>
          {' '}
          go back
        </button>

        {this.state.homeMovies && (
          <>
            <section className={styles["about"]}>
              <img
              className={styles["img"]}
                src={
                  moviesApi.posterimgpath + this.state.homeMovies.poster_path
                }
                alt={this.state.homeMovies.title}
              />

              <section>
                <h1>
                  {this.state.homeMovies.title} (
                  {this.state.homeMovies.release_date.substring(0, 4)})
                </h1>
                <p>User score: {this.state.homeMovies.vote_average}</p>
                <p className={styles["bold"]}>Overwiew</p>
                <p > {this.state.homeMovies.overview}</p>
                <p className={styles["bold"]}>Genres</p>
                <ul className={styles["list-genres"]}>
                  {this.state.homeMovies.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </section>
            </section>

            <section className={styles["addInfoSection"]}>
            <p className={styles["bold"]}>Additional information</p>
              <ul className={styles["list-genres"]}>
                <li>
                  <Link
                    to={{
                      pathname: `/movies/${this.state.homeMovies.id}/credits`,
                      state: this.props.location.state,
                    }}
                    className={styles["addInfo"]}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `/movies/${this.state.homeMovies.id}/reviews`,
                      state: this.props.location.state,
                    }}
                    className={styles["addInfo"]}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </section>

            <Switch>
              <Route path="/movies/:movieId/credits" component={Cast} />
              <Route path="/movies/:movieId/reviews" component={Reviews} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default MovieDetailsPage;
