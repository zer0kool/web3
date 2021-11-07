import React, { Component } from "react";
import { ethers } from "ethers";
import './WavesPortal.css';


export default class WavesPortal extends Component {


	render() {
		return (
			<div className="mainContainer">
				<div className="dataContainer">
					<div className="header">
					👋 Hey there!
					</div>
					<div className="bio">
					I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
					</div>
					<button className="waveButton" >
						Wave at Me
					</button>
				</div>
			</div>
		);
	}
}
