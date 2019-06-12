import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Select.css'

class Select extends Component {
    render() { 
        const { onChange, value, filter } = this.props
        return (
            <select onChange={onChange} value={value}>
                {filter.map(({ value, label }) =>
                    <option 
                        key={value} 
                        value={value}
                    >
                        {label}
                    </option>)}
            </select>
        )
    }
}

Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    filter: PropTypes.array,
}

Select.defaultProps = {
    onChange: () => {},
    value: '',
    filter: [],
}
 
export default Select