import React from 'react'
import './Header.css'
import 'font-awesome/css/font-awesome.css'
import '../userDropdown/UserDropdown.jsx'

import { connect} from 'react-redux'
import { changeMenuVisibility } from './../../../config/actions/menu.js'
import UserDropdown from '../userDropdown/UserDropdown.jsx'

import { Link } from 'react-router-dom'

export function Header(props) {
    const { isMenuVisible } = props

    return (
        <header className="header">
            <a href='/' className="toggle"  onClick={e => props.toggleMenuVisibility(props.isMenuVisible)}>
                <i className={`fa ${setIcon(isMenuVisible)}`}></i>
            </a>
            <h1 className="title">
                <Link to='/'>{props.title}</Link>
            </h1>
            <UserDropdown></UserDropdown>
        </header>
    )
}

function setIcon(isMenuVisible) {
    return isMenuVisible ? 'fa-angle-left' : 'fa-angle-down'
}

function mapStateToProps(state) {
    return {
        isMenuVisible: state.menu.isMenuVisible,
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
