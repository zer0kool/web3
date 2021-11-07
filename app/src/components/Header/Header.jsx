import React, { Component } from "react";

//CSS
import "./Header.css";


//const logo = process.env.PUBLIC_URL + '/assets/images';


export default class Header extends Component {
  render() {
    return (
      <div className="Header">
          <nav>
            <div className="nav-wrapper blue-grey darken-4">
               <a href="/" className="brand-logo"><i className="material-icons">fingerprint</i>DWEBCREW</a>
								<ul className="right hide-on-med-and-down">
									<li><a href="#"><i className="material-icons">search</i></a></li>
									<li><a href="#"><i className="material-icons">view_module</i></a></li>
									<li><a href="#"><i className="material-icons">refresh</i></a></li>
									<li><a href="#"><i className="material-icons">more_vert</i></a></li>
								</ul>
            </div>
          </nav>
      </div>
    );
  }
}
