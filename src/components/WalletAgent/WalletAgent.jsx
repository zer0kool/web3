import React, { Component, useEffect, useState  } from "react";
import { ethers } from "ethers";
import M from "materialize-css";
import abi from './utils/WalletAgent.json';
import "./WalletAgent.css";
import BuildReport from "./modules/BuildReport/BuildReport";
import Loading from "../Loading/Loading";


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

        const { walletAgent, isLoading, error } = this.state;

        if ( !walletAgent ){ return <p className="black-text"> No Wallet Reports...</p>;}
        if ( isLoading ){var fetching = <Loading />;}
        if ( error ){ return <p className="black-text"> {error.message} </p>;}

        return (
            <div id="data">
               <BuildReport />
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
										<tr key={index}>
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
				this.setState({ isLoading: true });

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
