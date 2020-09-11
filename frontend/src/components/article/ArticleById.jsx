import React from 'react'
import './ArticleById.css'
import { baseApiUrl } from './../../global.js'
import axios from 'axios'
import PageTitle from '../template/pageTitle/PageTitle.jsx'
import { Component } from 'react'

export default class ArticleById extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {}
        }
        this.getArticle()
    }

    getArticle() {
        const url = `${baseApiUrl}/articles/${this.props.match.params.id}`
        axios.get(url).then(res => this.setState({article: res.data}))
    }

    render() {
        return (
            <div className="article-by-id" >
                <PageTitle icon="fa fa-file-o" main={this.state.article.name} sub={this.state.article.description} />
                <div className="article-content">{this.state.article.content}</div>
            </div>
        )
    }
}