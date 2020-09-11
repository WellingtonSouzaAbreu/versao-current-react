import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { baseApiUrl } from './../../global.js'
import axios from 'axios'

const initialState = {
    mode: 'save', // Alterna o botão entre deletar, editar e salvar
    category: {},
    categories: []
    /* { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true },
    { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true } */
}

export default class CategoryAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }

        this.loadCategories()
    }

    loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
            let categories = res.data.map(category => {
                return { ...category, value: category.id, text: category.path }
            })
            return this.setState({ categories })
        })
    }

    updateField(event) {
        let category = { ...this.state.category }
        category[event.target.name] = event.target.value
        this.setState({ category })
    }

    showCategoryOptions() {
        return (
            this.state.categories.map(category => {
                return <option value={category.value}>{category.text}</option>
            })
        )
    }

    save(e) {
        if(e) e.preventDefault()
        const method = this.state.category.id ? 'put' : 'post'
        const id = this.state.category.id ? `/${this.state.category.id}` : ''
        axios[method](`${baseApiUrl}/categories${id}`, this.state.category)
            .then(() => {
                this.reset()
            })
            .catch((err) => window.alert('Erro ao salvar!'))
    }

    reset(e) {
        if(e) e.preventDefault()
        this.loadCategories()
        this.setState({
            category: {name: ''},
            mode: 'save'
        })
    }

    remove(e) {
        if(e) e.preventDefault()
        const id = this.state.category.id
        axios.delete(`${baseApiUrl}/categories/${id}`)
            .then(() => {
                window.alert('Deletado com sucesso!')
                this.reset()
            })
            .catch((err) => {
                window.alert(err)
                window.alert('Erro ao deletar!')
            })
    }

    loadCategory(category, mode = 'save') {
        mode = mode
        this.setState({
            category: {
                id: category.id,
                name: category.name,
                parentId: category.parentId,
                path: category.path
            }, mode
        })
    }

    renderRows() {
        return (
            this.state.categories.map((category) =>
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.path}</td>
                    <td>
                        <button className="btn btn-warning" onClick={e => this.loadCategory(category)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={e => this.loadCategory(category, 'remove')}>
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
                        <th>Caminho</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>
        )
    }

    render() {
        return (
            <div className="category-admin">
                <form className="mt-3">
                    <input type="hidden" name="id" value={this.state.category.id} onChange={e => this.updateField(e)} />
                    <div className="form-row">
                        <div className="form-group col-sm-12">
                            <label for="category-name">Nome</label>
                            <input type="text" className="form-control" id="category-name" readOnly={this.state.mode === 'remove'}
                                name="name" value={this.state.category.name} placeholder="Informe o Nome da Categoria..." required onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-12" hidden={this.state.mode === 'remove'}>
                            <label for="category-name">Categoria Pai:</label>
                            <select className="form-control" name="parentId" id="category-parentId"
                                onChange={e => this.updateField(e)}>
                                {this.showCategoryOptions()}
                            </select>
                        </div>
                        <div className="form-group col-sm-12" hidden={this.state.mode !== 'remove'}>
                            <label for="category-name">Categoria Pai:</label>
                            <input type="text" className="form-control" value={this.state.category.path} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-12">
                            <button className="btn btn-primary" hidden={this.state.mode == 'remove'} onClick={e => this.save(e)}>Salvar</button>
                            <button className="btn btn-danger" hidden={this.state.mode == 'save'} onClick={e => this.remove(e)}>Excluir</button>
                            <button className="btn btn-secondary ml-2" onClick={e => this.reset(e)}>Cancelar</button>
                        </div>
                    </div>

                </form>
                <hr />
                {this.showTable()}

            </div>
        )
    }
}