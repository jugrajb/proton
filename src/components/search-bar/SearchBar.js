import React from 'react';
import searchIcon from '../../assets/search-icon.png';
import './SearchBar.css';
import TextInput from '../text-input/TextInput';

const inputStyle = {
  width: "100%",
  height: "100%"
}

class SearchBar extends React.PureComponent {
  render() {
    return (
      <div className="search-bar">
        <img className="search-icon" src={searchIcon} alt="search"/>
        <TextInput
          id="input"
          style={inputStyle}
          label={"Search..."}
        />
      </div> 
    )
  }
}

export default SearchBar;