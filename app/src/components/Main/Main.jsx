import React, { Component } from "react";

import "./Main.css";
import Loading from "../Loading/Loading";
import WavesPortal from "../WavesPortal/WavesPortal";





export default class Main extends Component {
    render() {
        return (
           <div className="Main">
              <Loading/>
              <WavesPortal/>
           </div>
        );
    }
}
