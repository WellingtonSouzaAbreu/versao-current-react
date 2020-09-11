import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { baseApiUrl } from './../../global.js'
import axios from 'axios'

const initialState = {
    mode: 'save', // Alterna o botão entre deletar, editar e salvar
    article: {},
    articles: [],
    limit: 0,
    count: 0,
    pages: [1, 2],
    currentPage: 1,
    categories: [],
    users: []
    /* { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true },
    { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true } */
}

export default class ArticleAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }

        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }

    loadArticles() {
        const url = `${baseApiUrl}/articles?page=${this.state.currentPage}`
        axios.get(url).then(res => {
            let articles = res.data.data
            this.setState({
                articles: articles,
                count: res.data.count,
                limit: res.data.limit
            })
            return
        }).then(() => this.configurePager())
    }

    loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
            let categories = res.data.map(category => {
                return { value: category.id, text: category.path }
            })
            this.setState({ categories })
        })
    }

    loadUsers() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => {
            let users = res.data.map(user => {
                return { value: user.id, text: `${user.name} - ${user.email}` }
            })
            this.setState({ users })
        }).catch(err => window.alert('Erro!'))
    }

    updateField(event) {
        let article = { ...this.state.article }
        article[event.target.name] = event.target.value
        this.setState({ article })
    }

    showCategoryOptions() {
        return (
            this.state.categories.map(category => {
                return <option value={category.value} selected>{category.text}</option>
            })
        )
    }

    showUserOptions() {
        return (
            this.state.users.map(user => {
                return <option value={user.value}>{user.text}</option>
            })
        )
    }

    save(e) {
        if (e) e.preventDefault()
        const method = this.state.article.id ? 'put' : 'post'
        const id = this.state.article.id ? `/${this.state.article.id}` : ''
        console.log(this.state.article)

        axios[method](`${baseApiUrl}/articles${id}`, this.state.article)
            .then(() => {
                window.alert('Salvo com sucesso!')
                this.reset()
            })
            .catch((err) => window.alert('Erro ao salvar!'))
    }

    reset(e) {
        if (e) e.preventDefault()
        this.loadArticles()
        this.setState({
            article: {},
            mode: 'save'
        })
    }

    remove(e) {
        if (e) e.preventDefault()
        const id = this.state.article.id
        axios.delete(`${baseApiUrl}/articles/${id}`)
            .then(() => {
                window.alert('Deletado com sucesso!')
                this.reset()
            })
            .catch((err) => {
                window.alert(err)
                window.alert('Erro ao deletar!')
            })
    }

    loadArticle(article, mode = 'save') {
        const url = `${baseApiUrl}/articles/${article.id}`
        axios.get(url)
            .then(res => {
                this.setState({ article: res.data, mode: mode })
            })
    }

    renderRows() {
        console.log(this.state.articles)
        return (
            this.state.articles.map((article) =>
                <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.name}</td>
                    <td>{article.description}</td>
                    <td>
                        <button className="btn btn-warning" onClick={e => this.loadArticle(article)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={e => this.loadArticle(article, 'remove')}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        )
    }

    showTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>
        )
    }

    setActivePage(pageNumber) {
        return this.state.currentPage == pageNumber ? 'active' : ''
    }

    async setCurrentPage(currentPage, e) {
        if (e) e.preventDefault()
        await this.setState({ currentPage })
        this.loadArticles()
    }

    previousPage(e) {
        if (e) e.preventDefault()
        let { currentPage } = this.state
        this.setCurrentPage(currentPage > 1 ? --currentPage : currentPage)
    }

    nextPage(e) {
        if (e) e.preventDefault()
        let { currentPage, pages } = this.state
        this.setCurrentPage(currentPage < pages.length ? ++currentPage : currentPage)
    }

    showPager() {
        return (
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="" onClick={e => this.previousPage(e)}>{'<<'}</a>
                    </li>
                    {this.state.pages.map((page) => {
                        return (
                            <li class={`page-item ${this.setActivePage(page)}`} onClick={e => this.setCurrentPage(page, e)}>
                                <a class="page-link " href="">{page}</a>
                            </li>
                        )
                    })}
                    <li class="page-item">
                        <a class="page-link" href="" onClick={e => this.nextPage(e)}>{'>>'}</a>
                    </li>
                </ul>
            </nav>
        )
    }

    configurePager() {
        let numberOfPages = Math.ceil(this.state.count / this.state.limit)
        let pages = []
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i)
        }
        this.setState({ pages })
    }

    render() {
        return (
            <div className="article-admin">
                <form className="mt-3">
                    <input type="hidden" name="id" value={this.state.article.id} onChange={e => this.updateField(e)} />
                    <div className="form-group col-sm-12">
                        <label for="article-name">Nome</label>
                        <input type="text" className="form-control" id="article-name" readOnly={this.state.mode === 'remove'}
                            name="name" value={this.state.article.name} placeholder="Informe o Nome do Artigo..." required onChange={e => this.updateField(e)} />
                    </div>

                    <div className="form-group col-sm-12">
                        <label for="article-description">Descrição</label>
                        <input type="text" className="form-control" id="article-description" readOnly={this.state.mode === 'remove'}
                            name="description" value={this.state.article.description} placeholder="Informe a descrição do Artigo..." required onChange={e => this.updateField(e)} />
                    </div>

                    <div className="form-group col-sm-12">
                        <label for="article-imageUrl">Imagem (URL)</label>
                        <input type="text" className="form-control" id="article-imageUrl" readOnly={this.state.mode === 'remove'}
                            name="imageUrl" value={this.state.article.imageUrl} placeholder="Informe a URL da imagem..." required onChange={e => this.updateField(e)} />
                    </div>

                    <div className="form-group col-sm-12" hidden={this.state.mode === 'remove'}>
                        <label for="article-categoryId">Categoria</label>
                        <select className="form-control" name="categoryId" id="article-categoryId"
                            onChange={e => this.updateField(e)}>
                            <option selected>Selecione a Categoria do Artigo...</option>
                            {this.showCategoryOptions()}  {/* Essa função dispara primeiro que o restante que o option */}
                        </select>
                    </div>

                    <div className="form-group col-sm-12" hidden={this.state.mode === 'remove'}>
                        <label for="article-userId">Autor</label>
                        <select className="form-control" name="userId" id="article-userId"
                            onChange={e => this.updateField(e)}>
                            {this.showUserOptions()}
                        </select>
                    </div>

                    <div class="form-group col-sm-12">
                        <label for="article-content">Conteúdo</label>
                        <textarea class="form-control" name="content" id="article-content" rows="5" readOnly={this.state.mode === 'remove'}
                            value={this.state.article.content} onChange={e => this.updateField(e)}></textarea>
                    </div>

                    <div className="col-md-12">
                        <button className="btn btn-primary" hidden={this.state.mode == 'remove'} onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-danger" hidden={this.state.mode == 'save'} onClick={e => this.remove(e)}>Excluir</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.reset(e)}>Cancelar</button>
                    </div>

                </form>
                <hr />
                {this.showTable()}
                {this.showPager()}
            </div>
        )
    }
}