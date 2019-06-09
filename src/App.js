import React , { Fragment, Component }from 'react';
import Navigation from './layout/navigation/navigation'
import './App.css';

import Main from './layout/main/main'
import Footer from './layout/footer/footer'

// const App = ({ children }) => {
class App extends Component {
  render(){
    return (
      <Fragment>
        <Navigation />
        <Main>
          {this.props.children}
        </Main>
        <Footer />
      </Fragment>
      
    )
  }
}

export default App;
