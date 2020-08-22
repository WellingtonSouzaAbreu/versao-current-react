import React from 'react'
import PageTitle from './../template/pageTitle/PageTitle.jsx'

import Stat from './Stat.jsx'
import axios from 'axios'
import { baseApiUrl } from './../../global.js'

export default function Home(props) {
    let stat = getStats()
    console.log(stat)
    return (
        <div className="home">
            <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
            <div className="stats">
                <Stat title="Categorias" value/*= {stat.users} */ icon="fa fa-folder" color="#d54d50"></Stat>
                <Stat title="Artigos" icon="fa fa-file" color="#3bc480"></Stat>
                <Stat title="Usuários" icon="fa fa-user" color="#3282cd"></Stat>
            </div>
        </div>
    )
}

function getStats() {
    let resp
    axios.get(`${baseApiUrl}/stats`)
        .then(res => resp = res.data)
    console.log(resp)
    return resp
}