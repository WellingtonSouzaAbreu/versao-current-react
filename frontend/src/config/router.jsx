import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home.jsx'
import AdminPages from '../components/admin/AdminPages.jsx'

export default props =>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/admin" component={AdminPages}/>
        <Redirect from="*" to="/"/>
    </Switch>
