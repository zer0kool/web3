import React, { Component } from "react";
import "./Main.css";



export default class Main extends Component {
    render() {
        return (
           <div className="Main">
              <div className="info">
              		<h1>Wallet Auditor</h1>
									<p class="slogan">Providing trust back to the community</p>
									<div class="container">
										<div class="searchBar">
											<span class="txt">Address</span>
											<span class="search"><input></input></span>
											<span class="icon"></span>
										</div>
									</div>
              </div>
							<div className="container">
								<div id="data">
								<h5>Top 10 Reported Wallets</h5>
								<table class="striped highlight">
									<thead>
										<tr>
												<th>Rank</th>
												<th>Wallet Name</th>
												<th>Address</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>1</td>
											<td>Eclair</td>
											<td>0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266</td>
										</tr>
										<tr>
											<td>2</td>
											<td>Jellybean</td>
											<td>0x70997970c51812dc3a010c7d01b50e0d17dc79c8</td>
										</tr>
										<tr>
											<td>3</td>
											<td>Lollipop</td>
											<td>0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc</td>
										</tr>
										<tr>
											<td>4</td>
											<td>Robot</td>
											<td>0x90f79bf6eb2c4f870365e785982e1f101e93b906</td>
										</tr>
										<tr>
											<td>5</td>
											<td>Mars</td>
											<td>0x15d34aaf54267db7d7c367839aaf71a00a2c6a65</td>
										</tr>
										<tr>
											<td>6</td>
											<td>Momo</td>
											<td>0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc</td>
										</tr>
										<tr>
											<td>7</td>
											<td>lair</td>
											<td>0x976ea74026e726554db657fa54763abd0c3a0aa9</td>
										</tr>
										<tr>
											<td>8</td>
											<td>Jelom</td>
											<td>0x14dc79964da2c08b23698b3d3cc7ca32193d9955</td>
										</tr>
										<tr>
											<td>9</td>
											<td>Rio</td>
											<td>0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f</td>
										</tr>
										<tr>
											<td>10</td>
											<td>Xor</td>
											<td>0xa0ee7a142d267c1f36714e4a8f75612f20a79720</td>
										</tr>
									</tbody>
								</table>
								</div>
						</div>
           </div>
        );
    }
}
