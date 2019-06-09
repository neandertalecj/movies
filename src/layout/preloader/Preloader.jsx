import React, { Component } from 'react'
import './Preloader.css'

const isEmpty = (prop) => (
    prop === null ||
    prop === undefined ||
    (prop.hasOwnProperty('length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
)

const Loading = (loadingProp) => (WraperComponent) => {
    return class LoadingHOC extends Component {
        render() {
            console.log(this.props.data)
            return isEmpty(this.props[loadingProp]) 
              ? <div className="loader-container">
                    <div className="loader" />
                </div>
              : <WraperComponent {...this.props} />
        }
    }
}

export default Loading