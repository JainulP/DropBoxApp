import React, { Component } from "react";
import * as API from '../api/API';
import '.././CSS/homeHead.css';
import { withRouter } from 'react-router-dom';

class PageHeaders extends Component{

    constructor() {
        super();
        this.state = {
            username : ''
        };

    }


    render()
    {
        return(
            <div className="page-header__shadow">
                <div className="page-header">
                    <div className="page-header__title">
                        <h1 className="page-header__heading">{this.props.head}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default  withRouter(PageHeaders);