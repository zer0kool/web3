import React, { Component } from "react";

//CSS
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
					<footer>
            <div className="page-footer blue-grey darken-4">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">DWEBCREW</h5>
                            <p className="grey-text text-lighten-4">
                                Letting the community participate and report [wallet address] from ethereum.
                            </p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Resources</h5>
                            <ul className="footerLi">
                                <li>
                                    <a className="grey-text text-lighten-3" href="https://ethereum.org/en/">
                                        Ethereum
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2021 DWEBCREW
                        <a className="grey-text text-lighten-4 right" href="#!">
                            #BuidSpace
                        </a>
                    </div>
                </div>
            </div>
            </footer>
        );
    }
}
