import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home.jsx'
import AdminPages from '../components/admin/AdminPages.jsx'
import ArticlesByCategory from '../components/article/ArticlesByCategory.jsx'
import ArticleById from './../components/article/ArticleById.jsx'

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminPages} />
        <Route exact path="/categories/:id/articles" component={ArticlesByCategory} />
        <Route exact path='/articles/:id' component={ArticleById} />

        <Redirect from="*" to="/" />

    </Switch>
