import React from 'react'

export default function Stat(props) {
    return (
        <div className="stat">
            <div className="stat-icon">
                <i className={props.icon} style={{color: props.color}}></i>
            </div>
            <div className="stat-info">
                <span className="stat-title">{props.title}</span>
                <span className="stat-value">{props.value}</span>
            </div>
        </div>
    )
}

