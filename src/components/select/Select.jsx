import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './Select.css'

class Select extends Component {
    render() { 
        const { onChange, value, filter, title } = this.props
        return (
            <div className="select">
                <p>{title}</p>
                <select onChange={onChange} value={value}>
                    {filter.map(({ value, label }) =>
                        <option 
                            key={value} 
                            value={value}
                        >
                            {label}
                        </option>)}
                </select>
            </div>
        )
    }
}

Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    filter: PropTypes.array,
    title: PropTypes.string,
}

Select.defaultProps = {
    onChange: () => {},
    value: '',
    filter: [],
    title: '',
}
 
export default Select