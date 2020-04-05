import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

const Label = props => (
  <div style={props.style} className="label">
    <b>{props.left}:</b> 
    {props.right}
  </div>
)

Label.propTypes = {
  left: PropTypes.string,
  style: PropTypes.object
}

Label.defaultProps = { 
  left: "",
  style: {}
}

export default Label;