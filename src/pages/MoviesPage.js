import React, { Component } from 'react';
import parseQueryString from '../util/parseQueryString';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MoviesPageSearch from '../components/MoviesPageSearch/MoviesPageSearch';
import styles from './MoviesPage.module.scss';

const baseURL_search = `https://api.themoviedb.org/3/search/movie?`;
const API_KEY = process.env.REACT_APP_API_KEY_YT;

class MoviesPage extends Component {
  static propTypes = {};

  state = {
    queryMovies: [],
    loading: false,
    error: null,
    pageNumber: '1',
  };

  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');
    if (!query) {
      return;
    }
    this.setState({ loading: true });

    try {
      const responseSearch = await axios.get(
        `${baseURL_search}api_key=${API_KEY}&query=${query}&page=${this.state.pageNumber}`,
      );

      this.setState(queryMovies => ({
        queryMovies: responseSearch.data.results,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = parseQueryString(prevProps.location.search);
    const { query: nextQuery } = parseQueryString(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      this.moviesPageSearch(nextQuery);
    }
  }

  moviesPageSearch = async query => {
    try {
      const responseSearch = await axios.get(
        `${baseURL_search}api_key=${API_KEY}&query=${query}&page=${this.state.pageNumber}`,
      );

      this.setState(queryMovies => ({
        queryMovies: responseSearch.data.results,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  hendleChangeQuery = query => {
    this.props.history.push({
      // pathname: this.props.location.pathname,
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { queryMovies, error, loading } = this.state;
    const { match } = this.props;

    return (
      <>
        <MoviesPageSearch onSubmit={this.hendleChangeQuery} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {queryMovies.length > 0 && (
          <ul className={styles.list}>
            {queryMovies.map(queryMovie => (
              <li key={queryMovie.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${queryMovie.id}`,
                    state: this.props.location,
                  }}
                  className={styles.addInfoList}
                >
                  {queryMovie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default MoviesPage;
