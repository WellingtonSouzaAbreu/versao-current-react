import React from 'react'
import {Link} from 'react-router-dom'

import './ArticleItem.css'
import imgArticleDefault from './../../assets/img/article.png'

export default function ArticleItem(props){ // O article vem pelo props

    console.log(props)
    return(
        <div className="article-item">
            <Link to={`/articles/${props.article.id}`} name='José'>
            <div className="article-item-image d-non d-sm-block">
                <img src={imgArticleDefault} alt="Article" width='150' height="150" />
            </div>
            <div className="article-item-info">
                <h2>{props.article.name}</h2>
                <p>{props.article.description}</p>
                <span className="article-item-author">
                    <strong>Autor: </strong>{props.article.author}
                </span>
            </div>
            </Link>
        </div>
    )
}