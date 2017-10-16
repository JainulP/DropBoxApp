import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import ActivityReport from "./ActivityReport";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import activities from "./activities";
import DirectoryFile from "./DirectoryFile";
import About from "./About";
import Interests from "./Interests";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        messageemail: '',
        messagepwd: '',
        message:'',
        username: '',
        isFormValid :false
    };


    handleLogin = (userdata) => {

        {
            console.log("login clicked"+userdata.username);
            if(userdata.username == null || userdata.username == "")
            {
                this.setState({
                    isLoggedIn: false,
                    messageemail: "Please enter an email",
                    messagepwd: "",
                    message:""
                });
            }
            // else if(userdata.username != null || userdata.username != "") {
            //     var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            //     console.log("Patter Email" + emailRegex.test(userdata.username));
            //     if (!emailRegex.test(userdata.email)) {
            //         this.setState({
            //             isLoggedIn: false,
            //             messageemail: "Invalid Email!",
            //             messagepwd: "",
            //             message:""
            //         });
            //     }
            // }
            else if(userdata.password == null || userdata.password == "")
            {
                this.setState({
                    isLoggedIn: false,
                    messagepwd: "Please enter password",
                    messageemail: "",
                    message: ""
                });
            }

            else
            {
                API.doLogin(userdata)
                    .then((status) => {
                        if (status === 201) {
                            this.setState({
                                isLoggedIn: true,
                                // message: "Welcome to my App..!!",
                                username: userdata.username
                            }, ()=> {localStorage.setItem("username",this.state.username);
                                this.props.history.push("/home");});
                            // localStorage.setItem("username",this.state.username);
                            // this.props.history.push("/home");
                        } else if (status === 401) {
                            this.setState({
                                isLoggedIn: false,
                                message: "Wrong username or password. Try again..!!",
                                messageemail: "",
                                messagepwd: ""
                            });
                        }
                    });
            }
        }

    };

    // handleSignup = (userdata) => {
    //     this.handleValidation(userdata);
    //     console.log("form validity"+ this.state.isFormValid);
    //     if(this.state.isFormValid) {
    //         API.doSignUp(userdata)
    //             .then((status) => {
    //                 if (status === 201) {
    //                     this.setState({
    //                         isLoggedIn: true,
    //                         // message: "Welcome to my App..!!",
    //                         username: userdata.username
    //                     });
    //                     this.props.history.push("/login");
    //                 } else if (status === 401) {
    //                     this.setState({
    //                         isLoggedIn: false,
    //                         message: "Wrong username or password. Try again..!!"
    //                     });
    //                 }
    //             });
    //     }
    // };

    // handleValidation(userdata) {
    //     console.log("Inside validation function"+userdata);
    //     var firstname= (userdata)["firstname"];
    //     var lastname = (userdata)["lastname"];
    //     var email = (userdata)["email"];
    //     var password = (userdata)["password"];
    //     console.log("Firstname is"+ firstname+lastname+email+password);
    //
    //     if(firstname == null || firstname == "")
    //     {
    //         this.setState({
    //             isFormValid: false,
    //             message : "First name cannot be empty!"
    //     });
    //
    //     }
    //      else if (typeof firstname !== "undefined") {
    //         console.log("first name not undefined");
    //         if (!firstname.match(/^[a-zA-Z]+$/)) {
    //             console.log("not matched");
    //             this.setState({
    //                 isFormValid: false,
    //                 message: "First name should contain characters only!"
    //             });
    //         }
    //     }
    //     else if(lastname == null || lastname == "")
    //     {
    //         console.log("first name not undefined");
    //         this.setState({
    //             isFormValid: false,
    //             message : "Last name cannot be empty!"
    //         });
    //
    //     }
    //     else if (typeof lastname !== "undefined") {
    //         if (!lastname.match(/^[a-zA-Z]+$/)) {
    //             this.setState({
    //                 isFormValid: false,
    //                 message: "Last name should contain characters only!"
    //             });
    //         }
    //     }
    //     else if(email == null || email == "")
    //     {
    //         this.setState({
    //             isFormValid: false,
    //             message : "Email cannot be empty!"
    //         });
    //
    //     }
    //     else if (typeof email !== "undefined") {
    //         // var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //         if(!email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/))
    //         {
    //                 this.setState({
    //                     isFormValid: false,
    //                     message: "Invalid Email Address!"
    //                 });
    //         }
    //
    //         // let lastAtPos = email.lastIndexOf('@');
    //         // let lastDotPos = email.lastIndexOf('.');
    //         // if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //         //     this.setState({
    //         //         isFormValid: false,
    //         //         message: "Last name should contain characters only!"
    //         //     });
    //         // }
    //     }
        // let fields = this.state.fields;
        // let errors = {};
        // let formIsValid = true;
        //
        // //Name
        // if (!fields["name"]) {
        //     formIsValid = false;
        //     errors["name"] = "Cannot be empty";
        // }
        //
        // if (typeof fields["name"] !== "undefined") {
        //     if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        //         formIsValid = false;
        //         errors["name"] = "Only letters";
        //     }
        // }
        //
        // //Email
        // if (!fields["email"]) {
        //     formIsValid = false;
        //     errors["email"] = "Cannot be empty";
        // }
        //
        // if (typeof fields["email"] !== "undefined") {
        //     let lastAtPos = fields["email"].lastIndexOf('@');
        //     let lastDotPos = fields["email"].lastIndexOf('.');
        //
        //     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        //         formIsValid = false;
        //         errors["email"] = "Email is not valid";
        //     }
        // }
   // }
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
                        <Login handleLogin={this.handleLogin} message={this.state.message} messageemail={this.state.messageemail} messagepwd={this.state.messagepwd}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/activityReport" render={() => (
                    <ActivityReport/>
                )}/>
                <Route path="/signup" render={() => (
                    <div>
                    <SignUp handleSignup = {this.handleSignup} />
                    {/*<Message message={this.state.message}/>*/}
                    </div>
                )}/>
                <Route exact path="/about" render={() => (
                    <About/>
                )}/>

                <Route exact path="/interests" render={() => (
                    <Interests/>
                )}/>
                <Route exact path="/home" render={() => (

                    <div>
                        <HomePage handleLogout={this.handleLogout} username={this.state.username}/>
                    </div>
                )}/>
                {/*<Route exact path="/directoryfiles" render={() => (*/}
                    {/*<DirectoryFile filesUnderDir = {this.state.filesUnderDir}/>*/}
                {/*)}/>*/}
            </div>
        );
    }
}

export default withRouter(NewerHomePage);