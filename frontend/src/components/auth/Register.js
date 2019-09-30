import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-md-2">
            <Link to="/" className="btn">
              <i className="material-icons">keyboard_backspace</i>
              Back to home
            </Link>
            <div className="col-8" 
              style={{ 
                paddingLeft: "30px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }}>
              <h1 className="arial-header1">Register</h1>
              <p className="text-secondary">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form className="col-8">
              <div className="form-group" style={{ paddingLeft: "15px" }}>
                <label htmlFor="name">Full Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  className={classnames("form-control", {
                    invalid: errors.name
                  })}
                />
                <span className="text-danger">{errors.name}</span>
              </div>
              <div className="form-group" style={{ paddingLeft: "15px" }}>
                <label htmlFor="email">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className={classnames("form-control", {
                    invalid: errors.email
                  })}
                />
                <span className="text-danger">{errors.name}</span>
              </div>
              <div className="form-group" style={{ paddingLeft: "15px" }}>
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                />
                <span className="text-danger">{errors.password}</span>
              </div>
              <div className="form-group" style={{ paddingLeft: "15px" }}>
                <label htmlFor="password2">Confirm Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="password2"
                  type="password"
                  placeholder="Confirm password"
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                />
                <span className="text-danger">{errors.password2}</span>
              </div>
              <div className="col-12" style={{ paddingLeft: "12.5px" }}>
                <button type="submit" className="btn btn-outline-dark">
                  Sign-Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));