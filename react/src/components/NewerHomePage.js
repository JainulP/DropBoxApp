import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import HomePage from "./HomePage";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };


    handleLogin = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        // message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    localStorage.setItem("username",this.state.username);
                    this.props.history.push("/home");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleSignup = (userdata) => {
        API.doSignUp(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        // message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/login");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

// {/*<div>*/}
// {/*<Message message="You have landed on my App !!"/>*/}
// {/*<button className="btn btn-success" onClick={() => {*/}
// {/*this.props.history.push("/login");*/}
// {/*}}>*/}
// {/*Login*/}
// {/*</button>*/}
// {/*</div>*/}


    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div>
                    <Login handleLogin={this.handleLogin}/>
                    <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleLogin={this.handleLogin}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/welcome" render={() => (
                    <Welcome username={this.state.username}/>
                )}/>
                <Route path="/signup" render={() => (
                    <SignUp handleSignup = {this.handleSignup}/>
                )}/>
                <Route exact path="/home" render={() => (

                    <div>
                        <HomePage handleLogout={this.handleLogout} username={this.state.username}/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);