import React from 'react';
import './MainPage.css';
import SearchBar from '../../components/search-bar/SearchBar';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Header from '../../components/header/Header';
import { get, post } from '../../service/api';
import PageTabs from '../../components/page-tabs/PageTabs';

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: [[]],
      page: 0,

      filter_require: "ANY",
      gid_check: false,
      title_check: false,
      releaseDate_check: false,
      genre_check: false,

      gid_comparator: "<",
      gid_value: 0,
      title_comparator: "=",
      title_value: "",
      releaseDate_comparator: "<",
      releaseDate_value: null,
      genre_comparator: "=",
      genre_value: "FPS",

      sort_1_column: "",
      sort_2_column: "",
      sort_3_column: "",
      sort_4_column: "",
      sort_1_dir: "ASC",
      sort_2_dir: "ASC",
      sort_3_dir: "ASC",
      sort_4_dir: "ASC",
    }

    this.handleGameRoute = this.handleGameRoute.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    // filter methods
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
    this.handleRequireChange = this.handleRequireChange.bind(this)
    this.handleColumnCheck = this.handleColumnCheck.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this);
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

  // Filter handlers

  getCondition(attribute, comparator, value) {
    const comp = (comparator === "!=") ? "<>" : comparator;
    const val = (comp === "LIKE") ? `%${value}%` : value;
    return {
      attribute : attribute,
      comparator : comp,
      value : val
    };
  }

  handleFilterSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    const s = this.state;

    // Parse conditions
    let conditions = []
    if (s.gid_check) {
      conditions.push(this.getCondition("gid", s.gid_comparator, s.gid_value));
    }
    if (s.title_check) {
      conditions.push(this.getCondition("title", s.title_comparator, s.title_value));
    }
    if (s.releaseDate_check && s.releaseDate_value !== null) {
      conditions.push(this.getCondition("releaseDate", s.releaseDate_comparator, s.releaseDate_value));
    }
    if (s.genre_check) {
      conditions.push(this.getCondition("genre", s.genre_comparator, s.genre_value));
    }

    // Parse sort by
    let sort = [];
    let directions = [];
    Array(4).fill().forEach((_, i) => {
      if (s[`sort_${i+1}_column`]) {
        sort.push(s[`sort_${i+1}_column`]);
        directions.push(s[`sort_${i+1}_dir`]); 
      }
    });
    // send POST request with body
    const selection = {
      "conditions" : conditions,
      "require" : s.filter_require,
      "sort" : sort,
      "directions" : directions
    }
    console.log(selection);
    post('game-card/', selection)
    .then((res) => {
      this.formatGames(res.data, 6)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleRequireChange(event) {
    const value = event.target.value;
    this.setState({filter_require: value});
  }

  handleFormChange(event) {
    let stateObj = {}
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
  }

  handleColumnCheck(event) {
    const id = event.target.id;
    let checked = !this.state[id];
    let stateObj = {}
    stateObj[id] = checked;
    this.setState(stateObj);
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
            <Filter
              submitFilter={this.handleFilterSubmit}
              handleRequireChange={this.handleRequireChange}
              handleColumnCheck={this.handleColumnCheck}
              handleFormChange={this.handleFormChange}

              require={this.state.filter_require}
              gid_check={this.state.gid_check}
              title_check={this.state.title_check}
              releaseDate_check={this.state.releaseDate_check}
              genre_check={this.state.genre_check}
              gid_comparator={this.state.gid_comparator}
              title_comparator={this.state.title_comparator}
              releaseDate_comparator={this.state.releaseDate_comparator}
              releaseDate_value={this.state.releaseDate_value}
            />
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