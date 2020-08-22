import React from 'react'
import './PageTitle.css'

export default function PageTitle(props){
    

    return(
        <div className="page-title">
            <h1><i className={props.icon}></i>{props.main}</h1>
            <h2>{props.sub}</h2>
            <hr></hr>
        </div>
    )
}