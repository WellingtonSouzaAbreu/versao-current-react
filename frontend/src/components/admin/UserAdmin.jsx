import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { baseApiUrl } from './../../global.js'
import axios from 'axios'

const initialState = {
    mode: 'save', // Alterna o botão entre deletar, editar e salvar
    user: {},
    users: []
    /* { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true },
    { id: 1, name: 'Ana', email: 'Ana@gmail.com', admin: true } */
}

export default class UserAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }

        this.loadUsers()
    }

    loadUsers() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => {
            this.setState({ users: res.data })
        })
    }

    updateField(event) {
        let user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    save() {
        const method = this.state.user.id ? 'put' : 'post'
        const id = this.state.user.id ? `/${this.state.user.id}` : ''
        window.alert(`${baseApiUrl}/users${id}`)
        axios[method](`${baseApiUrl}/users${id}`, this.state.user)
            .then(() => {
                this.reset()
            })
            .catch((err) => window.alert('Erro ao salvar!'))
    }

    reset() {
        this.loadUsers()
        this.setState({
            user: {id: '', name: '', email:'', admin:false, password:'', confirmPassword:''},
            mode: 'save'
        })
    }

    remove() {
        const id = this.state.user.id
        axios.delete(`${baseApiUrl}/users/${id}`)
            .then(() => {
                window.alert('Deletado com sucesso!')
                this.reset()
            })
            .catch(() => window.alert('Erro ao deletar!'))
    }

    loadUser(user, mode = 'save') {
        mode = mode
        this.setState({ user, mode })
    }

    renderRows() {
        return (
            this.state.users.map((user) =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.admin ? 'Sim' : 'Não'}</td>
                    <td>
                        <button className="btn btn-warning" onClick={e => this.loadUser(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={e => this.loadUser(user, 'remove')}>
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
                        <th>Email</th>
                        <th>Administrador</th>
                        <th>Ações</th>
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
            <div className="user-admin">
                <form className="mt-3">
                    <input type="hidden" name="id" value={this.state.user.id} onChange={e => this.updateField(e)} />
                    <div className="form-row">
                        <div className="col-md-6 col-sm-12">
                            <label for="user-name">Nome</label>
                            <input type="text" className="form-control" id="user-name" readOnly={this.state.mode == 'remove'}
                                name="name" value={this.state.user.name} placeholder="Informe o Nome do Usuário..." required onChange={e => this.updateField(e)} />
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <label for="user-email">Email</label>
                            <input type="text" className="form-control" id="user-email" readOnly={this.state.mode == 'remove'}
                                name="email" value={this.state.user.email} placeholder="Informe o Email do Usuário..." required onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div class="form-check mt-3 mb-3">
                        <input class="form-check-input" type="checkbox" id="user-admin" readOnly={this.state.mode == 'remove'}
                            name="admin"  onChange={e => this.updateField(e)} />
                        <label class="form-check-label" for="user-admin">
                            Administrador?
                        </label>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12" hidden={this.state.mode == 'remove'}>
                            <label for="user-password">Senha</label>
                            <input type="password" className="form-control" id="user-password"
                                name="password" value={this.state.user.password} placeholder="Informe a Senha..." required onChange={e => this.updateField(e)} />
                        </div>
                        <div className="form-group col-md-6 col-sm-12" hidden={this.state.mode == 'remove'}>
                            <label for="user-confirm-password">Confirmação de senha</label>
                            <input type="password" className="form-control" id="user-confirm-password"
                                name="confirmPassword" value={this.state.user.confirmPassword} placeholder="Confirme a Senha" required onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <button className="btn btn-primary" hidden={this.state.mode == 'remove'} onClick={e => this.save()}>Salvar</button>
                            <button className="btn btn-danger" hidden={this.state.mode == 'save'} onClick={e => this.remove()}>Excluir</button>
                            <button className="btn btn-secondary ml-2" onClick={e => this.reset()}>Cancelar</button>
                        </div>
                    </div>
                </form>
                <hr />
                {this.showTable()}

            </div>
        )
    }
}