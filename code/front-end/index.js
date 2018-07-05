import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import First from './js/Main'
import Rate from './js/rate'
import Register from './js/registerform'
import RegisterLogin from './js/register'
import Upload from './js/Upload'

render((
    <Router history={hashHistory}>
        <Route path="/" component={First}/>
        <Route path="/rate" component={Rate}/>
        <Route path="/register" component={Register}/>
        <Route path="/registerlogin" component={RegisterLogin}/>
        <Route path="/upload" component={Upload}/>
    </Router>
),document.getElementById('root'))