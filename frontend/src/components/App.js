import React from 'react';
import './App.css';

import Header from './template/header/Header.jsx'
import Menu from './template/menu/Menu.jsx'
import Content from './template/content/Content.jsx'
import Footer from './template/footer/Footer.jsx'

import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


function App(props) {
  const { isMenuVisible } = props

  return (
    <BrowserRouter>
      <div className={`App ${setLayout(isMenuVisible)}`}>
        <Header title="Cod3r - Base de Conhecimento" />
        <Menu />
        <Content />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function setLayout(isMenuVisible) {
  if (!isMenuVisible) return 'hide-menu'
}

function mapStateToProps(state) {
  return {
    isMenuVisible: state.menu.isMenuVisible
  }
}

export default connect(mapStateToProps)(App)


