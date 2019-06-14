import React, { Component } from 'react'
import { Conf } from '../../Conf/path'
import ListGroup from '../../components/list-group/ListGroup'
import ListGroupItem from '../../components/list-group/ListGroupItem'
import Image from '../../components/image/Image'
import Loading from '../preloader/Preloader'

import './Critics.css'

class Critics extends Component {
    state = { 
        res: {}
    }
    componentDidMount(){
        // const { page, order, type } = this.state
        this.fetchData()
    }

    fetchData = (page, order, type) => {
        const { BASE_PATH, API_KEY, MY_API_KEY } = Conf
        let url = `${BASE_PATH}critics/all.json?${API_KEY}${MY_API_KEY}`
        //let url =  `${BASE_PATH}reviews/${name}.json?${API_KEY}${MY_API_KEY}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({ res })
            })
            .catch(err => { throw err })
    }

    render() { 
        const { results = [] } = this.state.res
        console.log(results)
        return ( 
            <div>
                <h1>Critics</h1>
                {/* {results.map(({ display_name }) => 
                    <ul>
                        <li>{display_name}</li>
                    </ul>
                )} */}
                 <ListGroup className="in-row">
                {results.map(({
                    display_name,
                    bio,
                    multimedia,
                    seo_name,

                }) => 
                    <ListGroupItem 
                        key={seo_name} 
                        className="in-row"
                    >
                        <h3>{display_name}</h3>
                        <div className="card-body">
                            <div className="image-critic">
                               {multimedia && <Image 
                                    className="img" 
                                    src={multimedia ? multimedia.resource.src : null}
                                    width={100}
                                    height={280}
                                />
                                }
                                {bio && <p>{bio}</p>}
                            </div>
                        </div>
                    </ListGroupItem>
                )}
            </ListGroup>
            </div>
         );
    }
}
 
export default Critics;