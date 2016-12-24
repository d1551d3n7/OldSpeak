import  '../styles/app.less'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose} from 'redux'
import {OldSpeakReactApplication} from './reducers.jsx'

// First we import some components...
import { Router, Route } from 'react-router'
import {loadState, saveState, clearState} from './models.jsx'
import HeaderView from './views/HeaderView.jsx'
import DashboardView from './views/DashboardView.jsx'
import history from './core.jsx'

import $ from 'jquery'

$(function(){
    let store = createStore(OldSpeakReactApplication, loadState(), compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    render((<Provider store={store}>
    <Router history={history}>
        <Route path="/" component={DashboardView} />
    </Router>
    </Provider>), document.getElementById('app-container'))
})
