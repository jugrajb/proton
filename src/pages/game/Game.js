import React from 'react' 
import './Game.css'
import { get, getURL, post } from '../../service/api'
import Header from '../../components/header/Header'
import Label from '../../components/label/Label'
import auth from '../../service/auth'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AddUserReview = props => {
  const classes = useStyles();
  const [score, setScore] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [review, setReview] = React.useState("");

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleSubmit = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const data = {
      uid: auth.getLoggedUserUID(),
      gid: props.match.params.id,
      title: title,
      review: review,
      score: score,
      date: date
    }

    post("user-review", data).then(res => {
      console.log(res)
      setScore(0)
      setTitle("")
      setReview("")
      props.updateReview()
    }).catch(err => console.log(err))
  }

  return(
    <div className="game-add-review">
      <div>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={e => handleTitleChange(e)}
          style={{marginRight: "40px"}}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="input-score">Score</InputLabel>
          <Select
            labelId="score"
            id="score"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={score}
            onChange={handleScoreChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>     
      </div>
      <input
        style={{width: "95%"}}
        id="review"
        type="text"
        value={review}
        placeholder="Review"
        onChange={e => handleReviewChange(e)}
      />


      <button onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  )
}

AddUserReview.propTypes = {
  updateUserReview: PropTypes.func.isRequired
}


