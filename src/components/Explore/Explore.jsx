import React, { Component } from "react";
import "./Explore.css";
import MetaMask from "../MetaMask/MetaMask";


export default class Explore extends Component {
    render() {
        return (
           <div className="Main">
              <div className="info">
              		<h1>Wallet Agent</h1>
									<p className="slogan">Providing trust back to the community</p>
									<div className="container">
										<div className="searchBar">
											<span className="txt">Address</span>
											<span className="search"><input></input></span>
											<span className="icon"></span>
										</div>
									</div>
              </div>
							<div className="container">
								<MetaMask/>
								<h5> Explore section comming soon! </h5>
						</div>
           </div>
        );
    }
}
