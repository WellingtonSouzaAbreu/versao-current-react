import React, { Component } from 'react'
import './ArticlesByCategory.css'
import { baseApiUrl } from '../../global.js'
import axios from 'axios'
import PageTitle from './../template/pageTitle/PageTitle.jsx'
import ArticleItem from './ArticleItem.jsx'

const initialState = {
    category: {name: 'CSS'},
    articles: [],
    currentPage: 1,
    loadMore: true
}

export default class ArticlesByCategory extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }

        // this.getCategory()
        // this.getArticles()
    }

    async getCategory() {
        const url = `${baseApiUrl}/categories/${this.state.category.id}`
        await axios.get(url).then(res => this.setState({ category: { ...res.data } }))
        this.getArticles()
    }

    async getIdFromRoute() {
        let categoryId = this.props.match.params.id
        await this.setState({ category: { id: categoryId } })
        this.getCategory()
    }

    getArticles() {
        const url = `${baseApiUrl}/categories/${this.state.category.id}/articles?page=${this.state.currentPage}`
        axios.get(url).then(res => {
            let articles = this.state.articles.concat(res.data)
            let loadMore = res.data.length === 0 ? false : true
            this.setState({ articles, currentPage: ++this.state.currentPage, loadMore: loadMore })
        })
    }

    renderArticles() {
        return (
            this.state.articles.map((article, i) => {
                return <li>{<ArticleItem article={this.state.articles[i]}/>}</li>
            })
        )
    }

    render() {
        return (
            <div className="articles-by-category" onClick={e => this.getIdFromRoute()}>
                <PageTitle icon="fa fa-folder-o" main="{this.state.category.name}" sub="Categoria" />
                <ul>
                    <li>{this.renderArticles()}</li>
                </ul>
                <div className="load-more">
                    <button hidden={!this.state.loadMore} class="btn btn-lg btn-outline-primary"
                        onClick={e => this.getArticles()} >Carregar Mais</button>
                </div>
            </div>

        )
    }
}