export class Game extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      game: {},
      summaryCritic: {},
      summaryUser: {},
      studio: {},
      publisher: {},
      director: {},
      platforms: [],
      awards: [],
      gamePeople: [],
      characterVa: [],
      relatedGames: [],
      criticReviews: [],
      userReviews: []
    }

    this.updateReviews = this.updateReviews.bind(this)
  }

  componentDidMount() {
    this.fetchPrimaryData()
  }

  fetchPrimaryData() {
    const gid = this.props.match.params.id

    get(`video-game/${gid}`)
    .then(res => this.setState({game: res.data}, this.fetchAssociatedGameData))
    .catch(error => console.log(error))

    get(`summary-score/critic/${gid}`)
    .then(res => this.setState({summaryCritic: res.data}))

    get(`summary-score/user/${gid}`)
    .then(res => this.setState({summaryUser: res.data}))   
  }

  fetchAssociatedGameData() {
    const {game} = this.state;

    get(`game-studio/${game.sid}`)
    .then(res => this.setState({studio: res.data}))
    .catch(err => console.log(err))

    get(`publishing-company/${game.pcid}`)
    .then(res => this.setState({publisher: res.data}))
    .catch(err => console.log(err))

    get(`director/${game.pid}`)
    .then(res => this.setState({director: res.data}))
    .catch(err => console.log(err))

    get(`playable-on/${game.gid}`)
    .then(res => this.setState({platforms: res.data}))
    .catch(err => console.log(err))

    get(`game-award-pair/${game.gid}`)
    .then(res => this.setState({awards: res.data}))
    .catch(err => console.log(err))

    get(`character-va/${game.gid}`)
    .then(res => this.setState({characterVa: res.data}))
    .catch(err => console.log(err))

    get(`related-games/${game.gid}`)
    .then(res => this.setState({relatedGames: res.data}))
    .catch(err => console.log(err))

    get(`critic-review/game/${game.gid}`)
    .then(res => this.setState({criticReviews: res.data}))
    .catch(err => console.log(err))

    get(`user-review/game/${game.gid}`)
    .then(res => this.setState({userReviews: res.data}))
    .catch(err => console.log(err))

    get(`person-game/game/${game.gid}`)
    .then(res => this.setState({gamePeople: res.data}))
    .catch(err => console.log(err))
  } 

  componentDidUpdate(prevProps) {
    if(this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchPrimaryData()
      window.scrollTo(0, 0)
    }    
  }

  updateReviews() {
    get(`user-review/game/${this.props.match.params.id}`)
    .then(res => this.setState({userReviews: res.data}))
    .catch(err => console.log(err))
  }

  render() {
    const { 
      game, platforms, awards, publisher, 
      studio, director, summaryCritic, summaryUser,
      gamePeople, characterVa, relatedGames,
      criticReviews, userReviews
    } = this.state;

    console.log(this.state)
    return [
      <Header key="header" {...this.props} />,
      <div key="game-page" className="game-page">
        <div className="game-banner"/>
        <div className="game-content">
          <div className="game-container">
            <div className="game-row-1">
              <div className="game-card">
                {game.gid &&
                  <img 
                    className="card-image" 
                    src={`${getURL()}/game-photos/${game.gid}/cover/download`}  
                    alt=""
                  />
                }
              </div>
              <div className="game-info">
                <div className="left-info">
                  <h3>{game.title}</h3>
                  <Label left="Release Date" right={game.releaseDate}/>
                  <br/>
                  <Label left="Genre" right={game.genre}/>
                  <br/>
                  <Label left="Playable On" right={platforms.map((platform, i) => `${i > 0 ? " ║ " : ""}${platform.name}`)}/>
                  <br/>
                  <Label left="Director Specialization" right={director.specialization || ""}/>
                  <br/>
                  <Label left="Studio Name" right={studio.name}/>
                </div>
                <div className="right-info">
                  <h3 style={{color: "white"}}>a</h3>
                  <Label left="Studio City" right={studio.city}/>
                  <br/>
                  <Label left="Studio State" right={studio.state}/>
                  <br/>
                  <Label left="Publisher Name" right={publisher.name}/>
                  <br/>
                  <Label left="Publisher City" right={publisher.city}/>
                  <br/>
                  <Label left="Publisher State" right={publisher.state}/>
                </div>
              </div>
            </div>
            <div className="game-row-2">
              <div className="game-awards">
                <h3>Awards</h3>
                {awards.map((award, i) => [
                  <Label key={i} left={award.award} right={award.organization + ", " + award.year}/>,
                  <br key={`br${i}`}/>
                ])}
              </div>
              <div className="game-score">
                <div className="left-info">
                  <h3>User Scores</h3>
                  <Label style={{width: "70%"}} left="Min" right={parseInt(summaryUser.min) + "/10"}/>
                  <br/>
                  <Label style={{width: "70%"}} left="Max" right={parseInt(summaryUser.max) + "/10"}/>
                  <br/>
                  <Label style={{width: "70%"}} left="Avg" right={parseInt(summaryUser.avg) + "/10"}/>
                </div>
                <div className="right-info">
                  <h3>Critic Scores</h3>
                  <Label style={{width: "70%"}} left="Min" right={parseInt(summaryCritic.min) + "/10"}/>
                  <br/>
                  <Label style={{width: "70%"}} left="Max" right={parseInt(summaryCritic.max) + "/10"}/>
                  <br/>
                  <Label style={{width: "70%"}} left="Avg" right={parseInt(summaryCritic.avg) + "/10"}/>
                </div>
              </div>
            </div>
            <div className="game-row-3">
              <div className="game-ch-va">
                <h3>Characters & Voice Actors</h3>
                {characterVa.map(character => 
                  <div key={character.pid}>
                    <Label left="First Name" right={character.firstname}/>
                    <Label left="Last Name" right={character.lastname}/>
                    <Label left="Character" right={character.character}/>
                    <br/>
                    <br/>
                  </div>
                )}
              </div>
              <div className="game-people">
                <h3>People</h3>
                {gamePeople.map(people => 
                  <div key={people.pid}>
                    <Label left="First Name" right={people.firstname}/>
                    <Label left="Last Name" right={people.lastname}/>
                    <Label left="Role" right={people.role}/>
                    <br/>
                    <br/>
                  </div>
                )}
              </div>
              <div className="game-related">
                <h3>Related Games</h3>
                {relatedGames.map(game => 
                  <div key={game.gid}>
                    <button 
                      className="related-game-button"
                      onClick={() => this.props.history.push(`/game/${game.gid}`)}
                    >
                      {game.title}
                    </button>
                    <br/>
                    <br/>
                  </div>
                )}
              </div>
            </div>
            <div className="game-row-3">
              <div className="critic-review">
                <h3>Critic Reviews</h3>
                {criticReviews.map((review, i) => (
                  <div key={`cr${i}`} className="c-review">
                    <Label left="Title" right={review.title}/>
                    <Label left="Score" right={review.score}/>
                    <Label left="Author" right={review.author}/>
                    <Label left="URL" right={review.url}/>
                    <Label left="Date" right={review.date}/>
                    <br/>
                    <br/>
                    <b>Review:</b>
                    <br/>
                    {review.review}
                  </div>
                ))}
              </div>
            </div>
            <div className="game-row-3">
              <div className="user-review">
                <h3>User Reviews</h3>
                {userReviews.map((review, i) => (
                  <div key={`ur${i}`} className="c-review">
                    <Label left="Title" right={review.title}/>
                    <Label left="Score" right={review.score}/>
                    <Label left="Date" right={review.date}/>
                    <br/>
                    <br/>
                    <b>Review:</b>
                    <br/>
                    {review.review}
                    <div className="game-profile">
                      <img className="game-profile-image" src="" alt="image"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="game-row-3">
              <div className="user-review">
                <h3>Add User Review</h3>
                <AddUserReview {...this.props} updateReview={this.updateReviews} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default Game;