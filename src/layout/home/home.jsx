import React, { Component, Fragment } from 'react'
import './home.css'
// import classNames from 'classnames'
// import moment from 'moment'

import { Conf }from '../../Conf/path'
// import Image from '../../components/Image/Image'
// import ListGroup from '../../components/ListGroup/ListGroup'
// import ListGroupItem from '../../components/ListGroup/ListGroupItem'
import Pagination from '../pagination/Pagination'
import Loading from '../preloader/Preloader'
import Content from './content'

const ContentHome = Loading('res')(Content)

class Home extends Component {
    state = {
        res:  {},
        page: 0,
    }

    componentDidMount(){
        const { page } = this.state
        this.fetchData(page)
    }

    fetchData = (page) => {
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE } = Conf
        let url = `${BASE_PATH}reviews/picks.json?${API_KEY}${MY_API_KEY}&${PAGE}${page*20}`

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({ res })
            })
            .catch(err => { throw err })
    }

    handlePageChange = ({ target }) => {
        const btnType = target.getAttribute('data-name')
        let { page } = this.state
        console.log(typeof btnType, typeof page)
        if(!isNaN(btnType)) {
            this.updatePage(+btnType)
          } else {
            switch (btnType) {
                case 'next':
                this.updatePage(page + 1)
                break
                case 'prev':
                this.updatePage(page - 1)
                break
                default: null /* eslint-disable-line */
            }
        }
    }

    updatePage = (number) => {
        // const { searchQuery, hitsPerPage } = this.state
        this.setState({
            page: number,
        }, () => {
            this.fetchData(number)
        })
    }

    render() {
        
        const { results = [], has_more = true } = this.state.res
        const { page } = this.state
        console.log(results)
        console.log('has_more', has_more) 
        return (
            <Fragment>
                <ContentHome res={this.state.res} />
                <Pagination 
                    page={page} 
                    hasMore={has_more}
                    onClick={this.handlePageChange}
                />
            </Fragment>
        )
    }
}

export default Home
