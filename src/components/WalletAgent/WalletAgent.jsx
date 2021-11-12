import React, { Component, useEffect, useState  } from "react";
import { ethers } from "ethers";
import M from "materialize-css";
import abi from './utils/WalletAgent.json';
import "./WalletAgent.css";
import BuildReport from "./modules/BuildReport/BuildReport";
import Loading from "../Loading/Loading";
import MetaMask from "../MetaMask/MetaMask";
import ValidateReport from "./modules/ValidateReport/ValidateReport";


function validateForm(e){
//	debugger;
	let id = e.target.dataset.id;
	let report = document.querySelector(`#report${id}`);
	let reportData = {
		id: id,
		name: report.querySelector('#agentName').innerText,
		addr: report.querySelector('#agentAddr').innerText,
		badAddr: report.querySelector('#badAddr').innerText,

	}

	let reviewTemplate = `<div class="review">
											<span><i class="material-icons">fingerprint</i><b>Report ID: </b>${"0xDWC"+reportData.id}</span>
											<span><i class="material-icons">face</i><b>Agent's Name: </b>${reportData.name}</span>
											<span><i class="material-icons">security</i><b>Agent Address: </b>${reportData.addr}</span>
											<span><i class="material-icons">bug_report</i><b>Reported Address: </b>${reportData.badAddr}</span>
												</div>
											`;
	document.querySelector('#ValidateReport .reportBlock .reviewData').innerHTML = reviewTemplate;


	console.log(reportData);
		var elem = document.querySelector('#validateModal');
    M.Modal.getInstance(elem).open();
}

export default class WalletAgent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            walletAgent: [],
						contractAddress: "0xD76C4D8A0E787B4863d8C988adABF5C17eC50Fd1",
            isLoading: false,
            error: null
        };
    }

    render() {

        const { walletAgent, isLoading, error} = this.state;

        if ( !walletAgent ){ return <p className="black-text"> No Wallet Reports...</p>;}
        if ( isLoading ){var fetching = <Loading />;}
        if ( error ){ return <p className="black-text"> {error.message} </p>;}

        return (
            <div id="data">
              <MetaMask/>
               <BuildReport/>
               <ValidateReport/>
                <h5>Top 10 Reported Wallets</h5>
                <div className="loader">
                	{fetching}
                </div>
                <table className="striped highlight responsive-table">
									<thead>
										<tr>
												<th>#</th>
												<th>Agent</th>
												<th>Report</th>
										</tr>
									</thead>
									<tbody>
										{walletAgent.map( (report, index) =>
										<tr id={"report"+report.id} key={index}>
											<td id="reportID">{index + 1}</td>
											<td>
												<div className="blockReport">
													<span><b>Name: </b><span id="agentName">{report.agentName}</span> <button id="tip" className="tip btn-small right"><i class="tiny material-icons">loyalty</i>Tip Agent</button></span>
													<span><b>Address: </b><span id="agentAddr">{report.angentAddress}</span></span>
												</div>
											</td>
											<td>
												<div className="blockReport">
													<span><b>Validation: </b>122545 confirmations <button id="validate" data-id={report.id} onClick={validateForm} className="tip btn-small right"><i class="tiny material-icons">verified_user</i>Validate</button></span>
													<span><b>Address: </b><span id="badAddr">{report.badAddress}</span></span>
												</div>
											</td>
										</tr>)}
									</tbody>
								</table>
            </div>
        );
    }

    componentDidMount = async () =>{
				this.setState({ isLoading: true });
//				MetaMask();
				const contractAddress = '0xD76C4D8A0E787B4863d8C988adABF5C17eC50Fd1';
				const contractABI = abi.abi;

        let self = this;
        let dataParsed = [];
					try {
						const { ethereum } = window;
						if (ethereum) {
							const provider = new ethers.providers.Web3Provider(ethereum);
							const signer = provider.getSigner();
							const walletAgentContract = new ethers.Contract(contractAddress, contractABI, signer);
							const reports = await walletAgentContract.getAllReports();
							reports.forEach(report => {
								dataParsed.push({id:parseInt(report.id), timestamp: new Date(report.timestamp * 1000).toGMTString(), agentName: report.nickname, angentAddress: report.agent, badAddress: report.reportedAddress })
							});
						}

						console.log(dataParsed)
					}catch(error) {console.log(`Error inside the parsing function: ${error}`)}

			self.setState({ walletAgent: dataParsed, isLoading: false })
			console.log("Contract: " + this.state.contractAddress)
		}
}
