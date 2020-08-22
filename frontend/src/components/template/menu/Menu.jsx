import React from 'react'
import './Menu.css'
import { connect } from 'react-redux'

export function Menu(props) {
    const {isMenuVisible} = props



    return (
        <aside className={`menu ${setVisibility(isMenuVisible)}`}>

        </aside>
    )
}

function setVisibility(isMenuVisible){
    if(!isMenuVisible) return 'hide-menu'
}

function mapStateToProps(state) {
    return {
        isMenuVisible: state.menu.isMenuVisible
    };
}

export default connect(mapStateToProps)(Menu)