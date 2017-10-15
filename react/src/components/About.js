import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";

class About extends Component {


    constructor() {
        super();
        this.state = {
            userdetails: []
        };
    }
    componentWillMount() {

            API.getUserAbout(localStorage.getItem("username"))
                .then((data) => {
                    // if (this.refs.myref) {
                        this.setState({
                            userdetails: data
                        });
                    //}
                });





    };
    render(){
        return(
            <div className="main-wrapper" ref="myref">
                <NavigationBar></NavigationBar>
                <HomePageHeader head={"Overview"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.userdetails.map(detail => (
                            <li>
                                <h2 className="home-access-section__header">
                                <div className="ue-effect-container">{detail.overview}</div>
                                </h2>
                            </li>

                                ))}
                        </ul>
                    </div>
                </div>
                <HomePageHeader head={"Work"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.userdetails.map(detail => (
                                <li>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container">Companies: {detail.work}</div>
                                    </h2>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
                <HomePageHeader head={"Education"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.userdetails.map(detail => (
                                <li>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container"> {detail.education}</div>
                                    </h2>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
                <HomePageHeader head={"Contact"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.userdetails.map(detail => (
                                <li>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container">Phone Number: {detail.contactnumber}</div>
                                    </h2>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container">Other Email: {detail.otheremail}</div>
                                    </h2>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;