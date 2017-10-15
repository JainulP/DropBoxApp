import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {withStyles} from 'material-ui/styles';
// import { MakeSelectable} from 'material-ui';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {DropdownButton} from "react-bootstrap";
import {MenuItem} from "react-bootstrap";
import '.././CSS/homePage.css';
import * as API from '../api/API';

//
// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         overflow: 'hidden',
//         background: theme.palette.background.paper,
//     },
//     gridList: {
//         width: 500,
//         height: 450,
//     },
//     subheader: {
//         width: '100%',
//     },
// });

class ImageGridList extends Component {

    static propTypes = {
        classes: PropTypes.object,
        handleStar: PropTypes.func.isRequired,
        handleDelete: PropTypes.func.isRequired
        //files: PropTypes.object
    };

    constructor() {
        super();
        this.state = {
            dirPath :'',
            shareWith: '',
            shareDirectoryPath:'',
            isStarred: false
        };
        this.handleShare = this.handleShare.bind(this);
        this.handleFileUploadUnderDir= this.handleFileUploadUnderDir.bind(this);

    }

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

    getInitialState = () => {
        return { showModal: false };
    };

    close = () => {
        this.setState({ showModal: false });
    };

    openModalShare = (path) => {
        console.log(path.path);
        this.setState({ showModal: true});
        //shareDirectoryPath: path
    };

    // handleDelete = (event,param) => {
    //
    //     API.deleteIt(param)
    //         .then((status) => {
    //         console.log("delete executed" + status);
    //
    //             API.getImages()
    //                 .then((data) => {
    //                     this.setState({
    //                         files: data
    //                     });
    //                 });
    //
    //         });
    //
    // };

 //    handleStar = (payload) => {
 // console.log("Handle Star"+JSON.stringify(payload));
 //        API.toggleStar(payload)
 //            .then((status) => {
 //                console.log("star executed" + status);
 //
 //                API.getImages()
 //                    .then((data) => {
 //                        this.setState({
 //                            files: data
 //                        });
 //                    });
 //
 //            });
 //
 //    };

    componentDidMount() {
        API.getImages()
            .then((data) => {
                console.log(data);
                this.setState({
                    files: data
                });
            });
    };
    render(){
        const classes = this.props;



        return (
            <div className={classes.root}>
                <table className="file-list-table" cols={10}>
                    {this.props.files.map(file => (
                        <tbody>

                        {/*<span>{file.filename+file.filename1}</span>*/}
                        <tr key={file.filename} className="home-file-section">
                            <td className="folder-icon">
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
                            <td className="fileName">{file.filename}</td>
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
                                            () => this.props.handleStar(this.state)
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
                                            () => this.props.handleStar(this.state)
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
                                    href={"http://localhost:3001/uploads/" + file.filename}
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
                            {/*<td>*/}
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
                                    style={file.isDir == "true" ? {} : { display: "none" }}
                                    onClick={event => this.props.handleDelete(event, file.filename)}
                                >
                                    Delete
                                </Button>
                                </div>
                            </td>
                            <td className="delete-button">
                                <div className="form-group">
                                    <Button
                                        bsStyle="primary"
                                        bsSize="small"
                                        onClick={event => {
                                            this.setState(
                                                { shareDirectoryPath: file.filepath, isDir: true },
                                                () => this.openModalShare(this.state)
                                            );
                                        }}
                                    >
                                        Share With
                                    </Button>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal heading</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <DropdownButton title="Dropdown" id="bg-nested-dropdown" onSelect={event=>{this.setState({shareType:event});}}>
                                                <MenuItem eventKey="username">Username</MenuItem>
                                                <MenuItem eventKey="email">Email</MenuItem>
                                            </DropdownButton>
                                            <input
                                                type="email"
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
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>


        );
    }


}

export default ImageGridList;