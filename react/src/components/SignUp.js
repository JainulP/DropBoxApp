import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';

class SignUp extends Component {
    static propTypes = {
        //handleSignup: PropTypes.func.isRequired
    };

    state = {
        firstname: "",
        lastname: "",
        email:"",
        password:"",
        message:"",
        isFormValid: false
    };

    componentWillMount() {
        document.title = `Signup - Dropbox`;
        this.setState({
            firstname: "",
            lastname: "",
            email:"",
            password:"",
            message:"",
            isFormValid: false,
            firstnamerr: "",
            lastnameerr: "",
            emailerr:"",
            passworderr:""
        });
    }

    handleSignup = (userdata) => {
        // handleValidation(userdata) {
        //     console.log("Inside validation function" + userdata);
        //     var firstname = (userdata)["firstname"];
        //     var lastname = (userdata)["lastname"];
        //     var email = (userdata)["email"];
        //     var password = (userdata)["password"];
        //     var message1;
        //     var isFormValid1 = false;
        //     console.log("Firstname is" + firstname);
        //
        //     if (firstname == null || firstname == "") {
        //         // this.setState({
        //         //     isFormValid: false,
        //         //     message: "First name cannot be empty!"
        //         // });
        //         isFormValid1= false;
        //         message1=  "First name cannot be empty!";
        //         console.log(message1);
        //     }
        console.log("first"+userdata.firstname);
        if (userdata.firstname == null || userdata.firstname == "") {
            this.setState({
                isFormValid: false,
                firstnamerr: "First name cannot be empty!"
            });
            // isFormValid1= false;
            // message1=  "First name cannot be empty!";
            // console.log(message1);
        }
        else if(userdata.lastname == null || userdata.lastname == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr: "Last name cannot be empty!"
            });
        }
        else if(userdata.email == null || userdata.email == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr: "email cannot be empty!"
            });
        }
        // else if(userdata.email != null || userdata.email != ""){
        //     console.log("here");
        //     if(!userdata.email.match("/^[a-zA-Z]+$/")) {
        //         this.setState({
        //             isFormValid: false,
        //             firstnamerr: "",
        //             lastnameerr: "",
        //             emailerr: "Invalid Email!!"
        //         });
        //     }
        // }
        else if(userdata.password == null || userdata.password == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr:"",
                passworderr: "Password cannot be empty!"
            });
        }
        else if(userdata.password.length<5){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr:"",
                passworderr: "Password too short!!"
            });
        }
        else {

            console.log("form validity" + this.state.isFormValid);
            // if (this.state.isFormValid || this.state.isFormValid == "true") {
                API.doSignUp(userdata)
                    .then((status) => {
                        if (status === 201) {
                            this.setState({
                                isLoggedIn: true,
                                 message: "!",
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
            }
        //}

    };

    handleValidation(userdata) {
        console.log("Inside validation function" + userdata);
        var firstname = (userdata)["firstname"];
        var lastname = (userdata)["lastname"];
        var email = (userdata)["email"];
        var password = (userdata)["password"];
        var message1;
        var isFormValid1 = false;
        console.log("Firstname is" + firstname);

        if (firstname == null || firstname == "") {
            // this.setState({
            //     isFormValid: false,
            //     message: "First name cannot be empty!"
            // });
                isFormValid1= false;
                message1=  "First name cannot be empty!";
                console.log(message1);
        }
        // else if (typeof firstname !== "undefined") {
        //     console.log("first name not undefined");
        //     if (!firstname.match(/^[a-zA-Z]+$/)) {
        //         console.log("not matched");
        //         // this.setState({
        //         //     isFormValid: false,
        //         //     message: "First name should contain characters only!"
        //         // });
        //         isFormValid1= false;
        //         message1=  "First name should contain characters only!";
        //         console.log(message1);
        //     }
        //     console.log("first name not undefined11");
        // }
        //  else if (lastname == null || lastname == "") {
        //     console.log("last name not undefined");
        //     // this.setState({
        //     //     isFormValid: false,
        //     //     message: "Last name cannot be empty!"
        //     // });
        //     isFormValid1= false;
        //     message1=  "Last name cannot be empty!";
        //     console.log(message1);
        // }
        // else if (typeof lastname !== "undefined") {
        //     if (!lastname.match(/^[a-zA-Z]+$/)) {
        //         // this.setState({
        //         //     isFormValid: false,
        //         //     message: "Last name should contain characters only!"
        //         // });
        //         isFormValid1= false;
        //         message1=  "Last name should contain characters only!";
        //     }
        // }
        // else if (email == null || email == "") {
        //     // this.setState({
        //     //     isFormValid: false,
        //     //     message: "Email cannot be empty!"
        //     // });
        //     isFormValid1= false;
        //     message1=  "Email cannot be empty!";
        //     console.log(message1);
        //
        // }
        // else if (typeof email !== "undefined") {
        //     // var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //     if (!email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
        //         // this.setState({
        //         //     isFormValid: false,
        //         //     message: "Invalid Email Address!"
        //         // });
        //         isFormValid1= false;
        //         message1=  "Invalid Email Address!";
        //         console.log(message1);
        //     }
        // }
        //  else if (password == null || password == "") {
        //      // this.setState({
        //      //     isFormValid: false,
        //      //     message: "Password cannot be empty!"
        //      // });
        //     isFormValid1= false;
        //     message1=  "Password cannot be empty!";
        //     console.log(message1);
        //  }
        //  else if (password.length<5) {
        //      // this.setState({
        //      //     isFormValid: false,
        //      //     message: "Password cannot be empty!"
        //      // });
        //     isFormValid1= false;
        //     message1=  "Password too short!";
        //     console.log(message1);
        //  }
         else
         {
             console.log("Else executed");
             // this.setState({
             //     isFormValid: true,
             //     message: ""
             // });
             isFormValid1= true;
             message1=  "";
             console.log(message1);


         }
         console.log("j88888888888" + message1+ isFormValid1);
         this.setState({
             message: message1,
            isFormValid: isFormValid1
         },()=> {console.log("j8888888888811111" + this.state.message+ this.state.isFormValid)});

    }
    render() {
        return (
            <div>
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
                <div className="outer-frame">
                    <div className="page-content">
                        <div className="main-skip-destination">
                            <div className="login-or-register-page-content">
                                <div className="login-or-register-outer">
                                    <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" alt="" className="login-or-register-img"/>
                                    <div  id="pyxl3582989222650193393" className="login-register-container">
                                        <div className="clearfix">
                                            <div className="login-register-header">Create an account</div>
                                            <div className="login-register-switch">or <a href="/login" className="login-register-switch-link">login</a></div>
                                        </div>
                                        <div className="dummy-height"></div>
                                        <div className="login-form-container">
                                            <div className="login-form-container__google-div">
                                                {/*<div className="auth-google button-primary">*/}
                                                    {/*<div className="sign-in-text">Sign in with Google</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="hr-label"><span className="hr-label__text">or</span></div>*/}
                                                <div className="login-form-width">
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.firstnamerr}</span></font>

                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="text" name="login_firstname" id="pyxl8995788599097555052" placeholder="First name" onChange={event=>{this.setState({firstname:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.lastnameerr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="text" name="login_lastname" id="pyxl8995788599097555052" placeholder="Last name" onChange={event=>{this.setState({lastname:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.emailerr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="email" name="login_email" id="pyxl8995788599097555052" placeholder="Email" onChange={event=>{this.setState({email:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.passworderr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="password" name="login_password" id="pyxl8995788599097555052" placeholder="Password" onChange={event=>{this.setState({password:event.target.value});}}/>
                                                    </div>
                                                    <div className="clearfix">
                                                        <button type="submit" className="login-button button-primary" onClick={()=>this.handleSignup(this.state)}><div className="sign-in-text">Create an account</div><div className="sso-text">Continue</div></button>                                    </div>
                                                </div>
                                                <div className="hr-label"><span className="hr-label__text">or</span></div>
                                                <div className="auth-google button-primary">
                                                    <div className="sign-in-text">Sign in with Google</div>
                                                </div>
                                                <div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<Message message={this.state.message}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            {/*<div className="row justify-content-md-center">*/}
                {/*<div className="col-md-3">*/}
                    {/*<form>*/}
                        {/*<div className="form-group">*/}
                            {/*<h1>Create an account</h1>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                            {/*<input*/}
                                {/*className="form-control"*/}
                                {/*type="text"*/}
                                {/*label="firstname"*/}
                                {/*placeholder="First name"*/}
                                {/*value={this.state.firstname}*/}
                                {/*onChange={event => {*/}
                                    {/*this.setState({*/}
                                        {/*firstname: event.target.value*/}
                                    {/*});*/}
                                {/*}}*/}
                            {/*/>*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                            {/*<input*/}
                                {/*className="form-control"*/}
                                {/*type="text"*/}
                                {/*label="lastname"*/}
                                {/*placeholder="Last name"*/}
                                {/*value={this.state.lastname}*/}
                                {/*onChange={event => {*/}
                                    {/*this.setState({*/}
                                        {/*lastname: event.target.value*/}
                                    {/*});*/}
                                {/*}}*/}
                            {/*/>*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                            {/*<input*/}
                                {/*className="form-control"*/}
                                {/*type="email"*/}
                                {/*label="email"*/}
                                {/*placeholder="Email"*/}
                                {/*value={this.state.email}*/}
                                {/*onChange={event => {*/}
                                    {/*this.setState({*/}
                                        {/*email: event.target.value*/}
                                    {/*});*/}
                                {/*}}*/}
                            {/*/>*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                            {/*<input*/}
                                {/*className="form-control"*/}
                                {/*type="password"*/}
                                {/*label="password"*/}
                                {/*placeholder="Password"*/}
                                {/*value={this.state.password}*/}
                                {/*onChange={event => {*/}
                                    {/*this.setState({*/}
                                        {/*password: event.target.value*/}
                                    {/*});*/}
                                {/*}}*/}
                            {/*/>*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                            {/*<input checked="checked" type="checkbox"  name="remember_me"/>*/}
                            {/*<label className="checkbox_label">I agree to Dropbox terms.</label>*/}
                            {/*<button*/}
                                {/*className="btn btn-primary"*/}
                                {/*type="button"*/}
                                {/*onClick={() => this.props.handleSignup(this.state)}*/}
                            {/*>*/}
                                {/*Create an account*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    {/*</form>*/}
                {/*</div>*/}
            {/*</div>*/}
            </div>

        );
    }
}

export default withRouter(SignUp);
