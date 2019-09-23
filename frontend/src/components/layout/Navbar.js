import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand col-5 arial-header text-white justify-content-center">
          <Link to="/">
            <i className="material-icons">code</i>
            <span style={{ verticalAlign: "middle" }}>Course Review</span>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;