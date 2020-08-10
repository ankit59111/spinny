import React from "react";
import './card.css';

export default function ResultCard(props) {
    const {url,image_url,title} = props
    return (
        <a href={url} className="card">
            <div className="card__image">
                <img loading="lazy"
                     src={image_url}
                     alt={title}/>
            </div>
            <div className="card__name">
                <span>{title}</span>
            </div>
        </a>
    )
}