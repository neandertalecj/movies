import React, { Component, Fragment } from 'react'
import { Conf } from '../../Conf/path'
import { REVIEWSORT, TYPE } from '../../Conf/config'

import Pagination from '../pagination/Pagination'
import Content from './content'
import Select from '../../components/select/Select'

import './home.css'

// import Loading from '../preloader/Preloader'
// const ContentHome = Loading('res')(Content)

class Home extends Component {
    state = {
        res:  {},
        page: 0,
        order: '',
        type: 'picks',
        criticNames: {},
        name: ''
    }

    componentDidMount(){
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER } = Conf
        const { page, order, type, name } = this.state

        let url1 = `${BASE_PATH}reviews/${type}.json?${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}`
        let url2 = `${BASE_PATH}critics/all.json?${API_KEY}${MY_API_KEY}`
        // let url3 =  `${BASE_PATH}reviews/${name}.json?${API_KEY}${MY_API_KEY}`

        this.fetchData(url1, 'res')
        // name && 
        this.fetchData(url2, 'criticNames')
    }

    fetchData = (url, value) => {

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({ [value]: res })
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
        this.setState({
            page: number,
        }, () => {
            this.fetchData(number)
        })
    }

    setOrder = ({ target: { value }}) => {
        this.setState({
                order: value, 
                page: 0 
            },
            () => this.fetchData(0, this.state.order)
        )
    }

    setType = ({ target: { value }}) => {
        this.setState({
                type: value, 
                page: 0 
            },
            () => this.fetchData(0, this.state.type)
        )
    }

    render() {
        
        const { results = [], has_more = true } = this.state.res
        const { page, order, type, criticNames } = this.state
        console.log(results)
        console.log('has_more', has_more) 
        console.log('criticNames', criticNames)
        return (
            <Fragment>
                <Select
                    onChange={this.setOrder} 
                    value={order} 
                    filter={REVIEWSORT}
                />
                <Select
                    onChange={this.setType} 
                    value={type} 
                    filter={TYPE}
                />
                <Content res={this.state.res} />
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
