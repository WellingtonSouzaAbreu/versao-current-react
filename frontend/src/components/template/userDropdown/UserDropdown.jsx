import React from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import './UserDropdown.css'

import {Link} from 'react-router-dom'

export function userDropdown(props) {
    const {user} = props
    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">{user.name}</span>
                <div className="user-dropdown-img">
                    <Gravatar email={user.email} />
                </div>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                <Link to='/admin'> <i className="fa fa-cogs"></i> Administração</Link>
                <Link to='/'> <i className="fa fa-sign-out"></i> Sair</Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.menu.user
})

export default connect(mapStateToProps)(userDropdown)
