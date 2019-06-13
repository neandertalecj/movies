import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Input.css'

const Input = ({
  id, className, label, error, value, onChange, onKeyUp, ...attrs
}) => {
  const classes = classNames(
    'input',
    className,
    { error },
  )

  return (
    <div className="inputWrapper">
      <div className="labelsWrapper">
        {label
          && <label className="inputLabel" htmlFor={id}>{label}</label>
        }
        {attrs.required
          && <span className="inputRequired">Required</span>
        }
      </div>
      <input
        name={id}
        id={id}
        className={classes}
        {...attrs}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />
      {error
        && <span className="inputError">{error}</span>
      }
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
}

Input.defaultProps = {
  className: '',
  label: '',
  error: '',
  onChange: () => {},
  onKeyUp: () => {},
  value: ''
}

export default Input