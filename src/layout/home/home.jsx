import React, { Component, Fragment } from 'react'
import { Conf } from '../../Conf/path'
import { REVIEWSORT } from '../../Conf/config'

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
        critics: {},
        name: '',
        suggestions: [],
        dateStart: '',
        dateEnd: '',
    }

    componentDidMount(){
        const { BASE_PATH, API_KEY, MY_API_KEY } = Conf

        let url2 = `${BASE_PATH}critics/all.json?${API_KEY}${MY_API_KEY}`

        this.fetchData(this.getMainURL(), 'res')
        this.fetchData(url2, 'critics')
    }

    getMainURL = () => {
        const { BASE_PATH, API_KEY, MY_API_KEY, PAGE, ORDER, REVIEWER, SEARCH, PICKS, OPENING_DATE } = Conf
        const { page, order, name, dateStart, dateEnd } = this.state
// 
        let opening_date = dateStart && dateEnd ? `&${OPENING_DATE}${dateStart};${dateEnd}` : ''

        let url = `${BASE_PATH}reviews/${name ? SEARCH : PICKS}?${name && REVIEWER}${name}&${API_KEY}${MY_API_KEY}&${PAGE}${page*20}&${ORDER}${order}${opening_date}`
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
        this.fetchData(this.getMainURL(), 'res')
    }

    setDate = ({ target }) => {
        const value = target.value
        const inputType = target.getAttribute('data-name')
        this.setState({
            [inputType]: value
        }, () => {
            this.fetchData(this.getMainURL(), 'res')
        })
    }

    render() {
        
        const { results = [], has_more = true } = this.state.res
        const { page, order, critics, dateStart, dateEnd } = this.state
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
                <Input 
                    id="date"
                    data-name="dateStart"
                    label="Start date"
                    value={dateStart}
                    onChange={this.setDate}
                    type="date"
                />
                <Input 
                    id="date"
                    data-name="dateEnd"
                    label="End date"
                    value={dateEnd}
                    onChange={this.setDate}
                    width="200px"
                    type="date"
                />
                <AutoCompleteWraper>
                    <Input
                        id="critic-names"
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
