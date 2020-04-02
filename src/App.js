import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import auth from './service/auth';
import MainPage from './pages/main/MainPage';
import Login from './pages/login/Login';
import AppLayout from './pages/AppLayout';
import ProtectedRoute from './service/ProtectedRoute';
import Game from './pages/game/Game'
import User from './pages/user/User'
import Admin from './pages/admin/Admin'
import { toast } from 'react-toastify';
import AdminRoute from './service/AdminRoute';

toast.configure();

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login}/> 
        <ProtectedRoute exact path="/" component={MainPage}/>
        <ProtectedRoute exact path="/app" component={AppLayout}/>
        <ProtectedRoute path="/game" component={Game}/>
        <ProtectedRoute exact path="/user" component={User}/>
        <AdminRoute exact path="/admin" component={Admin}/>
        <Route path="*" component={() => "404 NOT FOUND"}/>
      </Switch>
    </div>
  );
}

export default App;
