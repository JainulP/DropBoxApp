import React, { Component } from "react";
import '.././CSS/homeHead.css';

class HomePageHeader extends Component{
    render()
    {
        return(
            <div className="page-header__shadow">
                <div className="page-header">
                    <div className="page-header__title">
                        <h1 className="page-header__heading">{this.props.head}</h1>
                    </div>
                    {/*<div className="top-menu-container"></div>*/}
                    {/*<div className="search-bar--container u-l-fr">*/}
                        {/*<div className="search-bar">*/}
                            {/*<input className="search-bar__text-input" placeholder="Search" value=""/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default  HomePageHeader;