import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../service/auth';

const redirect = (location) => {
  return ({
    pathname: "/login",
    state: {
      from: location
    }
  })
}

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render = {props => {
        if(auth.isAuthenticated())
          return <Component {...props} />
        else
          return <Redirect to={redirect(props.location)} />
      }
    }/>
  )
}

export default ProtectedRoute;