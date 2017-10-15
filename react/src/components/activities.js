import React, { Component } from "react";
import '.././CSS/homeHead.css';
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";


class activities extends Component {
    render() {
        return (
            <div className="main-body-wrapper-activites" ref="myref">
                <NavigationBar></NavigationBar>
                <HomePageHeader></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content">
                        <ul className="home-access-sections">
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Shared with meActivities</div></div></div></h2>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default activities;