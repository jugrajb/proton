import React from 'react';
import './MainPage.css';
import SearchBar from '../../components/search-bar/SearchBar';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Header from '../../components/header/Header';
import { get } from '../../service/api';
import PageTabs from '../../components/page-tabs/PageTabs';

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: [[]],
      page: 0,
    }

    this.handleGameRoute = this.handleGameRoute.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    get('game-card').then(
      resp => this.formatGames(resp.data, 6)
    )
  }

  formatGames(res, size) {
    let result = [];

    while(res.length > 0) {
      result.push(res.splice(0, size))
    }

    this.setState({ games: result })
  }

  handleGameRoute(id) {
    this.props.history.push(`/game/${id}`)
  }

  handlePageChange(i) {
    this.setState({ page: i})
  }

  render() {
    const { games, page } = this.state;

    return [
      <Header key="header" {...this.props} />,
      <div key="page" className="page">
        <div className="banner">
          <SearchBar />
        </div>
        <div className="content">
          <div className="card-container">
            <Filter/>
            <div className="card-rows">
              {games.length > 0 && games[page].map(game =>
                <Card 
                  key={game.gid} 
                  game={game}
                  onClick={this.handleGameRoute}
                />
              )}
              <PageTabs
                items={games}
                currPage={page}
                onClickHandler={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default MainPage;