import React, { Component, useEffect, useState  } from "react";
import { ethers } from "ethers";
import M from "materialize-css";
import abi from './utils/WalletAgent.json';
import "./WalletAgent.css";

export default class WalletAgent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletAgent: [],
            isLoading: false,
            error: null
        };
    }

    render() {

        const { walletAgent, isLoading, error } = this.state;

        if ( !walletAgent ){ return <p className="black-text"> No Wallet Reports...</p>;}
        if ( isLoading ){var fetching = <p className="black-text"> Loading Wallet Reports...</p>;}
        if ( error ){ return <p className="black-text"> {error.message} </p>;}

        return (
            <div id="data">
                <h5>Top 10 Reported Wallets</h5>
                 {fetching}
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
										<tr>
											<td>{report.id}</td>
											<td>
												<div className="blockReport">
													<span><b>Name: </b>{report.agentName} <button className="tip btn-small">Tip Agent</button></span>
													<span><b>Address: </b>{report.angentAddress}</span>
												</div>
											</td>
											<td>
												<div className="blockReport">
													<span><b>Validation: </b>122545 confirmations</span>
													<span><b>Address: </b>{report.badAddress}</span>
												</div>
											</td>
										</tr>)}
									</tbody>
								</table>
            </div>
        );
    }

    componentDidMount = async () =>{
				const contractAddress = '0xe8dF7C21fB5E74e605178c39998c1Bc92D5abe66';
				const contractABI = abi.abi;

				this.setState({ isLoading: true })
        let self = this
        let dataParsed = [];


// 				const getAllReports = async () => {
					try {
						const { ethereum } = window;
						if (ethereum) {
//							const provider = new ethers.providers.Web3Provider(ethereum);
//							const signer = provider.getSigner();
//							const walletAgentContract = new ethers.Contract(contractAddress, contractABI, signer);
//							const reports = await walletAgentContract.getAllreports();
//							reports.forEach(report => {
//								dataParsed.push({id:report.id, timestamp: new Date(report.timestamp * 1000).toGMTString(), agentName: report.nickname, angentAddress: report.agent, badAddress: report.reportedAddress })
//							});
							dataParsed.push({id:"1", date: "10.11.2021", agentName: "zer0kool", angentAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", badAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"})
							dataParsed.push({id:"1", date: "10.11.2021", agentName: "zer0kool", angentAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", badAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"})
							dataParsed.push({id:"1", date: "10.11.2021", agentName: "zer0kool", angentAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", badAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"})
						}

					}catch(error) {console.log(`Error inside the parsing function: ${error}`)}
//    	}
			console.log(dataParsed)
			self.setState({ walletAgent: dataParsed, isLoading: false })


		}
}
