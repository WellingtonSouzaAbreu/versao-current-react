import React from 'react'
import {Tabs, Tab} from 'react-bootstrap';

import PageTitle from '../template/pageTitle/PageTitle.jsx'
import CategoryAdmin from './CategoryAdmin.jsx'
import ArticleAdmin from './ArticleAdmin.jsx'
import UserAdmin from './UserAdmin.jsx'

export default function AdminPages(props) {
    return (
        <div className="admin-pages">
            <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros and Cia" />
            <div className="admin-pages-tabs">
                <Tabs defaultActiveKey="profile">
                    <Tab eventKey="artigos" title="Artigos">
                        <CategoryAdmin/>
                    </Tab>
                    <Tab eventKey="categorias" title="Categorias">
                        <ArticleAdmin/>
                    </Tab>
                    <Tab eventKey="usuarios" title="Usuários">
                        <UserAdmin/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}