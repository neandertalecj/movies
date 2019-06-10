import React, { Component } from 'react'
import { HITS } from '../../Conf/config'

import './Select.css'

class Select extends Component {
    render() { 
        const { onChange, value } = this.props
        return (
            <select onChange={onChange} value={value}>
                {HITS.map(({ value, label }) =>
                    <option key={value} value={value}>{label}</option>)}
            </select>
        )
    }
}
 
export default Select