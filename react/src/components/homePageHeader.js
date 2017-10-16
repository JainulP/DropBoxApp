import React, { Component } from "react";
import * as API from '../api/API';
import '.././CSS/homeHead.css';
import { withRouter } from 'react-router-dom';

class HomePageHeader extends Component{

    constructor() {
        super();
        this.state = {
            username : ''
        };
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = (event) => {
        console.log("handle log out called");
        localStorage.clear();
        this.setState({
            username: ""
        });
        console.log("afterlogout"+localStorage.getItem("username"));
        API.logout()
            .then((status) => {
                this.props.history.push("/login");
            });
    };

    render()
    {
        return(
            <div className="page-header__shadow">
                <div className="page-header">
                    <div className="page-header__title">
                        <h1 className="page-header__heading">{this.props.head}</h1>
                    </div>
                    <div className="top-menu-container"></div>
                    <div className="search-bar--container u-l-fr">
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={this.handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  withRouter(HomePageHeader);