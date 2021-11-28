import React, { Component } from "react";
import {Link} from "react-router-dom";

//CSS
import "./Header.css";


//const logo = process.env.PUBLIC_URL + '/assets/images';


export default class Header extends Component {
  render() {
    return (
      <div className="Header">
          <nav>
            <div className="nav-wrapper blue-grey darken-4">
               <a href="/" className="left brand-logo"><i className="material-icons">fingerprint</i>DWEBCREW</a>
								<ul className="right">
									<li><a href="/wave"><i className="material-icons">face</i></a></li>
									<li><a href="/explore"><i className="material-icons">view_module</i></a></li>
									<li><a href="/nft"><i className="material-icons">local_activity</i></a></li>
								</ul>
            </div>
          </nav>
      </div>
    );
  }
}
