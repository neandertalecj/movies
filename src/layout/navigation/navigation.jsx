import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => (
  <div className="navigation">
    <nav>
      <div className="logo"> 
        <NavLink exact to="/">
          <FontAwesomeIcon icon={faFilm} />
        </NavLink>
      </div>
      <ul className="nav">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/critics">Critics</NavLink></li>
        <li><NavLink to="/hellopage">Hello</NavLink></li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
