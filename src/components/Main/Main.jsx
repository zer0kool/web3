import React, { Component } from "react";
import "./Main.css";
//import WavesPortal from '../WavesPortal/WavesPortal';


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
								<div id="data">
								<h5>Top 10 Reported Wallets</h5>
								<table className="striped highlight responsive-table">
									<thead>
										<tr>
												<th>#</th>
												<th>Agent</th>
												<th>Report</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>1</td>
											<td>
												<div className="blockReport">
													<span><b>Name: </b>zer0kool <button className="tip btn-small">Tip Agent</button></span>
													<span><b>Address: </b>0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266</span>
												</div>
											</td>
											<td>
												<div className="blockReport">
													<span><b>Validation: </b>122545 confirmations</span>
													<span><b>Address: </b>0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266</span>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
						</div>

           </div>
        );
    }
}
