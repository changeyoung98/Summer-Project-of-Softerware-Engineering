import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import First from './js/Main'
import Rate from './js/rate'
import Register from './js/registerform'

render((
    <Router history={hashHistory}>
        <Route path="/" component={First}/>
        <Route path="/rate" component={Rate}/>
        <Route path="/register" component={Register}/>
    </Router>
),document.getElementById('root'))