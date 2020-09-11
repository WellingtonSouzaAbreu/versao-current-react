import React from 'react';
import './App.css';

import Header from './template/header/Header.jsx'
import Menu from './template/menu/Menu.jsx'
import Content from './template/content/Content.jsx'
import Footer from './template/footer/Footer.jsx'

import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


function App(props) {
  const { menuVisible } = props

  return (
    <BrowserRouter>
      <div className={`App ${setLayout(menuVisible)}`}>
        <Header title="Cod3r - Base de Conhecimento" />
        <Menu />
        <Content />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function setLayout(menuVisible) {
  if (!menuVisible) return 'hide-menu'
}

function mapStateToProps(state) {
  return {
    menuVisible: state.menu.menuVisible
  }
}

export default connect(mapStateToProps)(App)


