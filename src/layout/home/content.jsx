import React from 'react'
import moment from 'moment'
import ListGroup from '../../components/list-group/ListGroup'
import ListGroupItem from '../../components/list-group/ListGroupItem'
import Image from '../../components/image/Image'
import Loading from '../preloader/Preloader'

import './home.css'

const createKey = arr => 
    arr.reduce((acc, cur) => 
        acc + cur.replace(/\s/g, '').toLowerCase().replace(/-/g, ''), 
        ''
)

const Content = (props) => {
    // console.log('content', props.results)
    const { results = [] } = props.res
    // console.log('content', results)
    return (
        <div>
            <h1>Movie reviews that are critics' picks</h1>
            <ListGroup className="in-row">
                {results.map(({
                    byline,
                    display_title,
                    headline, 
                    multimedia,
                    link, 
                    summary_short,
                    publication_date,
                    opening_date,
                }) => 
                    <ListGroupItem 
                        key={createKey([byline, display_title, publication_date])} 
                        className="in-row"
                    >
                        <h2>{display_title}</h2>
                        <p className="headline">{headline}</p>
                        <div className="card-body">
                            <div className="image">
                                {/* <img className="img" src={multimedia.src} alt="movies foto" /> */}
                                <Image 
                                    className="img" 
                                    src={multimedia ? multimedia.src : false}
                                    width={375}
                                    height={250}
                                />
                            </div>
                            <div className="card-description">
                                <p>{summary_short} <i className="author">Opening date {opening_date}</i></p>
                                <p className="author">By {byline}</p>
                                <p className="author">
                                    {moment(publication_date).add(0,'year').format('LL')}
                                </p>
                                <p className="link-text">{link.suggested_link_text}</p>
                                <a href={link.url} className="read-review">read review</a>
                            </div>
                        </div>
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}

export default Loading('res')(Content)