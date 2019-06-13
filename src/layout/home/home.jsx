import React, { Component, Fragment } from 'react'
import { Conf } from '../../Conf/path'
import { REVIEWSORT, TYPE } from '../../Conf/config'

import Pagination from '../pagination/Pagination'
import Content from './content'
import Select from '../../components/select/Select'
import Input from '../../components/input/Input'
import AutoCompleteWraper from '../../components/autocomplete-wraper/autoCompleteWraper'
import Button from '../../components/button/Button'

import './home.css'

class Home extends Component {
    state = {
        res:  {},
        page: 0,
        order: '',
        // type: 'picks',
        critics: {},
        name: '',
        suggestions: [],
    }

    componentDidMount(){
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER, REVIEWER, SEARCH, PICKS } = Conf
        const { page, order, type, name } = this.state

        // let url1 = `${BASE_PATH}reviews/${type}.json?${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}`
        let url2 = `${BASE_PATH}critics/all.json?${API_KEY}${MY_API_KEY}`

        // let url8 = `${BASE_PATH}reviews/search.json?${REVIEWER}${name}&${API_KEY}${MY_API_KEY}`
        // let url18 = `${BASE_PATH}reviews/${name ? SEARCH : PICKS}?${name && REVIEWER}${name}&${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}`

        this.fetchData(this.getMainURL(), 'res')
        this.fetchData(url2, 'critics')
    }

    getMainURL = () => {
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER, REVIEWER, SEARCH, PICKS } = Conf
        const { page, order, type, name } = this.state

        let url = `${BASE_PATH}reviews/${name ? SEARCH : PICKS}?${name && REVIEWER}${name}&${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}`
        return url
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
            this.fetchData(this.getMainURL(), 'res')
        })
    }

    setOrder = ({ target: { value }}) => {
        this.setState({
                order: value, 
                page: 0 
            },
            () => this.fetchData(this.getMainURL(), 'res')
        )
    }

    // setType = ({ target: { value }}) => {
    //     this.setState({
    //             type: value, 
    //             page: 0 
    //         },
    //         () => this.fetchData(0, this.state.type)
    //     )
    // }
    // ---- AutoComplete functioality
    onTextChanged = e => {
        const value = e.target.value
        let suggestions = []
        if (value.length > 0) {
            const regex = new RegExp(` ${value}`, 'igm')
            suggestions = this.getSeggestions().sort().filter(v => regex.test(v))
        }
        this.setState(() => ({ 
            suggestions,
            name: value
        }))
    }

    suggestionSelected = value => {
        this.setState(() => ({
            name: value,
            suggestions: [],
        }))
    }

    renderSuggestion() {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        }
        return (
            <ul>
                {suggestions.map(item => 
                    <li onClick={() => this.suggestionSelected(item)}>{item}</li>
                )}
            </ul>
        )
    }

    getSeggestions = () => 
        this.state.critics.results.reduce((acc, cur) => ([...acc, cur.display_name]), [])
    
    // ---- The END of AutoComplete functioality

    getReviewsByCriticsName = () => {
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER, REVIEWER } = Conf
        const { name } = this.state
        // if (e.keyCode == 13 && name.length > 0) {
        //     e.preventDefault()
        //     e.stopPropagation()

            let url = `${BASE_PATH}reviews/search.json?${REVIEWER}${name}&${API_KEY}${MY_API_KEY}`
            this.fetchData(url, 'res')
        // }
        
    }

    render() {
        
        const { results = [], has_more = true } = this.state.res
        const { page, order, type, critics } = this.state
        console.log(results)
        console.log('has_more', has_more) 
        console.log('critics', critics)
        return (
            <Fragment>
                <Select
                    onChange={this.setOrder} 
                    value={order} 
                    filter={REVIEWSORT}
                />
                {/* <Select
                    onChange={this.setType} 
                    value={type} 
                    filter={TYPE}
                /> */}
                <AutoCompleteWraper>
                    <Input
                        value={this.state.name}
                        onChange={this.onTextChanged}
                        type="text"
                        label="Get all movie reviews by critic names"
                        // onKeyUp={(e)=>this.getReviewsByCriticsName(this.state.name)}
                    />
                    <Button 
                        onClick={this.getReviewsByCriticsName}
                    >Submit</Button>
                    {this.renderSuggestion()}
                </AutoCompleteWraper>
                
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
