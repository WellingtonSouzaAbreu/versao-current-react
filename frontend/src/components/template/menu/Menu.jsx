import React from 'react'
import './Menu.css'
import { connect } from 'react-redux'

import { baseApiUrl } from './../../../global.js'
import axios from 'axios'

export function Menu(props) {
    const { menuVisible } = props
    let treeData = getTreeData()

    return (
        <aside className={`menu ${setVisibility(menuVisible)}`}>
           
        </aside>
    )
}

function getTreeData() {
    const url = `${baseApiUrl}/categories/tree`
    return axios.get(url).then(res => res.data) // Retornando uma promisse
}

function setVisibility(menuVisible) {
    if (!menuVisible) return 'hide'
}

function mapStateToProps(state) {
    return {
        menuVisible: state.menu.menuVisible
    };
}

export default connect(mapStateToProps)(Menu)