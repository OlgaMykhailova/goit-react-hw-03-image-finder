import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { PropTypes } from 'prop-types';

import {
  SearchbarStyle,
  SearchFormStyle,
  SearchFormButtonStyle,
  SearchFormButtonLabelStyle,
  SearchFormInputStyle,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = this.state.inputValue;
    this.props.onSubmit(searchQuery);
    this.setState({inputValue: ""})
  };
  render() {
    const inputValue = this.state.inputValue;

    return (
      <SearchbarStyle>
        <SearchFormStyle onSubmit={this.handleSubmit}>
          <SearchFormButtonStyle type="submit">
            <SearchFormButtonLabelStyle>Search</SearchFormButtonLabelStyle>
            <AiOutlineSearch size="24px" />
          </SearchFormButtonStyle>

          <SearchFormInputStyle
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.onInputChange}
          />
        </SearchFormStyle>
      </SearchbarStyle>
    );
  }
}

Searchbar.propTypes = {
  onChange: PropTypes.func,
};
