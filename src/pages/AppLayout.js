import React from 'react'
import auth from '../service/auth';

const logoutHandler = (history) => {
  auth.logout(() => history.push("/"))
}

const AppLayout = props => {
  return(
    <div>
      App Layout
      <button onClick={() => logoutHandler(props.history)}>
        logout
      </button>
    </div>
  )
}

export default AppLayout;