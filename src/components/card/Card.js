import React from 'react';
import propTypes from 'prop-types';
import './Card.css';
import { withRouter } from 'react-router-dom'
import { getURL } from '../../service/api'

const Card = withRouter((props) => (
    <button 
      className="card" 
      id={props.game.gid}
      onClick={() => props.onClick(props.game.gid)}
    >
      <img className="card-image" src={`${getURL()}/game-photos/${props.game.gid}/cover/download`}  alt=""/>
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