import React, { Component, Suspense } from 'react';
import axios from 'axios';
import moviesImg from '../services/moviesImg';
import Loader from '../components/Loader/Loader';
import styles from './Cast.module.scss';

const baseURL_cast = `https://api.themoviedb.org/3/movie/`;

const API_KEY = process.env.REACT_APP_API_KEY_YT;

class Cast extends Component {
  static propTypes = {};

  state = {
    credits: [],
    error: null,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const id = this.props.match.params.movieId;
    try {
      const responseCast = await axios.get(
        `${baseURL_cast}${id}/credits?api_key=${API_KEY}`,
      );

      this.setState(credits => ({ credits: responseCast.data.cast }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
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
