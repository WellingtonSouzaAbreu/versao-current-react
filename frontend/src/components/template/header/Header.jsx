import React from 'react'
import './Header.css'
import 'font-awesome/css/font-awesome.css'
import '../userDropdown/UserDropdown.jsx'

import { connect } from 'react-redux'
import { changeMenuVisibility } from './../../../config/actions/menu.js'
import UserDropdown from '../userDropdown/UserDropdown.jsx'

import { Link } from 'react-router-dom'

export function Header(props) {
    const { menuVisible, user } = props

    return (
        <header className="header">
            <a href className="toggle" hidden={user == null} onClick={e => props.toggleMenuVisibility(menuVisible)}>
                <i className={`fa ${setIcon(menuVisible)}`}></i>
            </a>
            <h1 className="title">
                <Link to='/'>{props.title}</Link>
            </h1>
            <UserDropdown></UserDropdown>
        </header>
    )
}

function setIcon(menuVisible, e) {
    return menuVisible ? 'fa-angle-left' : 'fa-angle-down'
}

function mapStateToProps(state) {
    return {
        menuVisible: state.menu.menuVisible,
        user: state.menu.user
    };
}

function mapDispatchToProp(dispatch) {
    return {
        toggleMenuVisibility(currentVisibility) {
            const visibility = !currentVisibility
            const action = changeMenuVisibility(visibility); //Retoruna  type: NUM_MIN_ALTERADO, payload: novoNumero
            dispatch(action); //Action armazena o min, max e a action
        }
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProp
)(Header);
