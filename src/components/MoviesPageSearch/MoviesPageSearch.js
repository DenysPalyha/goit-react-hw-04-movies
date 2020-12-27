import React, { Component } from 'react';
import styles from './MoviesPageSearch.module.scss';

class MoviesPageSearch extends Component {
  static propTypes = {};

  state = {
    inputValue: '',
  };

  hendleOnChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  hendleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <form className={styles.Form} onSubmit={this.hendleSubmit}>
        <input
          type="text"
          className={styles.SearchFormInput}
          value={this.state.inputValue}
          onChange={this.hendleOnChange}
        />
        <button className={styles.SearchFormButton} type="submit">
          <span>Search</span>
        </button>
      </form>
    );
  }
}

export default MoviesPageSearch;
