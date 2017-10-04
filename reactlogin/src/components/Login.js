import React, { Component } from "react";
import { Route, withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import '.././CSS/login.css';
import SignUp from "./SignUp";

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  state = {
    username: "",
    password: ""
  };

  componentWillMount() {
    this.setState({
      username: "",
      password: ""
    });
  }

  render() {
    return (

    <div className="row justify-content-md-center">
      <header className="mast-head">
        <div className="mast-head__container container">
          <nav className="mast-head__nav mast-head-nav">
            <ul className="nav-list">
              <li className="nav-list__item nav-list__item--dfb"><a href="/business" id="try-dfb" className="button-tertiary try-dfb">Try Dropbox Business</a></li>
            </ul>
            <ul className="nav-list">
              <li className="nav-list__item nav-list__item--download"><a href="/downloading?src=index" className="button-link">Download the app</a></li>
            </ul>
          </nav>
          <h1 id="dropbox-logo" className="dropbox-logo"><a href="/" className="dropbox-logo__link"><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" alt="" className="dropbox-logo__glyph"/><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" alt="" className="dropbox-logo__type"/>Dropbox</a></h1>
        </div>
      </header>
      <div className="col-md-3">
          <form>
            <div className="form-group">
              <h1>Sign In</h1>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                label="Username"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={event => {
                  this.setState({
                    username: event.target.value
                  });
                }}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                label="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={event => {
                  this.setState({
                    password: event.target.value
                  });
                }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.props.handleSubmit(this.state)}
              >
                Sign In
              </button>
            </div>
            <div className="form-group">
              <Link to="/signup">
                create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// export default Login;
export default withRouter(Login);