import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';

import './index.styl'

class Template extends Component {
    constructor(props) {
        super(props);
    }

    logoClick = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="face-header">
                <div className="face-header-container">
                    <div className="l-side">
                        <div className="logo-box">
                            <div onClick={this.logoClick} className="logo">React</div>
                        </div>
                    </div>
                    <div className="c-content w-560">
                    </div>
                    <div className="r-side">
                        <div className="account-actions">
                            <Link to='/animation' className="action">Canvas</Link>
                            <Link to='/area' className="action">省市联动</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Template);