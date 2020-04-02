import React from 'react';
import propTypes from 'prop-types';
import './Card.css';
import { withRouter } from 'react-router-dom'

const Card = withRouter((props) => (
    <button 
      className="card" 
      id={props.game.gid}
      onClick={() => props.onClick(props.game.gid)}
    >
      {console.log(props.game)}
      <img className="card-image" src={props.cardImage} alt=""/>
      <div className="info"/>
    </button>
))

Card.propTypes = {
  game: propTypes.object,
  onClick: propTypes.func
}

Card.defaultProps = { 
  game: {},
  onClick: () => {}
}

export default Card;