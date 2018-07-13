import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import First from './js/Main'
import Rate from './js/rate'
import Login from './js/login'
import Upload from './js/Upload'
import Crop from './js/Cropper'
import WrappedRegistrationForm from './js/register'

render((
    <Router history={hashHistory}>
        <Route path="/" component={First}/>
        <Route path="/rate" component={Rate}/>
        <Route path="/login" component={Login}/>
        <Route path="/cropper" component={Crop}/>
        <Route path="/upload" component={Upload}/>
            <Route path="/register" component={WrappedRegistrationForm}/>
    </Router>
),document.getElementById('root'))