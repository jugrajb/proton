import React from 'react';
import auth from '../../service/auth'
import './Header.css'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      auth: false,
      admin: false
    }
  }

  componentDidMount() {
    this.setState({ auth: auth.isAuthenticated()})
    this.setState({ admin: auth.isUserAdmin()})
  }

  componentDidUpdate() {
    this.setState({ auth: auth.isAuthenticated()})
    this.setState({ admin: auth.isUserAdmin()})
  }

  logoutButton() {
    return (
      <button 
        onClick={() => auth.logout(() => this.props.history.push("/login"))} 
        className="header-auth"
      >
        {this.state.auth ? 'Logout' : 'Login'}
      </button>
    )
  }
  
  userButton() {
    if(this.state.auth)
      return (
        <button 
          className="header-user" 
          onClick={() => this.props.history.push("/user")} 
          style={{ marginRight: "20px"}}
        >
          My Profile
        </button>
      )
  }
  
  toolsButton() {
    if(this.state.auth && this.state.admin)
      return (
        <button 
          className="header-admin" 
          onClick={() => this.props.history.push("/admin")} 
          style={{ marginRight: "20px"}}
        >
          Admin Tools
        </button>
      )
  }

  render() {
    return (
      <div className="header">
        <div className="header-container">
          <div className="header-text"> VGDB </div>
          <div className="header-button-container">
            {this.toolsButton()}
            {this.userButton()}
            {this.logoutButton()}  
          </div>
        </div>
      </div>
    )
  }
}

export default Header;