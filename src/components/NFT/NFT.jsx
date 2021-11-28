import React, { Component } from "react";
import "./NFT.css";
import MetaMask from "../MetaMask/MetaMask";


export default class NFT extends Component {
    render() {
        return (
           <div className="Main">
              <div className="info">
              		<h1>NFT Collections</h1>
									<p className="slogan">Agents NFTs</p>
									<div className="container">
									</div>
              </div>
							<div className="container">
								<MetaMask/>
								<h5> NFT section comming soon! </h5>
						</div>
           </div>
        );
    }
}
