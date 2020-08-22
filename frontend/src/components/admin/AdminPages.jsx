import React from 'react'
import PageTitle from '../template/pageTitle/PageTitle.jsx'

export default function AdminPages(props){
    return(
        <div className="admin-pages">
            <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros and Cia"/>
        </div>
    )
}