import React from 'react';
import './Login.css';
import auth from '../../service/auth';
import TextInput from '../../components/text-input/TextInput';
import { post } from '../../service/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Login extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      username: "",
      password: "",
      tab: 1
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
  }

  componentDidMount() {
    if(auth.isAuthenticated()) {
      this.props.history.push("")
    }
  }

  handleLogin() {
    const { email, password } = this.state;


    post("auth", { email, password }).then(
      resp => {
        if(resp.data.code === 0) {
          toast.error("Invalid Login Credentials")
        } else if(resp.data.code === 1){
          toast.success("Logged In")
          auth.login(false, resp.data.user.uid, () => this.props.history.push(""))
          
        } else if(resp.data.code === 2){
          toast.success("Logged In As Admin")
          auth.login(true, resp.data.user.uid, () => this.props.history.push(""))
        }
      }
    );

  }

  handleSignup() {
    const { email, username, password } = this.state;

    post(`auth/${username}`, { email, password }).then(
      resp => {
        if(resp.data === 0) {
          toast.error("Error, in sign up")
        } else if(resp.data === 1) {
          toast.success("Sign Up Completed, Please Login")
          this.setState({tab: 1})
        }
      }
    )
  }

  handleEmailChange(id, val) {
    this.setState({ email: val});
  }

  handlePasswordChange(id, val) {
    this.setState({ password: val})
  }

  handleUsernameChange(id, val) {
    this.setState({ username: val })
  }

  login() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <TextInput 
          id="email"
          label="email"
          value={email}
          onChange={this.handleEmailChange}
          disableEnter={true}
        />
        <TextInput 
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
          disableEnter={true}
        />
        <button onClick={() => this.handleLogin(this.state)}>
          Submit
        </button>
      </div>
    )
  }

  signUp() {
    const { email, username, password } = this.state;

    return (
      <div>
        <TextInput 
          id="email"
          label="email"
          value={email}
          onChange={this.handleEmailChange}
          disableEnter={true}
        />
        <TextInput 
          id="username"
          label="username"
          value={username}
          onChange={this.handleUsernameChange}
          disableEnter={true}
        />
        <TextInput 
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
          disableEnter={true}
        />
        <button onClick={() => this.handleSignup(this.state)}>
          Submit
        </button>
    </div>
    )
  }

  changeSelected() {
    if(this.state.tab === 1)
      this.setState({tab: 2})
    else
      this.setState({tab: 1})
  }

  render() {
    const {tab} = this.state;
    
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-tabs">
              <button 
                type={"login-" + tab}
                onClick={() => this.changeSelected()}
              >
                login
              </button>
              <button 
                type={"signup-" + tab}
                onClick={() => this.changeSelected()}
              >
                signup
              </button>
          </div>
          <div className="login-container">
            {tab === 1 ? this.login() : this.signUp()}
          </div>
        </div>
      </div>
    )
  }
}

export default Login;