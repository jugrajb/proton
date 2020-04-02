import React from 'react';
import './MainPage.css';
import auth from '../../service/auth';
import SearchBar from '../../components/search-bar/SearchBar';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import godOfWar from '../../assets/god_of_war_4.jpg';
import halo1 from '../../assets/halo_1.jpg';
import halo2 from '../../assets/halo_2.png';
import halo3 from '../../assets/halo_3.png';
import cod from '../../assets/cod.jpg';
import cod4 from '../../assets/cod_4.jpg';
import massEffect from '../../assets/mass_effect.jpg';
import massEffect2 from '../../assets/mass_effect_2.png';
import uncharted from '../../assets/uncharted_2.jpg';
import uncharted2 from '../../assets/uncharted.jpg';
import Header from '../../components/header/Header';

import { get } from '../../service/api'

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: []
    }

    this.handleGameRoute = this.handleGameRoute.bind(this)
  }

  componentDidMount() {
    get('video-game')
    .then(
      resp => this.setState({ games: resp.data })
    )
  }

  handleGameRoute(id) {
    const url = "/game/" + id
    console.log(id);
    this.props.history.push(url)
  }

  render() {
    const { games } = this.state;
    console.log(this.state.games);

    return [
      <Header key="header"/>,
      <div key="page" className="page">
        <div className="banner">
          <SearchBar />
        </div>
        <div className="content">
          <div className="card-container">
            <Filter/>
            <div className="card-rows">
              {games.map((game, i) => 
                <Card 
                  key={game.gid} 
                  game={game}
                  onClick={this.handleGameRoute}
                />
              )}
              {/* <Card id="1" cardImage={godOfWar}/>
              <Card id="2" cardImage={massEffect}/>
              <Card id="3" cardImage={halo1}/>
              <Card id="4" cardImage={halo2}/>
              <Card id="5" cardImage={halo3}/>
              <Card id="6" cardImage={cod}/>
              <Card id="7" cardImage={cod4}/>
              <Card id="8" cardImage={massEffect2}/>
              <Card id="9" cardImage={uncharted}/> */}
              <div className="fade-box"/>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default MainPage;