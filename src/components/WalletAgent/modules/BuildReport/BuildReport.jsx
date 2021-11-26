import React, { Component, useEffect, useState  } from "react";
import { ethers } from "ethers";
import M from "materialize-css";
import abi from '../../utils/WalletAgent.json';
import "./BuildReport.css";

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

const sendReport = async () => {

	const contractAddress = '0xD76C4D8A0E787B4863d8C988adABF5C17eC50Fd1';
	const contractABI = abi.abi;
 	try {
 		const {ethereum} = window;
 		if (ethereum) {
			var bot = createAvatar(style, {seed: contractAddress,});
			var botname = `<p>Agent: Smart Contract</p>`;
 			const provider = new ethers.providers.Web3Provider(ethereum);
 			const signer = provider.getSigner();
 			const walletAgentContract = new ethers.Contract(contractAddress, contractABI, signer);
debugger;

 			let agentName = document.querySelector('#agentName').value;
 			let addr = document.querySelector('#badWallet').value;
 			if (agentName.length === 0) {M.toast({html: 'Please add your nickname!',classes: 'red'});return;}
 			if (addr.length === 0) {M.toast({html: 'Please add the address!',classes: 'red'});return;}

 			const reportTxn = await walletAgentContract.addReport(addr, agentName);
 			console.log("Mining...", reportTxn.hash);
			let template = `<div class="status mining">
											<span class="name">We are mining the block</span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#BuildReport .logs').insertAdjacentHTML("beforeend", template);


 			await reportTxn.wait();
			console.log("Mined -- ", reportTxn.hash);
			let template1 = `<div class="status success">
											<span class="name">Report has been submitted</span>
											<span class="sender"><a href="https://rinkeby.etherscan.io/address/${reportTxn.hash}">View Transaction Details</a></span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#BuildReport .logs').insertAdjacentHTML("beforeend", template1);

 		}

 	} catch (error) {
 		  console.log(`Error inside the parsing function: ${error}`)
			document.querySelector('#BuildReport .bot .image').innerHTML = bot;
			document.querySelector('#BuildReport #botname').innerHTML = botname;
			let metaMessage = `<div class="status error">
											<span class="sender">ERROR</span>
											<span class="name">${error.message ?? error}</span>`;
			document.querySelector('#BuildReport .logs').insertAdjacentHTML("beforeend", metaMessage);
 	}
 }

export default class BuildReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletReport: [],
						log: '',
            isLoading: false,
            error: null
        };
    }


    render() {
        const { walletAgent, isLoading, error, log} = this.state;

//        if ( !walletAgent ){ return <p className="black-text"> No Wallet Reports...</p>;}
        if ( isLoading ){var fetching = <p className="black-text"> Loading Wallet Reports...</p>;}
        if ( log ){ return <p className="black-text"> {log.message} </p>;}
        if ( error ){ return <p className="black-text"> {error.message} </p>;}

        return (
            <div id="BuildReport">
               {fetching}
                <button className="tip btn-small modal-trigger" href="#modal1">Report Wallet</button>

								<div id="modal1" className="modal modal-fixed-footer">
									<div className="modal-content">
										<h4>Wallet Report</h4>
										<p>You are about to report an abusive wallet address.</p>
										<div className="reportBlock">
											<div className="row">
												<div className="input-field col s12 m6">
													<input placeholder="nickaname" id="agentName" type="text" className="validate"></input>
													<label htmlFor="agent_name">Give youself a nickname</label>
												</div>
												<div className="input-field col s12 m6">
													<input placeholder="abusive wallet" id="badWallet" type="text" className="validate"></input>
													<label htmlFor="badWallet">Enter the bad wallet</label>
												</div>
											</div>
											<div className="logbox">
												<div className="bot">
													<div className="image"></div>
													<span id="botname"> Wallet Agent Console Log.</span>
												</div>
												<div className="logs"></div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<a href="#!" className="waves-effect waves-green btn-flat" onClick={sendReport}>Agree</a>
									</div>
								</div>
            </div>
        );
    }


    componentDidMount = async () =>{

				this.setState({ isLoading: true })
        let self = this
        let dataParsed = [];

			self.setState({ walletReport: dataParsed, isLoading: false })
		}

}
