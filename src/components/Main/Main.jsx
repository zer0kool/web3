import React, { Component } from "react";
import "./Main.css";
//import WavesPortal from '../WavesPortal/WavesPortal';
import WalletAgent from '../WalletAgent/WalletAgent';
import MetaMask from '../MetaMask/MetaMask';


export default class Main extends Component {
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
								<WalletAgent />
						</div>
           </div>
        );
    }
}
