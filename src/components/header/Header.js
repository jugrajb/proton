import React from 'react';
import auth from '../../service/auth'
import './Header.css'

const onLogin = (props) => {
  auth.logout(() => props.history.push("/login"))
}

const onUser = (props) => {
  auth.logout(() => props.history.push("/login"))
}

const onAdmin = (props) => {
  auth.logout(() => props.history.push("/login"))
}

const Header = props => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-text"> VGDB </div>
        <div className="header-button-container">
          {auth.isAdmin() && <button className="header-admin" onClick={() => onAdmin(props)}>
            Admin Tools
          </button>}
          {auth.isAuthenticated() && <button className="header-user" onClick={() => onUser(props)}>
            My Profile
          </button>}
          <button onClick={() => onLogin(props)} className="header-auth">
            {auth.isAuthenticated() ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;