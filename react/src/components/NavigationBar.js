import React, { Component } from "react";
import '.././CSS/leftNav.css';

class NavigationBar extends Component{
    render()
    {
        return(

            <div className="maestro-nav__container" data-reactid="9">
                <div className="maestro-nav__panel" data-reactid="10">
                    <a className="maestro-nav__home-button" href="/home" data-reactid="11">
                        <svg className="maestro-nav__logo" aria-label="Home" xmlns="http://www.w3.org/2000/svg" role="img" width="32px" height="32px" viewBox="0 0 32 32" data-reactid="12">
                            <path d="M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z" data-reactid="13"></path>
                        </svg>
                    </a>
                    <div className="maestro-nav__contents" data-reactid="14">
                        <ul className="maestro-nav__products" data-reactid="15">
                            <li data-reactid="16">
                                <div className="maestro-nav__product-wrapper" data-reactid="17">
                  <span className="ue-effect-container" data-reactid="18">
                     <a href="/home" className="maestro-nav__product maestro-nav__active-product" id="home" target="_self" rel="noopener" data-reactid="19">
                        Home
                     </a>
                  </span>
                                </div>
                            </li>
                            <li data-reactid="21">
                                <div className="maestro-nav__product-wrapper" data-reactid="22">
                  <span className="ue-effect-container" data-reactid="23">
                     <a href="/home" className="maestro-nav__product" id="files" target="_self" rel="noopener" data-reactid="24">
                        Files
                     </a>
                  </span>
                                </div>
                            </li>
                            <li data-reactid="26">
                                <div className="maestro-nav__product-wrapper" data-reactid="27">
                  <span className="ue-effect-container" data-reactid="28">
                     <a href="/about" className="maestro-nav__product" id="paper" target="_self" rel="noopener" data-reactid="29">
                       About
                     </a>
                  </span>
                                </div>
                                <div className="maestro-nav__product-wrapper" data-reactid="27">
                                    <span className="ue-effect-container" data-reactid="28">
                     <a href="/interests" className="maestro-nav__product" id="paper" target="_self" rel="noopener" data-reactid="29">
                       Interest
                     </a>
                  </span>
                                </div>
                                <div className="maestro-nav__product-wrapper" data-reactid="27">
                                    <span className="ue-effect-container" data-reactid="28">
                     <a href="/activityreport" className="maestro-nav__product" id="paper" target="_self" rel="noopener" data-reactid="29">
                       Activity Report
                     </a>
                  </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default  NavigationBar;