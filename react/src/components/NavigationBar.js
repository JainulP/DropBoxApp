import React, { Component } from "react";
import '.././CSS/leftNav.css';

class NavigationBar extends Component{
    render()
    {
        return(

            <div className="maestro-nav__container" data-reactid="9">
                <div className="maestro-nav__panel" data-reactid="10">
                    <a className="maestro-nav__home-button" href="https://www.dropbox.com/" data-reactid="11">
                        <svg className="maestro-nav__logo" aria-label="Home" xmlns="http://www.w3.org/2000/svg" role="img" width="32px" height="32px" viewBox="0 0 32 32" data-reactid="12">
                            <path d="M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z" data-reactid="13"></path>
                        </svg>
                    </a>
                    <div className="maestro-nav__contents" data-reactid="14">
                        <ul className="maestro-nav__products" data-reactid="15">
                            <li data-reactid="16">
                                <div className="maestro-nav__product-wrapper" data-reactid="17">
                  <span className="ue-effect-container" data-reactid="18">
                     <a href="https://www.dropbox.com/h?role=personal" className="maestro-nav__product maestro-nav__active-product" id="home" target="_self" rel="noopener" data-reactid="19">
                        Home
                     </a>
                  </span>
                                </div>
                            </li>
                            <li data-reactid="21">
                                <div className="maestro-nav__product-wrapper" data-reactid="22">
                  <span className="ue-effect-container" data-reactid="23">
                     <a href="https://www.dropbox.com/home" className="maestro-nav__product" id="files" target="_self" rel="noopener" data-reactid="24">
                        Files
                     </a>
                  </span>
                                </div>
                            </li>
                            <li data-reactid="26">
                                <div className="maestro-nav__product-wrapper" data-reactid="27">
                  <span className="ue-effect-container" data-reactid="28">
                     <a href="https://www.dropbox.com/paper?_tk=left_nav_paper&amp;role=personal" className="maestro-nav__product" id="paper" target="_self" rel="noopener" data-reactid="29">
                        Paper
                         <span className="maestro-nav__product-badge" data-reactid="31">New</span>
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