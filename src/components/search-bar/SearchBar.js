import React from 'react';
import searchIcon from '../../assets/search-icon.png';
import './SearchBar.css';
import TextInput from '../text-input/TextInput';
import PropTypes from 'prop-types'

const inputStyle = {
  width: "100%",
  height: "100%"
}

const SearchBar = props =>  (
  <div className="search-bar">
    <img className="search-icon" src={searchIcon} alt="search"/>
    <TextInput
      id="input"
      style={inputStyle}
      label={"Search..."}
      value={props.value}
      onChange={(id, val) => props.onChange(id, val)}
      onKeyDown={props.onKeyDown}
    />
  </div> 
)

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
}


export default SearchBar;