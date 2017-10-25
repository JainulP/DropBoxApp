import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import HomePageHeader from "./homePageHeader";
import PropTypes from "prop-types";
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import {Popover} from "react-bootstrap";
import {Tooltip} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {DropdownButton} from "react-bootstrap";
import {MenuItem} from "react-bootstrap";

import '.././CSS/homePage.css';

// import {DatePicker,RaisedButton,action} from 'material-ui';

class HomePage extends Component{

    static propTypes = {
        classes: PropTypes.object,
        username: PropTypes.string,
        classes: PropTypes.object,

        // handleLogout: PropTypes.func,
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
            sharedfiles:[],
            currentfolder:'',
            dirPath :'',
            shareWith: '',
            shareDirectoryPath:'',
            isStarred: false,
            // showpage:false,
            filesUnderDir: [],
            starred:[]
        };
        // this.handleLogout = this.handleLogout.bind(this);
    }

    // handleLogout = (event) => {
    //     console.log("handle log out called");
    //     localStorage.clear();
    //     this.setState({
    //         username: ""
    //     });
    //     console.log("afterlogout"+localStorage.getItem("username"));
    //     API.logout()
    //         .then((status) => {
    //             this.props.history.push("/login");
    //         });
    // };

    handleFileUpload = (event) => {
        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload,this.state.currentfolder)
            .then((status) => {
                if (status === 204) {
                    API.getfiles(this.state.currentfolder)
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

                API.getfiles(this.state.currentfolder)
                    .then((data) => {
                        var arrstarred = [];
                        var nonstarred = []
                        data.map( function(val) {
                            console.log("i am called");
                            if(val.isStarred == 'true'){
                                arrstarred.push(val);
                                console.log("starres");
                                //return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;
                            }
                            else {
                                nonstarred.push(val);
                                console.log("unstatrred"+val.isStarred);
                                //return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;
                            }

                        })
                        this.setState({
                            files: nonstarred,
                            starred:arrstarred
                        });

            });
    })};

    handleDelete = (event,param) => {
console.log("deleting path"+param);
        API.deleteIt(param)
            .then((status) => {
                console.log("delete executed" + status);

                API.getfiles(this.state.currentfolder)
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
                    API.getfiles(this.state.currentfolder)
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
                    API.getfiles(this.state.currentfolder)
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });

    };

    handleFileUploadUnderDir = (event1,param) => {
        const payload = new FormData();
        payload.append('mypic', event1.target.files[0]);

        console.log(payload);
        API.uploadFileUnderDir(payload,param)
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

    handleShare = (payload) => {
        //const payload = new FormData();

        console.log("shared with#####"+payload.shareWith);
        console.log("shared path#####"+payload.shareDirectoryPath);
        console.log("shared pvia#####"+payload.shareType);
        console.log("shared direc#####"+payload.isDir);
        API.shareDirectory(payload)
            .then((status) => {
                //     if (status === 204) {
                //         API.getImages()
                //             .then((data) => {
                //                 this.setState({
                //                     images: data
                //                 });
                //             });
                //     }
            });

    };

    showFileUnderDir = (param) => {
        var subpath = param.replace("public/uploads/","");
        console.log("subpath@@@"+ subpath);
        console.log("param is"+param);
        API.getfiles(subpath)
            .then((data) => {
                //    this.setState({
                //       filesUnderDir: data
                //    });
                // }, ()=>{this.props.history.push("/directoryfiles");}
                // );

                this.setState(
                    {
                        filesUnderDir: data,
                        files:data,
                        showpage: true,
                        fileUnderUpload: param,
                        currentfolder:subpath
                    }
                    // () => {
                    //     this.openModalFileUnderDir(param);
                    //     console.log("Directory files redirected" + JSON.stringify(this.state.filesUnderDir));
                    //     //this.props.history.push("/directoryfiles"),
                    //     // console.log("mydiv3333"+ this.state.showpage);
                    //     // var mydiv = null;
                    //     // mydiv = (document.getElementById("main-wrapper"));
                    //     // console.log("mfgfh",mydiv);
                    //     // console.log("mydiv"+document.getElementById("main-wrapper").style);
                    //     //  mydiv.style.display ="block";
                    //     //  document.getElementById("file-list-table").style.display = "none";
                    //     // document.getElementById("class-root").style.display = "none";
                    //     //      document.getElementById("file-list-table1").style.display = "block";
                    //     {/*<DirectoryFile  filesUnderDir= {this.state.filesUnderDir}/>*/}
                    //     {/*this.props.history.push("/directoryfiles");*/}
                    // }
                );});


    };

    showFileUnderSharedDir = (param) => {
        var subpath = param.replace("public/uploads/","");
        console.log("subpath@@@underdir"+ subpath);
        console.log("param is undersir"+param);
        API.getSharedFilesUnderDir(subpath)
            .then((data) => {
                //    this.setState({
                //       filesUnderDir: data
                //    });
                // }, ()=>{this.props.history.push("/directoryfiles");}
                // );

                this.setState(
                    {
                        filesUnderDir: data,
                        sharedfiles:data,
                        showpage: true,
                        fileUnderUpload: param,
                        currentfolder:subpath
                    }
                    // () => {
                    //     this.openModalFileUnderDir(param);
                    //     console.log("Directory files redirected" + JSON.stringify(this.state.filesUnderDir));
                    //     //this.props.history.push("/directoryfiles"),
                    //     // console.log("mydiv3333"+ this.state.showpage);
                    //     // var mydiv = null;
                    //     // mydiv = (document.getElementById("main-wrapper"));
                    //     // console.log("mfgfh",mydiv);
                    //     // console.log("mydiv"+document.getElementById("main-wrapper").style);
                    //     //  mydiv.style.display ="block";
                    //     //  document.getElementById("file-list-table").style.display = "none";
                    //     // document.getElementById("class-root").style.display = "none";
                    //     //      document.getElementById("file-list-table1").style.display = "block";
                    //     {/*<DirectoryFile  filesUnderDir= {this.state.filesUnderDir}/>*/}
                    //     {/*this.props.history.push("/directoryfiles");*/}
                    // }
                );});


    };
    // getInitialState = () => {
    //     return { showModal: false,
    //         showFileUnderDirModal:false};
    // };
    //
    // close = () => {
    //     this.setState({ showModal: false,
    //         showFileUnderDirModal:false});
    // };
    //
    // openModalShare = (path) => {
    //     console.log(path.path);
    //     this.setState({ showModal: true});
    //     //shareDirectoryPath: path
    // };
    //
    // openModalFileUnderDir = (path) => {
    //     console.log(path);
    //     this.setState({ showFileUnderDirModal: true});
    //     //shareDirectoryPath: path
    // };
    componentWillMount() {

        var username = localStorage.getItem("username");
        console.log("username"+username);

        if(username == null)
        {
            this.props.history.push("/login");
        }
        else {
            this.setState({currentfolder:username});

            API.setLoggedInUser(username)
                .then((status) => {
                    this.props.history.push("/home");
                });

            API.getfiles(username)
                .then((data) => {console.log("initial images"+data);
                    if (this.refs.myref) {
                         var arrstarred = [];
                         var nonstarred = []
                       data.map( function(val) {
console.log("i am called");
                            if(val.isStarred == 'true'){
                                arrstarred.push(val);
                                console.log("starres");
                                //return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;
                            }
                            else {
                                nonstarred.push(val);
                                console.log("unstatrred"+val.isStarred);
                                //return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;
                            }

                        })
                        this.setState({
                            files: nonstarred,
                            starred:arrstarred
                        });
                    }
                    });




            API.getSharedFiles(username)
                .then((data) => {
                    console.log("shareeed data is "+data);
                    if (this.refs.myref) {
                        this.setState({
                            sharedfiles: data
                        });
                    }
                });

            // API.getstarredfiles(username)
            //     .then((data) => {console.log("starred files"+data);
            //         if (this.refs.myref) {
            //             this.setState({
            //                 starred: data
            //             });
            //         }
            //     });

        }

    };

    componentDidMount() {
        document.title = `Home - Dropbox`;
        // API.getImages()
        //     .then((data) => {console.log("initial images"+data);
        //         if (this.refs.myref) {
        //             this.setState({
        //                 files: data
        //             });
        //         }
        //     });
        //
        //
        // API.getSharedFiles()
        //     .then((data) => {
        //         console.log("shareeed data is "+data);
        //         if (this.refs.myref) {
        //             this.setState({
        //                 sharedfiles: data
        //             });
        //         }
        //     });
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
        const classes = this.props;
        return (

            <div className="main-wrapper" ref="myref">
                <title>Home</title>
                <NavigationBar></NavigationBar>
                <HomePageHeader head = {"Home"} ></HomePageHeader>
                //logic of all list
                <div className="main-body-wrapper">
                    <div className="maestro-app-content">
                        <ul className="home-access-sections">
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Shared with me</div></div></div></h2>
                            </li>
                            <li>
                                {/*<ImageGridList files={this.state.sharedfiles} handleStar = {this.handleStar}  handleDelete = {this.handleDelete}/>*/}
                                <div className={classes.root} name="classes.root" id="classes.root">
                                    <table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>
                                        {this.state.sharedfiles.map(file => (
                                            <tbody>

                                            {/*<span>{file.filename+file.filename1}</span>*/}
                                            <tr key={file.filename} className="home-file-section">

                                                <td className="folder-icon"  style={(file.isDir == "true") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40">
                                                        <title>content-folder-small</title>
                                                        <g fill="none" fillRule="evenodd">
                                                            <path
                                                                d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#71B9F4"
                                                            />
                                                            <path
                                                                d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#92CEFF"
                                                            />
                                                        </g>
                                                    </svg>
                                                </td>
                                                <td className="folder-icon"  style={(file.isDir == "false") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40"><title>content-docx-small</title><defs><rect id="mc-content-docx-small-b" x="8" y="5" width="24" height="30" rx="1.5"></rect><filter x="-2.1%" y="-1.7%" width="104.2%" height="106.7%" filterUnits="objectBoundingBox" id="mc-content-docx-small-a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feColorMatrix values="0 0 0 0 0.858859196 0 0 0 0 0.871765907 0 0 0 0 0.884672619 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><g><use fill="#000"></use><use fill="#F7F9FA"></use></g><path d="M13 15.505a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4c0-.279.228-.505.51-.505h8.98a.5.5 0 0 1 .51.505v.99a.507.507 0 0 1-.51.505h-8.98a.5.5 0 0 1-.51-.505v-.99z" fill="#3BA0F3"></path></g></svg>
                                                </td>
                                                <td className="fileName" onClick={event => {
                                                    this.setState(
                                                        {
                                                            dirPath: file.filepath

                                                        },
                                                        () => this.showFileUnderSharedDir(this.state.dirPath)
                                                    );
                                                }}>{file.filename}</td>
                                                <td  className="folder-icon">
                                                    {/*show below button if star not clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "false") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "false" ? "true" : "false"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/*show below button if star clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "true") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "true" ? "false" : "true"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star mc-icon-star-selected"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="download-link">
                                                    <a
                                                        href={"http://localhost:3001/" + file.filepath.replace("public/","")}
                                                        style={
                                                            file.isDir == "false" || file.isDir == null
                                                                ? {}
                                                                : { display: "none" }
                                                        }
                                                        download={file.filename}
                                                    >
                                                        Download
                                                    </a>
                                                </td>
                                                {/*<td className="delete-button">*/}
                                                {/*<input*/}
                                                {/*className={"fileupload"}*/}
                                                {/*type="file"*/}
                                                {/*name="mypic"*/}
                                                {/*style={file.isDir == "true" ? {} : { display: "none" }}*/}
                                                {/*onChange={event1 =>*/}
                                                {/*this.handleFileUploadUnderDir(event1, file.filepath)}*/}
                                                {/*/>*/}
                                                {/*</td>*/}
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <Button
                                                            bsStyle="primary"
                                                            bsSize="small"
                                                            type="button"
                                                            style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                            onClick={event => this.handleDelete(event, file.filepath)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                                onClick={event => {
                                                                    this.setState(
                                                                        { shareDirectoryPath: file.filepath, isDir: file.isDir },
                                                                        // () => this.openModalShare(this.state)
                                                                    );
                                                                }}>
                                                            Share with
                                                        </button>
                                                        {/*<Button*/}
                                                        {/*bsStyle="primary"*/}
                                                        {/*bsSize="small"*/}
                                                        {/*style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                        {/*onClick={event => {*/}
                                                        {/*this.setState(*/}
                                                        {/*{ shareDirectoryPath: file.filepath, isDir: true },*/}
                                                        {/*() => this.openModalShare(this.state)*/}
                                                        {/*);*/}
                                                        {/*}}*/}
                                                        {/*>*/}
                                                        {/*Share With*/}
                                                        {/*</Button>*/}
                                                    </div>
                                                </td>
                                                <td>





                                                    <div>
                                                        <Modal show={this.state.showModal} onHide={this.close}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Share</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <DropdownButton title="Share Via" id="bg-nested-dropdown" onSelect={event=>{this.setState({shareType:event});}}>
                                                                    <MenuItem eventKey="username">Username</MenuItem>
                                                                    <MenuItem eventKey="email">Email</MenuItem>
                                                                    <MenuItem eventKey="email">Link</MenuItem>
                                                                </DropdownButton>
                                                                <input
                                                                    id="sharewith"
                                                                    name="sharewith"
                                                                    type="text"
                                                                    onChange={event => {
                                                                        this.setState({ shareWith: event.target.value });
                                                                    }}
                                                                    multiple
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        this.handleShare(this.state);
                                                                    }}
                                                                >
                                                                    Done
                                                                </button>
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <Button onClick={this.close}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                    {/*<div>*/}
                                                        {/*<Modal show={this.state.showFileUnderDirModal} onHide={this.close}>*/}
                                                            {/*<Modal.Header closeButton>*/}
                                                                {/*<Modal.Title>{this.state.dirPath}</Modal.Title>*/}
                                                            {/*</Modal.Header>*/}

                                                            {/*<Modal.Body>*/}
                                                                {/*<table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>*/}
                                                                    {/*{this.state.filesUnderDir.map(file1 => (*/}
                                                                        {/*<tbody>*/}
                                                                        {/*<tr key={file.filename} className="home-file-section">*/}
                                                                            {/*<td className="folder-icon"  style={(file1.isDir == "true") ? {} : { display: "none" }} >*/}
                                                                                {/*<svg width="40" height="40" viewBox="0 0 40 40">*/}
                                                                                    {/*<title>content-folder-small</title>*/}
                                                                                    {/*<g fill="none" fillRule="evenodd">*/}
                                                                                        {/*<path*/}
                                                                                            {/*d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"*/}
                                                                                            {/*fill="#71B9F4"*/}
                                                                                        {/*/>*/}
                                                                                        {/*<path*/}
                                                                                            {/*d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"*/}
                                                                                            {/*fill="#92CEFF"*/}
                                                                                        {/*/>*/}
                                                                                    {/*</g>*/}
                                                                                {/*</svg>*/}
                                                                            {/*</td>*/}
                                                                            {/*<td>*/}
                                                                                {/*{file1.filename}*/}
                                                                            {/*</td>*/}
                                                                            {/*<td  className="folder-icon">*/}
                                                                                {/*/!*show below button if star not clicked*!/*/}
                                                                                {/*<button*/}
                                                                                    {/*className="btn button-tertiary star-button"*/}
                                                                                    {/*type="button"*/}
                                                                                    {/*style={(file1.isDir == "true"&& file1.isStarred== "false") ? {} : { display: "none" }}*/}
                                                                                    {/*onClick={event => {*/}
                                                                                        {/*this.setState(*/}
                                                                                            {/*{*/}
                                                                                                {/*shareDirectoryPath: file.filepath,*/}
                                                                                                {/*isStarred: file1.isStarred == "false" ? "true" : "false"*/}
                                                                                            {/*},*/}
                                                                                            {/*() => this.handleStar(this.state)*/}
                                                                                        {/*);*/}
                                                                                    {/*}}*/}
                                                                                {/*>*/}
                                                                                    {/*<svg*/}
                                                                                        {/*width="32"*/}
                                                                                        {/*height="32"*/}
                                                                                        {/*viewBox="0 0 32 32"*/}
                                                                                        {/*className="mc-icon-star"*/}
                                                                                    {/*>*/}
                                                                                        {/*<title>Artboard</title>*/}
                                                                                        {/*<path*/}
                                                                                            {/*d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"*/}
                                                                                            {/*fillRule="nonzero"*/}
                                                                                            {/*fill="#0070E0"*/}
                                                                                        {/*/>*/}
                                                                                    {/*</svg>*/}
                                                                                {/*</button>*/}

                                                                                {/*/!*show below button if star clicked*!/*/}
                                                                                {/*<button*/}
                                                                                    {/*className="btn button-tertiary star-button"*/}
                                                                                    {/*type="button"*/}
                                                                                    {/*style={(file1.isDir == "true"&& file1.isStarred== "true") ? {} : { display: "none" }}*/}
                                                                                    {/*onClick={event => {*/}
                                                                                        {/*this.setState(*/}
                                                                                            {/*{*/}
                                                                                                {/*shareDirectoryPath: file1.filepath,*/}
                                                                                                {/*isStarred: file.isStarred == "true" ? "false" : "true"*/}
                                                                                            {/*},*/}
                                                                                            {/*() => this.props.handleStar(this.state)*/}
                                                                                        {/*);*/}
                                                                                    {/*}}*/}
                                                                                {/*>*/}
                                                                                    {/*<svg*/}
                                                                                        {/*width="32"*/}
                                                                                        {/*height="32"*/}
                                                                                        {/*viewBox="0 0 32 32"*/}
                                                                                        {/*className="mc-icon-star mc-icon-star-selected"*/}
                                                                                    {/*>*/}
                                                                                        {/*<title>Artboard</title>*/}
                                                                                        {/*<path*/}
                                                                                            {/*d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"*/}
                                                                                            {/*fillRule="nonzero"*/}
                                                                                            {/*fill="#0070E0"*/}
                                                                                        {/*/>*/}
                                                                                    {/*</svg>*/}
                                                                                {/*</button>*/}
                                                                            {/*</td>*/}
                                                                            {/*<td className="download-link">*/}
                                                                                {/*<a*/}
                                                                                    {/*href={"http://localhost:3001/uploads/" + file1.filename}*/}
                                                                                    {/*style={*/}
                                                                                        {/*file1.isDir == "false" || file1.isDir == null*/}
                                                                                            {/*? {}*/}
                                                                                            {/*: { display: "none" }*/}
                                                                                    {/*}*/}
                                                                                    {/*download={file1.filename}*/}
                                                                                {/*>*/}
                                                                                    {/*Download*/}
                                                                                {/*</a>*/}
                                                                            {/*</td>*/}
                                                                            {/*<td className="delete-button">*/}
                                                                                {/*<div className="form-group">*/}
                                                                                    {/*<Button*/}
                                                                                        {/*bsStyle="primary"*/}
                                                                                        {/*bsSize="small"*/}
                                                                                        {/*type="button"*/}
                                                                                        {/*style={file1.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                                                        {/*onClick={event => this.props.handleDelete(event, file.filename)}*/}
                                                                                    {/*>*/}
                                                                                        {/*Delete*/}
                                                                                    {/*</Button>*/}
                                                                                {/*</div>*/}
                                                                            {/*</td>*/}
                                                                        {/*</tr>*/}
                                                                        {/*</tbody>*/}
                                                                    {/*))}*/}
                                                                {/*</table>*/}
                                                            {/*</Modal.Body>*/}

                                                            {/*<Modal.Footer>*/}
                                                                {/*<input*/}
                                                                    {/*className={"fileupload"}*/}
                                                                    {/*type="file"*/}
                                                                    {/*name="mypic"*/}
                                                                    {/*onChange={event1 =>*/}
                                                                        {/*this.handleFileUploadUnderDir(event1, this.state.fileUnderUpload)}*/}
                                                                {/*/>*/}
                                                                {/*<Button onClick={this.close}>Close</Button>*/}
                                                            {/*</Modal.Footer>*/}
                                                        {/*</Modal>*/}
                                                    {/*</div>*/}
                                                </td>
                                            </tr>
                                            </tbody>
                                        ))}
                                    </table>

                                </div>
                            </li>
                            <li>

                            </li>
                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">My files</div></div></div></h2>
                            </li>
                            <li>
                                {/*<ImageGridList files={this.state.files} handleStar = {this.handleStar} handleDelete = {this.handleDelete}/>*/}
                                <div className={classes.root} name="classes.root" id="classes.root">
                                    <table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>
                                        {this.state.files.map(file => (
                                            <tbody>

                                            {/*<span>{file.filename+file.filename1}</span>*/}
                                            <tr key={file.filename} className="home-file-section">

                                                <td className="folder-icon"  style={(file.isDir == "true") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40">
                                                        <title>content-folder-small</title>
                                                        <g fill="none" fillRule="evenodd">
                                                            <path
                                                                d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#71B9F4"
                                                            />
                                                            <path
                                                                d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#92CEFF"
                                                            />
                                                        </g>
                                                    </svg>
                                                </td>
                                                <td className="folder-icon"  style={(file.isDir == "false") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40"><title>content-docx-small</title><defs><rect id="mc-content-docx-small-b" x="8" y="5" width="24" height="30" rx="1.5"></rect><filter x="-2.1%" y="-1.7%" width="104.2%" height="106.7%" filterUnits="objectBoundingBox" id="mc-content-docx-small-a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feColorMatrix values="0 0 0 0 0.858859196 0 0 0 0 0.871765907 0 0 0 0 0.884672619 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><g><use fill="#000"></use><use fill="#F7F9FA"></use></g><path d="M13 15.505a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4c0-.279.228-.505.51-.505h8.98a.5.5 0 0 1 .51.505v.99a.507.507 0 0 1-.51.505h-8.98a.5.5 0 0 1-.51-.505v-.99z" fill="#3BA0F3"></path></g></svg>
                                                </td>
                                                <td className="fileName" onClick={event => {
                                                    this.setState(
                                                        {
                                                            dirPath: file.filepath

                                                        },
                                                        () => this.showFileUnderDir(this.state.dirPath)
                                                    );
                                                }}>{file.filename}</td>
                                                <td  className="folder-icon">
                                                    {/*show below button if star not clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "false") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "false" ? "true" : "false"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/*show below button if star clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "true") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "true" ? "false" : "true"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star mc-icon-star-selected"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="download-link">
                                                    <a
                                                        href={"http://localhost:3001/" + file.filepath.replace("public/","")}
                                                        style={
                                                            file.isDir == "false" || file.isDir == null
                                                                ? {}
                                                                : { display: "none" }
                                                        }
                                                        download={file.filename}
                                                    >
                                                        Download
                                                    </a>
                                                </td>
                                                {/*<td className="delete-button">*/}
                                                {/*<input*/}
                                                {/*className={"fileupload"}*/}
                                                {/*type="file"*/}
                                                {/*name="mypic"*/}
                                                {/*style={file.isDir == "true" ? {} : { display: "none" }}*/}
                                                {/*onChange={event1 =>*/}
                                                {/*this.handleFileUploadUnderDir(event1, file.filepath)}*/}
                                                {/*/>*/}
                                                {/*</td>*/}
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <Button
                                                            bsStyle="primary"
                                                            bsSize="small"
                                                            type="button"
                                                            style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                            onClick={event => this.handleDelete(event, file.filepath)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                                onClick={event => {
                                                                    this.setState(
                                                                        { shareDirectoryPath: file.filepath, isDir: file.isDir },
                                                                        // () => this.openModalShare(this.state)
                                                                    );
                                                                }}>
                                                            Share with
                                                        </button>
                                                        {/*<Button*/}
                                                            {/*bsStyle="primary"*/}
                                                            {/*bsSize="small"*/}
                                                            {/*style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                            {/*onClick={event => {*/}
                                                                {/*this.setState(*/}
                                                                    {/*{ shareDirectoryPath: file.filepath, isDir: true },*/}
                                                                    {/*() => this.openModalShare(this.state)*/}
                                                                {/*);*/}
                                                            {/*}}*/}
                                                        {/*>*/}
                                                            {/*Share With*/}
                                                        {/*</Button>*/}
                                                    </div>
                                                </td>
                                                <td>





                                                    <div>
                                                        <Modal show={this.state.showModal} onHide={this.close}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Share</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <DropdownButton title="Share Via" id="bg-nested-dropdown" onSelect={event=>{this.setState({shareType:event});}}>
                                                                    <MenuItem eventKey="username">Username</MenuItem>
                                                                    <MenuItem eventKey="email">Email</MenuItem>
                                                                    <MenuItem eventKey="email">Link</MenuItem>
                                                                </DropdownButton>
                                                                <input
                                                                    id="sharewith"
                                                                    name="sharewith"
                                                                    type="text"
                                                                    onChange={event => {
                                                                        this.setState({ shareWith: event.target.value });
                                                                    }}
                                                                    multiple
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        this.handleShare(this.state);
                                                                    }}
                                                                >
                                                                    Done
                                                                </button>
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <Button onClick={this.close}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                    <div>
                                                        <Modal show={this.state.showFileUnderDirModal} onHide={this.close}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>{this.state.dirPath}</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>
                                                                    {this.state.filesUnderDir.map(file1 => (
                                                                        <tbody>
                                                                        <tr key={file.filename} className="home-file-section">
                                                                            <td className="folder-icon"  style={(file1.isDir == "true") ? {} : { display: "none" }} >
                                                                                <svg width="40" height="40" viewBox="0 0 40 40">
                                                                                    <title>content-folder-small</title>
                                                                                    <g fill="none" fillRule="evenodd">
                                                                                        <path
                                                                                            d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                                            fill="#71B9F4"
                                                                                        />
                                                                                        <path
                                                                                            d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                                            fill="#92CEFF"
                                                                                        />
                                                                                    </g>
                                                                                </svg>
                                                                            </td>
                                                                            <td>
                                                                                {file1.filename}
                                                                            </td>
                                                                            <td  className="folder-icon">
                                                                                {/*show below button if star not clicked*/}
                                                                                <button
                                                                                    className="btn button-tertiary star-button"
                                                                                    type="button"
                                                                                    style={(file1.isDir == "true"&& file1.isStarred== "false") ? {} : { display: "none" }}
                                                                                    onClick={event => {
                                                                                        this.setState(
                                                                                            {
                                                                                                shareDirectoryPath: file.filepath,
                                                                                                isStarred: file1.isStarred == "false" ? "true" : "false"
                                                                                            },
                                                                                            () => this.handleStar(this.state)
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <svg
                                                                                        width="32"
                                                                                        height="32"
                                                                                        viewBox="0 0 32 32"
                                                                                        className="mc-icon-star"
                                                                                    >
                                                                                        <title>Artboard</title>
                                                                                        <path
                                                                                            d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"
                                                                                            fillRule="nonzero"
                                                                                            fill="#0070E0"
                                                                                        />
                                                                                    </svg>
                                                                                </button>

                                                                                {/*show below button if star clicked*/}
                                                                                <button
                                                                                    className="btn button-tertiary star-button"
                                                                                    type="button"
                                                                                    style={(file1.isDir == "true"&& file1.isStarred== "true") ? {} : { display: "none" }}
                                                                                    onClick={event => {
                                                                                        this.setState(
                                                                                            {
                                                                                                shareDirectoryPath: file1.filepath,
                                                                                                isStarred: file.isStarred == "true" ? "false" : "true"
                                                                                            },
                                                                                            () => this.handleStar(this.state)
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <svg
                                                                                        width="32"
                                                                                        height="32"
                                                                                        viewBox="0 0 32 32"
                                                                                        className="mc-icon-star mc-icon-star-selected"
                                                                                    >
                                                                                        <title>Artboard</title>
                                                                                        <path
                                                                                            d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"
                                                                                            fillRule="nonzero"
                                                                                            fill="#0070E0"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </td>
                                                                            <td className="download-link">
                                                                                <a
                                                                                    href={"http://localhost:3001/uploads/" + file1.filename}
                                                                                    style={
                                                                                        file1.isDir == "false" || file1.isDir == null
                                                                                            ? {}
                                                                                            : { display: "none" }
                                                                                    }
                                                                                    download={file1.filename}
                                                                                >
                                                                                    Download
                                                                                </a>
                                                                            </td>
                                                                            <td className="delete-button">
                                                                                <div className="form-group">
                                                                                    <Button
                                                                                        bsStyle="primary"
                                                                                        bsSize="small"
                                                                                        type="button"
                                                                                        style={file1.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                                                        onClick={event => this.props.handleDelete(event, file.filename)}
                                                                                    >
                                                                                        Delete
                                                                                    </Button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    ))}
                                                                </table>
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <input
                                                                    className={"fileupload"}
                                                                    type="file"
                                                                    name="mypic"
                                                                    onChange={event1 =>
                                                                        this.handleFileUploadUnderDir(event1, this.state.fileUnderUpload)}
                                                                />
                                                                <Button onClick={this.close}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                    {/*<div className="main-wrapper"  id ="main-wrapper" name="main-wrapper" style={{display: "none"}}>*/}
                                    {/*/!*<NavigationBar></NavigationBar>*!/*/}
                                    {/*/!*<HomePageHeader></HomePageHeader>*!/*/}
                                    {/*//logic of all list*/}
                                    {/*<div className="main-body-wrapper">*/}
                                    {/*<div className="maestro-app-content">*/}
                                    {/*<ul className="home-access-sections">*/}
                                    {/*<li className="home-access-section">*/}
                                    {/*<h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Shared with me</div></div></div></h2>*/}
                                    {/*</li>*/}
                                    {/*<li className="home-access-section">*/}
                                    {/*<h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">My files</div></div></div></h2>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                    {/*/!*<ImageGridList files={this.state.filesUnderDir} handleStar = {this.handleStar} handleDelete = {this.handleDelete}/>*!/*/}
                                    {/*</li>*/}
                                    {/*</ul>*/}
                                    {/*</div>*/}
                                    {/*/!*<div className="right-section-nav">*!/*/}
                                    {/*/!*<input*!/*/}
                                    {/*/!*className={'fileupload'}*!/*/}
                                    {/*/!*type="file"*!/*/}
                                    {/*/!*name="mypic"*!/*/}
                                    {/*/!*onChange={this.handleFileUpload}*!/*/}
                                    {/*/>*/}
                                    {/*/!*<div className="form-group">*!/*/}
                                    {/*/!*<button*!/*/}
                                    {/*/!*className="btn btn-primary"*!/*/}
                                    {/*/!*type="button"*!/*/}
                                    {/*/!*onClick={this.handleLogout}*!/*/}
                                    {/*/!*>*!/*/}
                                    {/*/!*Logout*!/*/}
                                    {/*/!*</button>*!/*/}
                                    {/*/!*</div>*!/*/}


                                    {/*/!*</div>*!/*/}

                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<table className="file-list-table1" name="file-list-table1" id="file-list-table1" cols={10} style={{display: "none"}} ref="myref">*/}
                                    {/*{console.log("inside component"+ JSON.stringify(this.state.filesUnderDir))}*/}
                                    {/*<DirectoryFile  filesUnderDir= {this.state.filesUnderDir}/>*/}
                                    {/*</table>*/}
                                </div>
                            </li>

                            <li className="home-access-section">
                                <h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Starred</div></div></div></h2>
                            </li>
                            <li>
                                {/*<ImageGridList files={this.state.files} handleStar = {this.handleStar} handleDelete = {this.handleDelete}/>*/}
                                <div className={classes.root} name="classes.root" id="classes.root">
                                    <table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>
                                        {this.state.starred.map(file => (
                                            <tbody>

                                            {/*<span>{file.filename+file.filename1}</span>*/}
                                            <tr key={file.filename} className="home-file-section">

                                                <td className="folder-icon"  style={(file.isDir == "true") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40">
                                                        <title>content-folder-small</title>
                                                        <g fill="none" fillRule="evenodd">
                                                            <path
                                                                d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#71B9F4"
                                                            />
                                                            <path
                                                                d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                fill="#92CEFF"
                                                            />
                                                        </g>
                                                    </svg>
                                                </td>
                                                <td className="folder-icon"  style={(file.isDir == "false") ? {} : { display: "none" }} >
                                                    <svg width="40" height="40" viewBox="0 0 40 40"><title>content-docx-small</title><defs><rect id="mc-content-docx-small-b" x="8" y="5" width="24" height="30" rx="1.5"></rect><filter x="-2.1%" y="-1.7%" width="104.2%" height="106.7%" filterUnits="objectBoundingBox" id="mc-content-docx-small-a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feColorMatrix values="0 0 0 0 0.858859196 0 0 0 0 0.871765907 0 0 0 0 0.884672619 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><g><use fill="#000"></use><use fill="#F7F9FA"></use></g><path d="M13 15.505a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4a.5.5 0 0 1 .498-.505h13.004c.275 0 .498.214.498.505v.99a.5.5 0 0 1-.498.505H13.498a.494.494 0 0 1-.498-.505v-.99zm0 4c0-.279.228-.505.51-.505h8.98a.5.5 0 0 1 .51.505v.99a.507.507 0 0 1-.51.505h-8.98a.5.5 0 0 1-.51-.505v-.99z" fill="#3BA0F3"></path></g></svg>
                                                </td>
                                                <td className="fileName" onClick={event => {
                                                    this.setState(
                                                        {
                                                            dirPath: file.filepath

                                                        },
                                                        () => this.showFileUnderDir(this.state.dirPath)
                                                    );
                                                }}>{file.filename}</td>
                                                <td  className="folder-icon">
                                                    {/*show below button if star not clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "false") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "false" ? "true" : "false"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/*show below button if star clicked*/}
                                                    <button
                                                        className="btn button-tertiary star-button"
                                                        type="button"
                                                        style={(file.isDir == "true"&& file.isStarred== "true") ? {} : { display: "none" }}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    shareDirectoryPath: file.filepath,
                                                                    isStarred: file.isStarred == "true" ? "false" : "true"
                                                                },
                                                                () => this.handleStar(this.state)
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            width="32"
                                                            height="32"
                                                            viewBox="0 0 32 32"
                                                            className="mc-icon-star mc-icon-star-selected"
                                                        >
                                                            <title>Artboard</title>
                                                            <path
                                                                d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"
                                                                fillRule="nonzero"
                                                                fill="#0070E0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="download-link">
                                                    <a
                                                        href={"http://localhost:3001/" + file.filepath.replace("public/","")}
                                                        style={
                                                            file.isDir == "false" || file.isDir == null
                                                                ? {}
                                                                : { display: "none" }
                                                        }
                                                        download={file.filename}
                                                    >
                                                        Download
                                                    </a>
                                                </td>
                                                {/*<td className="delete-button">*/}
                                                {/*<input*/}
                                                {/*className={"fileupload"}*/}
                                                {/*type="file"*/}
                                                {/*name="mypic"*/}
                                                {/*style={file.isDir == "true" ? {} : { display: "none" }}*/}
                                                {/*onChange={event1 =>*/}
                                                {/*this.handleFileUploadUnderDir(event1, file.filepath)}*/}
                                                {/*/>*/}
                                                {/*</td>*/}
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <Button
                                                            bsStyle="primary"
                                                            bsSize="small"
                                                            type="button"
                                                            style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                            onClick={event => this.handleDelete(event, file.filepath)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="delete-button">
                                                    <div className="form-group">
                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                                onClick={event => {
                                                                    this.setState(
                                                                        { shareDirectoryPath: file.filepath, isDir: file.isDir },
                                                                        // () => this.openModalShare(this.state)
                                                                    );
                                                                }}>
                                                            Share with
                                                        </button>
                                                        {/*<Button*/}
                                                        {/*bsStyle="primary"*/}
                                                        {/*bsSize="small"*/}
                                                        {/*style={file.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                        {/*onClick={event => {*/}
                                                        {/*this.setState(*/}
                                                        {/*{ shareDirectoryPath: file.filepath, isDir: true },*/}
                                                        {/*() => this.openModalShare(this.state)*/}
                                                        {/*);*/}
                                                        {/*}}*/}
                                                        {/*>*/}
                                                        {/*Share With*/}
                                                        {/*</Button>*/}
                                                    </div>
                                                </td>
                                                <td>





                                                    <div>
                                                        <Modal show={this.state.showModal} onHide={this.close}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Share</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <DropdownButton title="Share Via" id="bg-nested-dropdown" onSelect={event=>{this.setState({shareType:event});}}>
                                                                    <MenuItem eventKey="username">Username</MenuItem>
                                                                    <MenuItem eventKey="email">Email</MenuItem>
                                                                    <MenuItem eventKey="email">Link</MenuItem>
                                                                </DropdownButton>
                                                                <input
                                                                    id="sharewith"
                                                                    name="sharewith"
                                                                    type="text"
                                                                    onChange={event => {
                                                                        this.setState({ shareWith: event.target.value });
                                                                    }}
                                                                    multiple
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        this.handleShare(this.state);
                                                                    }}
                                                                >
                                                                    Done
                                                                </button>
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <Button onClick={this.close}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                    <div>
                                                        <Modal show={this.state.showFileUnderDirModal} onHide={this.close}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>{this.state.dirPath}</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <table className="file-list-table" name="file-list-table" id="file-list-table" cols={10} style={{display: "block"}}>
                                                                    {this.state.filesUnderDir.map(file1 => (
                                                                        <tbody>
                                                                        <tr key={file.filename} className="home-file-section">
                                                                            <td className="folder-icon"  style={(file1.isDir == "true") ? {} : { display: "none" }} >
                                                                                <svg width="40" height="40" viewBox="0 0 40 40">
                                                                                    <title>content-folder-small</title>
                                                                                    <g fill="none" fillRule="evenodd">
                                                                                        <path
                                                                                            d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                                            fill="#71B9F4"
                                                                                        />
                                                                                        <path
                                                                                            d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z"
                                                                                            fill="#92CEFF"
                                                                                        />
                                                                                    </g>
                                                                                </svg>
                                                                            </td>
                                                                            <td>
                                                                                {file1.filename}
                                                                            </td>
                                                                            <td  className="folder-icon">
                                                                                {/*show below button if star not clicked*/}
                                                                                <button
                                                                                    className="btn button-tertiary star-button"
                                                                                    type="button"
                                                                                    style={(file1.isDir == "true"&& file1.isStarred== "false") ? {} : { display: "none" }}
                                                                                    onClick={event => {
                                                                                        this.setState(
                                                                                            {
                                                                                                shareDirectoryPath: file.filepath,
                                                                                                isStarred: file1.isStarred == "false" ? "true" : "false"
                                                                                            },
                                                                                            () => this.handleStar(this.state)
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <svg
                                                                                        width="32"
                                                                                        height="32"
                                                                                        viewBox="0 0 32 32"
                                                                                        className="mc-icon-star"
                                                                                    >
                                                                                        <title>Artboard</title>
                                                                                        <path
                                                                                            d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z"
                                                                                            fillRule="nonzero"
                                                                                            fill="#0070E0"
                                                                                        />
                                                                                    </svg>
                                                                                </button>

                                                                                {/*show below button if star clicked*/}
                                                                                <button
                                                                                    className="btn button-tertiary star-button"
                                                                                    type="button"
                                                                                    style={(file1.isDir == "true"&& file1.isStarred== "true") ? {} : { display: "none" }}
                                                                                    onClick={event => {
                                                                                        this.setState(
                                                                                            {
                                                                                                shareDirectoryPath: file1.filepath,
                                                                                                isStarred: file.isStarred == "true" ? "false" : "true"
                                                                                            },
                                                                                            () => this.handleStar(this.state)
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <svg
                                                                                        width="32"
                                                                                        height="32"
                                                                                        viewBox="0 0 32 32"
                                                                                        className="mc-icon-star mc-icon-star-selected"
                                                                                    >
                                                                                        <title>Artboard</title>
                                                                                        <path
                                                                                            d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z"
                                                                                            fillRule="nonzero"
                                                                                            fill="#0070E0"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </td>
                                                                            <td className="download-link">
                                                                                <a
                                                                                    href={"http://localhost:3001/uploads/" + file1.filename}
                                                                                    style={
                                                                                        file1.isDir == "false" || file1.isDir == null
                                                                                            ? {}
                                                                                            : { display: "none" }
                                                                                    }
                                                                                    download={file1.filename}
                                                                                >
                                                                                    Download
                                                                                </a>
                                                                            </td>
                                                                            <td className="delete-button">
                                                                                <div className="form-group">
                                                                                    <Button
                                                                                        bsStyle="primary"
                                                                                        bsSize="small"
                                                                                        type="button"
                                                                                        style={file1.fileowner == localStorage.getItem("username") ? {} : { display: "none" }}
                                                                                        onClick={event => this.props.handleDelete(event, file.filename)}
                                                                                    >
                                                                                        Delete
                                                                                    </Button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    ))}
                                                                </table>
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <input
                                                                    className={"fileupload"}
                                                                    type="file"
                                                                    name="mypic"
                                                                    onChange={event1 =>
                                                                        this.handleFileUploadUnderDir(event1, this.state.fileUnderUpload)}
                                                                />
                                                                <Button onClick={this.close}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                    {/*<div className="main-wrapper"  id ="main-wrapper" name="main-wrapper" style={{display: "none"}}>*/}
                                    {/*/!*<NavigationBar></NavigationBar>*!/*/}
                                    {/*/!*<HomePageHeader></HomePageHeader>*!/*/}
                                    {/*//logic of all list*/}
                                    {/*<div className="main-body-wrapper">*/}
                                    {/*<div className="maestro-app-content">*/}
                                    {/*<ul className="home-access-sections">*/}
                                    {/*<li className="home-access-section">*/}
                                    {/*<h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">Shared with me</div></div></div></h2>*/}
                                    {/*</li>*/}
                                    {/*<li className="home-access-section">*/}
                                    {/*<h2 className="home-access-section__header"><div className="home-access-section__title"><div className="home-access-section__title-text"><div className="ue-effect-container">My files</div></div></div></h2>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                    {/*/!*<ImageGridList files={this.state.filesUnderDir} handleStar = {this.handleStar} handleDelete = {this.handleDelete}/>*!/*/}
                                    {/*</li>*/}
                                    {/*</ul>*/}
                                    {/*</div>*/}
                                    {/*/!*<div className="right-section-nav">*!/*/}
                                    {/*/!*<input*!/*/}
                                    {/*/!*className={'fileupload'}*!/*/}
                                    {/*/!*type="file"*!/*/}
                                    {/*/!*name="mypic"*!/*/}
                                    {/*/!*onChange={this.handleFileUpload}*!/*/}
                                    {/*/>*/}
                                    {/*/!*<div className="form-group">*!/*/}
                                    {/*/!*<button*!/*/}
                                    {/*/!*className="btn btn-primary"*!/*/}
                                    {/*/!*type="button"*!/*/}
                                    {/*/!*onClick={this.handleLogout}*!/*/}
                                    {/*/!*>*!/*/}
                                    {/*/!*Logout*!/*/}
                                    {/*/!*</button>*!/*/}
                                    {/*/!*</div>*!/*/}


                                    {/*/!*</div>*!/*/}

                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<table className="file-list-table1" name="file-list-table1" id="file-list-table1" cols={10} style={{display: "none"}} ref="myref">*/}
                                    {/*{console.log("inside component"+ JSON.stringify(this.state.filesUnderDir))}*/}
                                    {/*<DirectoryFile  filesUnderDir= {this.state.filesUnderDir}/>*/}
                                    {/*</table>*/}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="right-section-nav">
                        <div className="form-group">

                            <input
                                className="form-control"
                                type="text"
                                label="createdir"
                                placeholder="folder name"
                                value={this.state.dirName}
                                onChange={event => {
                                    this.setState({
                                        dirName: event.target.value
                                    });
                                }} />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={(event) => {
                                    this.setState({
                                        isDir: true
                                    }, () => this.handleMakeDir(this.state));
                                }}
                            >
                                Create Folder
                            </button>
                        </div>

                        <input
                            className={'fileupload'}
                            type="file"
                            name="mypic"
                            onChange={this.handleFileUpload}
                        />
                        {/*<div className="form-group">*/}
                            {/*<button*/}
                                {/*className="btn btn-primary"*/}
                                {/*type="button"*/}
                                {/*onClick={this.handleLogout}*/}
                            {/*>*/}
                                {/*Logout*/}
                            {/*</button>*/}
                        {/*</div>*/}


                    </div>

                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter Username or email</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="modalclose" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    className="input-share-with"
                                    id="sharewith"
                                    name="sharewith"
                                    type="text"
                                    onChange={event => {
                                        this.setState({ shareWith: event.target.value });
                                    }}
                                    multiple
                                />
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.handleShare(this.state);
                                }}>Done</button>
                                {/*<button*/}
                                    {/*type="button"*/}
                                    {/*onClick={() => {*/}
                                        {/*this.handleShare(this.state);*/}
                                    {/*}}*/}
                                {/*>*/}
                                    {/*Done*/}
                                {/*</button>*/}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default withRouter(HomePage);