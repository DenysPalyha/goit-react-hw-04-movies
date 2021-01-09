import React, { Component, Suspense } from 'react';
import moviesImg from '../util/moviesImg';
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

    const id = this.props.match.params.movieId;
    moviesApi
      .getMoviesCast({ id })
      .then(credits => this.setState({ credits: credits }));

    this.setState({ loading: false });
  }

  render() {
    const { credits, error, loading } = this.state;

    return (
      <Suspense fallback={<Loader />}>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {credits.length > 0 ? (
          <ul className={styles.list}>
            {credits.map(credit => (
              <li key={credit.id}>
                <img
                  src={moviesImg.imgpath + credit.profile_path}
                  alt={credit.name}
                />
                <p>{credit.name}</p>
                <p>Character: {credit.character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p> We don't have any cast for this movie.</p>
        )}
      </Suspense>
    );
  }
}

export default Cast;
