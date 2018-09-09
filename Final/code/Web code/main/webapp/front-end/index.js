import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import First from './js/Main'
import Rate from './js/rate'
import Login from './js/login'
import Demo from './js/demo'
import Upload from './js/Upload'
import WrappedRegistrationForm from './js/register'
import Play from './js/Play'
import Camera from './js/Camera'
import Quit from './js/Quit'

render((
    <Router history={hashHistory}>
        <Route path="/" component={First}/>
        <Route path="/rate" component={Rate}/>
        <Route path="/login" component={Login}/>
        <Route path="/upload" component={Upload}/>
        <Route path="/register" component={WrappedRegistrationForm}/>
      <Route path="/demo" component={Demo}/>
      <Route path="/play" component={Play}/>
      <Route path="/camera" component={Camera}/>
      <Route path="/quit" component={Quit}/>
    </Router>
),document.getElementById('root'))
