import React, { Component } from 'react'
import PageTitle from './../template/pageTitle/PageTitle.jsx'
import './Home.css'

import Stat from './Stat.jsx'
import axios from 'axios'
import { baseApiUrl } from './../../global.js'

const initialState = {
    stat: {
        categories: 0,
        articles: 0,
        users: 0
    }
}


export default class Home extends Component {
    state = { ...initialState }

    getStats() {
        axios.get(`${baseApiUrl}/stats`)
            .then(res => {
                this.setState({ stat: {...res.data} })
            })
    }

    render() {
        // {this.getStats()} //Executa ao renderizar a tela
        return (
            <div className="home">
                <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
                <div className="stats">
                    <Stat title="Categorias" value={this.state.stat.categories} icon="fa fa-folder" color="#d54d50"></Stat>
                    <Stat title="Artigos" value={this.state.stat.articles} icon="fa fa-file" color="#3bc480"></Stat>
                    <Stat title="Usuários" value={this.state.stat.users} icon="fa fa-user" color="#3282cd"></Stat>
                </div>
            </div>
        )
    }
}
