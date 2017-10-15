import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";

class Interests extends Component {


    constructor() {
        super();
        this.state = {
            interests: []
        };
    }
    componentWillMount() {

            API.getUserInterests(localStorage.getItem("username"))
                .then((data) => {
                    // if (this.refs.myref) {
                        this.setState({
                            interests: data
                        });
                    //}
                });





    };
    render(){
        return(
            <div className="main-wrapper" ref="myref">
                <NavigationBar></NavigationBar>
                <HomePageHeader head={"Music"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.interests.map(interest => (
                            <li>
                                <h2 className="home-access-section__header">
                                <div className="ue-effect-container">{interest.music}</div>
                                </h2>
                            </li>

                                ))}
                        </ul>
                    </div>
                </div>
                <HomePageHeader head={"Shows"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.interests.map(interest => (
                                <li>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container"> {interest.shows}</div>
                                    </h2>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
                <HomePageHeader head={"Sports"}></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.interests.map(interest => (
                                <li>
                                    <h2 className="home-access-section__header">
                                        <div className="ue-effect-container"> {interest.sports}</div>
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

export default Interests;