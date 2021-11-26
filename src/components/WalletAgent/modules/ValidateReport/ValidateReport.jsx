import React, { Component, useEffect, useState  } from "react";
import { ethers } from "ethers";
import M from "materialize-css";
import abi from '../../utils/WalletAgent.json';
import "./ValidateReport.css";

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';


const confirmation = async () => {

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

			let reportID = 1;

			// Mining the block
 			const reportTxn = await walletAgentContract.validateReport(reportID);
			let template = `<div class="status mining">
											<span class="name">We are mining the block</span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#ValidateReport .logs').insertAdjacentHTML("beforeend", template);

			// The block has been mined
 			await reportTxn.wait();
			let template1 = `<div class="status success">
											<span class="name">Validation for report submited</span>
											<span class="sender"><a href="https://rinkeby.etherscan.io/address/${reportTxn.hash}">View Transaction Details</a></span>
											<span class="report">${reportTxn.hash}</span></div>`;
			document.querySelector('#ValidateReport .logs').insertAdjacentHTML("beforeend", template1);

 		}

 	} catch (error) {
		debugger;
 		  console.log(`Error inside the parsing function: ${error}`)
			document.querySelector('#ValidateReport .bot .image').innerHTML = bot;
			document.querySelector('#ValidateReport #botname').innerHTML = botname;
			let metaMessage = `<div class="status error">
											<span class="sender">ERROR</span>
											<span class="name">${error.message ?? error}</span>`;
			document.querySelector('#ValidateReport .logs').insertAdjacentHTML("beforeend", metaMessage);
 	}
 }

export default class validateReport extends Component {
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
            <div id="ValidateReport">
								<div id="validateModal" className="modal modal-fixed-footer">
									<div className="modal-content">
										<h4>Confirm Validation</h4>
										<p>You are about to validate a report.</p>
										<div className="reportBlock">
											<div className="reviewData"></div>
										  <div className="logbox">
												<div className="bot">
													<div className="image"></div>
													<span id="botname"> Wallet Agent console log.</span>
												</div>
												<div className="logs"></div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<a href="#!" className="waves-effect waves-green btn-flat" onClick={confirmation}>Agree</a>
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
