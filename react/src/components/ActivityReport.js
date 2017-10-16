import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import NavigationBar from "./NavigationBar";
import Pageheaders from "./Pageheaders";

class ActivityReport extends Component {


    constructor() {
        super();
        this.state = {
            activities: []
        };
    }
    componentWillMount() {



            API.getActivityReport(localStorage.getItem("username"))
                .then((data) => {console.log("initial activity"+data);
                    // if (this.refs.myref) {
                        this.setState({
                            activities: data
                        });
                    //}
                });





    };
    render(){
        return(
            <div className="main-wrapper" ref="myref">
                <NavigationBar></NavigationBar>
                <Pageheaders head={"Activity Report"}></Pageheaders>
                <div className="main-body-wrapper">
                    <div className="maestro-app-content-activites">
                        <ul className="home-access-sections">
                            {this.state.activities.map(activity => (
                            <li>
                                <h2 className="home-access-section__header">
                                <div className="ue-effect-container">{activity.event} at {activity.time}</div>
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

export default ActivityReport;