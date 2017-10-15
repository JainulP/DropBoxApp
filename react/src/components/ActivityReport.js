import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";

class ActivityReport extends Component {

    render(){
        return(
            <div className="main-wrapper" ref="myref">
                <NavigationBar></NavigationBar>
                <HomePageHeader></HomePageHeader>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Activities</div></div></div></h2>
                            </li>
                            <li>
                                <h2 className="home-access-section__header">
                                <div className="ue-effect-container">Activities</div>
                                </h2>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActivityReport;