import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";
import PropTypes from "prop-types";
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import {Popover} from "react-bootstrap";
import {Tooltip} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import '.././CSS/homePage.css';

// import {DatePicker,RaisedButton,action} from 'material-ui';

class DirectoryFile extends Component{

    static propTypes = {
       // username: PropTypes.string,
        //handleLogout: PropTypes.func,

    };

    constructor() {
        super();
        this.state = {
            username : '',
            files: [],
            dirName:'',
            groupName:'',
            open: false,
            isDir: false,
            sharedfiles:[]
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (event) => {
        console.log("handle log out called");
        localStorage.clear();
        console.log("afterlogout"+localStorage.getItem("username"));
        API.logout()
            .then((status) => {
                this.props.history.push("/login");
            });
    };

    handleFileUpload = (event) => {
        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });

    };

    handleStar = (payload) => {
        console.log("Handle Star"+JSON.stringify(payload));
        API.toggleStar(payload)
            .then((status) => {
                console.log("star executed" + status);

                API.getImages()
                    .then((data) => {
                        this.setState({
                            files: data
                        });
                    });

            });

    };

    handleDelete = (event,param) => {

        API.deleteIt(param)
            .then((status) => {
                console.log("delete executed" + status);

                API.getImages()
                    .then((data) => {
                        this.setState({
                            files: data
                        });
                    });

            });

    };

    handleMakeDir = (data) => {
        API.doMakeDir(data)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });
    };


    handleFileUploadUnderDir = (event) => {
        const payload = new FormData();

        payload.append(this.state.dirPath, event.target.files[0]);

        console.log("Jainul"+ this.state.dirPath);
        API.uploadFileUnderDir(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });

    };

    componentWillMount() {

        var username = localStorage.getItem("username");
        console.log("username"+username);
        if(username == null)
        {
            this.props.history.push("/login");
        }
        else {
            API.setLoggedInUser(username)
                .then((status) => {
                    this.props.history.push("/home");
                });
        }
    };

    componentDidMount() {
        document.title = `Welcome, ${this.state.username} !!`;
        API.getImages()
            .then((data) => {console.log("initial images"+data);
                if (this.refs.myref) {
                    this.setState({
                        files: data
                    });
                }
            });


        API.getSharedFiles()
            .then((data) => {
                console.log("shareeed data is "+data);
                if (this.refs.myref) {
                    this.setState({
                        sharedfiles: data
                    });
                }
            });
    };

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );
        return (


            <div className="main-wrapper" ref="myref">
                <NavigationBar></NavigationBar>
                <HomePageHeader></HomePageHeader>
                //logic of all list
                <div className="main-body-wrapper">
                    <div className="maestro-app-content">
                        <ul className="home-access-sections">
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Shared with me</div></div></div></h2>
                            </li>
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">My files</div></div></div></h2>
                            </li>
                            <li>
                                <ImageGridList files={this.props.filesUnderDir} handleStar = {this.handleStar} handleDelete = {this.handleDelete}/>
                            </li>
                        </ul>
                    </div>
                    <div className="right-section-nav">
                        <input
                            className={'fileupload'}
                            type="file"
                            name="mypic"
                            onChange={this.handleFileUpload}
                        />
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

export default withRouter(DirectoryFile);