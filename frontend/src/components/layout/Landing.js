import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container" style={{ height: "75vh" }}>
        <div className="row vertical-center d-flex justify-content-center jumbotron">
          <div className="col-12 text-center">
            <h1 className="display-4">Course Review</h1>
            <p className="lead">All the infomation you need for choosing your courses in one place!</p>
          </div>
          <div className="col-6 text-right">
            <Link to="/register" className="btn btn-outline-dark btn-lg">
              Register
            </Link>
          </div>
          <div class="col-6 text-left">
            <Link to="/login" className="btn btn-outline-dark btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

