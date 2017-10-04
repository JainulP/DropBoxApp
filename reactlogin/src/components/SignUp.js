import React, { Component } from "react";
import PropTypes from "prop-types";

class SignUp extends Component {
    static propTypes = {
        handleSignup: PropTypes.func.isRequired
    };

    state = {
        firstname: "",
        lastname: "",
        email:"",
        password:""
    };

    componentWillMount() {
        this.setState({
            firstname: "",
            lastname: "",
            email:"",
            password:""
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="First name"
                                value={this.state.firstname}
                                onChange={event => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="Last name"
                                value={this.state.lastname}
                                onChange={event => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                label="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={event => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
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
                                onClick={() => this.props.handleSignup(this.state)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default SignUp;
