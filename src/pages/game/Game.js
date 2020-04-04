import React from 'react' 
import './Game.css'
import { get, getURL } from '../../service/api'
import Header from '../../components/header/Header'

class Game extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      game: {},
      gamePhotos: {},
      bannerUrl: ''
    }
  }

  componentDidMount() {
    const gid = this.props.match.params.id

    get(`/video-game/${gid}`)
    .then(res => this.setState({game: res.data}))
    .catch(error => console.log(error))

    get(`/game-photos/${gid}`)
    .then(res => this.setState({ gamePhotos: res.data}, () => {
      this.setState({ bannerUrl: `${getURL()}game-photos/${gid}/banner/download`})
    }))
    .catch(error => console.log(error))


  }

  render() {
    return [
      <Header {...this.props} />,
      <div className="game-page">
        <img src={this.state.bannerUrl} alt="banner"/>
        <div className="game-content">
          hello
        </div>
      </div>
    ]
  }
}

export default Game;