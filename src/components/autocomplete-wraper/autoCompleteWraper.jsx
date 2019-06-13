import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './autoCompleteWraper.css'

const AutoCompleteWraper = ({
    children, className,  ...attrs 
}) => {

    const classes = classNames(
        'autocomplete-wraper',
        classNames,
    )

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

AutoCompleteWraper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

AutoCompleteWraper.defaultProps = {
    children: null,
    className: '',
}

export default AutoCompleteWraper

