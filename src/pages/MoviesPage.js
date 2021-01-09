import React, { Component } from 'react';
import parseQueryString from '../util/parseQueryString';
import { Link } from 'react-router-dom';
import moviesApi from '../services/moviesApi';
import Loader from '../components/Loader/Loader';
import MoviesPageSearch from '../components/MoviesPageSearch/MoviesPageSearch';
import styles from './MoviesPage.module.scss';

class MoviesPage extends Component {
  static propTypes = {};

  state = {
    queryMovies: [],
    loading: false,
    error: null,
    pageNumber: '1',
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');
    if (!query) {
      return;
    }
    this.setState({ loading: true });
    moviesApi
      .getMoviesPageSearch({ query })
      .then(queryMovies => this.setState({ queryMovies: queryMovies }));

    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = parseQueryString(prevProps.location.search);
    const { query: nextQuery } = parseQueryString(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      this.moviesPageSearch(nextQuery);
    }
  }

  moviesPageSearch = query => {
    moviesApi
      .getMoviesPageSearch({ query })
      .then(queryMovies => this.setState({ queryMovies: queryMovies }));

    this.setState({ loading: false });
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
