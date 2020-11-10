import React, { Component } from 'react';
import parseQueryString from '../../util/parseQueryString';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import moviesApi from '../../services/moviesApi';
import MoviesPage from '../../views/MoviesPage';
import styles from './MoviesPagesList.module.scss';
import PropTypes from 'prop-types';

class MoviesPageList extends Component {
  static propTypes = {};

  state = {
    queryMovies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');
    if (!query) {
      return;
    }
    this.setState({ loading: true });

    moviesApi
      .fetchMoviesWithQuery(query)
      .then(queryMovies => {
        this.setState({
          queryMovies,
        });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = parseQueryString(prevProps.location.search);
    const { query: nextQuery } = parseQueryString(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      this.fetchMowies(nextQuery);
    }
  }

  fetchMowies = query => {
    moviesApi
      .fetchMoviesWithQuery(query)
      .then(queryMovies => this.setState({ queryMovies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
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
        <MoviesPage onSubmit={this.hendleChangeQuery} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Loader />}
        {queryMovies.length > 0 && (
          <ul className={styles['list']}>
            {queryMovies.map(queryMovie => (
              <li key={queryMovie.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${queryMovie.id}`,
                    state: this.props.location,
                  }}
                  className={styles['addInfo-list']}
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

export default MoviesPageList;
