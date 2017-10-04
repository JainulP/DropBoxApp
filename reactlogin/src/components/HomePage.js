import React, { Component } from "react";
import { Route, withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import NavigationBar from "./NavigationBar";
import  Modal from 'react-bootstrap';

class HomePage extends Component{
    render() {
        return (
            <div>
<NavigationBar/>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLabel">
            Launch demo modal
        </button>

        </div>
        );
    }
}

export default HomePage;