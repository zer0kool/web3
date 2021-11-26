
import React, {Component, useEffect, useState } from "react";
import { ethers } from "ethers";
import './Wave.css';
import M from "materialize-css";
import abi from '../utils/WavePortal.json';

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

const sendWave = async () => {

	const contractAddress = '0xbbb56565084f95c168885FB09725C5375b1511Fe';
	const contractABI = abi.abi;
 	try {
 		const {ethereum} = window;
 		if (ethereum) {
			var bot = createAvatar(style, {seed: contractAddress,});
			var botname = `<p>Agent: Smart Contract</p>`;
 			const provider = new ethers.providers.Web3Provider(ethereum);
 			const signer = provider.getSigner();
 			const waveDataContract = new ethers.Contract(contractAddress, contractABI, signer);

 			let agentName = document.querySelector('#agentName').value;
 			let message = document.querySelector('#message').value;
 			if (agentName.length === 0) {throw 'Please add a nickanme';}
 			if (message.length === 0) {throw 'Please add a message';}


			document.querySelector('#BuildWave .bot .image').innerHTML = bot;
			document.querySelector('#BuildWave #botname').innerHTML = botname;


 			const reportTxn = await waveDataContract.wave(message, agentName);

			console.log("Mining...", reportTxn.hash);
			let template = `<div class="status mining">
											<span class="name">We are mining the block</span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#BuildWave .logs').insertAdjacentHTML("beforeend", template);


 			await reportTxn.wait();
			console.log("Mined -- ", reportTxn.hash);
			let template1 = `<div class="status success">
											<span class="name">Wave has been submited</span>
											<span class="sender"><a href="https://rinkeby.etherscan.io/address/${reportTxn.hash}">View Transaction Details</a></span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#BuildWave .logs').insertAdjacentHTML("beforeend", template1);

			// finish by reloading
			window.location.reload(true);
 		}

 	} catch (error) {
 		  console.log(`Error inside the parsing function: ${error}`)
		  document.querySelector('#BuildWave .bot .image').innerHTML = bot;
			document.querySelector('#BuildWave #botname').innerHTML = botname;
			let metaMessage = `<div class="status error">
											<span class="sender">ERROR</span>
											<span class="name">${error.message ?? error}</span>`;
			document.querySelector('#BuildWave .logs').insertAdjacentHTML("beforeend", metaMessage);
 	}
 }

export default class BuildWave extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waveData: [],
						log: '',
            isLoading: false,
            error: null
        };
    }


    render() {
        const { waveData, isLoading, error, log} = this.state;

//        if ( !waveData ){ return <p className="black-text"> No Wallet Reports...</p>;}
        if ( isLoading ){var fetching = <p className="black-text"> Loading Wallet Reports...</p>;}
        if ( log ){ return <p className="black-text"> {log.message} </p>;}
        if ( error ){ return <p className="black-text"> {error.message} </p>;}

        return (
            <div id="BuildWave">
               {fetching}
								<div id="waveForm" className="modal modal-fixed-footer">
									<div className="modal-content">
									<div className="h4tch1" dangerouslySetInnerHTML={{ __html: this.state.waveData }} />
										<h4>Wave to the developer</h4>
										<p>I will generate an unique agent avatar for you.</p>
										<div className="reportBlock">
											<div className="row">
												<div className="input-field col s12 m6">
													<input placeholder="nickaname" id="agentName" type="text" className="validate"></input>
													<label htmlFor="agent_name">Give youself a nickname</label>
												</div>
												<div className="input-field col s12">
													<textarea placeholder="Say somthing.." id="message" type="text" className="validate materialize-textarea"/>
													<label htmlFor="mwssage">Let me know what you think of my project</label>
												</div>
											</div>
											<div className="logbox">
												<div className="bot">
													<div className="image"></div>
													<span id="botname"> Wave Portal console log.</span>
												</div>
												<div className="logs"></div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<a href="#!" className="waves-effect waves-green btn-flat" onClick={sendWave}>Wave Me</a>
									</div>
								</div>
            </div>
        );
    }


    componentDidMount = async () =>{

				this.setState({ isLoading: true })
        let self = this
        let dataParsed = [];


			// build avatar
				let svg = createAvatar(style, {
					seed: 'h4tch1',
					// ... and other options
				});
			dataParsed.push(svg);

			self.setState({ waveData: dataParsed, isLoading: false })
		}

}
