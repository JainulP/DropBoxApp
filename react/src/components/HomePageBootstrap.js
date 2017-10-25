import React, {Component} from 'react';
import Ionicon from 'react-ionicons'
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import NavigationBar from "./NavigationBar";
import Pageheaders from "./Pageheaders";
import '.././CSS/homepagecss.css';

class HomePageBootstrap extends Component {


    constructor() {
        super();
        // this.state = {
        //     userdetails: []
        // };
    }
    componentWillMount() {

        // API.getUserAbout(localStorage.getItem("username"))
        //     .then((data) => {
        //         // if (this.refs.myref) {
        //         this.setState({
        //             userdetails: data
        //         });
        //         //}
        //     });





    };
    render(){
        return(
            <div className="container-fluid">
                <div className="row sidemenu" >
                    <nav className="col-sm-2 bg-light profile-sidebar">
                        <div className="profile-userpic">
                            <img className="maestro-nav__logo" aria-label="Home" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg" role="img"  data-reactid="12"/>
                        </div>
                        <ul className="nav nav-pills flex-column firstelement">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>

                    </nav>

                    <main role="main" className="col-sm-10">
                        <h1 className="header col-sm-8">Home</h1>
                        <h1 className="header ion-person col-sm-4"></h1>

                        <div className="col-sm-8">


                            <h2 className="header category">Starred</h2>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                            </ul>



                            <h2 className="header category">Shared with me</h2>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                            </ul>


                            <h2 className="header category">My Files</h2>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline"  style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <span className="ion-ios-folder"></span>
                                    <span className="listContent">Cras justo odio</span>
                                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    </div>
                                </li>
                            </ul>



                        </div>
                        <div className="col-sm-4 rightBlock">

                            <button type="button" className="btn uploadBtn">Upload Files</button>
                            <div className="rightDivTop rightDivLeft">
                                <b className="ion-ios-briefcase-outline"></b>
                                <span className="rightPane">New Shared Folder</span>
                            </div>
                            <div className="rightDivLeft">
                                <b className="ion-ios-folder-outline"></b>
                                <span className="rightPane">New  Folder</span>
                            </div>
                            <div className="rightDivLeft">
                                <b className="ion-eye"></b>
                                <span className="rightPane">Show deleted files</span>
                            </div>
                        </div>
                    </main>

                </div>
            </div>

        )
    }
}

export default HomePageBootstrap;
