import React, {Component} from "react";

import './Loading.css'
export default class Loading extends Component {
    render() {
        return <div id="loading" className="progress">
        <div className="indeterminate"></div>
      	</div>
    }
}
