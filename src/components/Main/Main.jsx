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

								</div>
						</div>
           </div>
        );
    }
}
