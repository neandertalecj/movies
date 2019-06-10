import React, { Component, Fragment } from 'react'
import { Conf }from '../../Conf/path'
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
    }

    componentDidMount(){
        const { page, order } = this.state
        this.fetchData(page, order)
    }

    fetchData = (page, order) => {
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER } = Conf
        let url = `${BASE_PATH}reviews/picks.json?${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}`

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
        this.setState({
            page: number,
        }, () => {
            this.fetchData(number)
        })
    }

    setOrder = ({ target: { value }}) => {
    //     const { searchQuery }  = this.state
        this.setState({
                order: value, 
                page: 0 
            },
            () => this.fetchData(0, this.state.order)
        )
    }

    render() {
        
        const { results = [], has_more = true } = this.state.res
        const { page, order } = this.state
        console.log(results)
        console.log('has_more', has_more) 
        return (
            <Fragment>
                <Select onChange={this.setOrder} value={order}/>
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
