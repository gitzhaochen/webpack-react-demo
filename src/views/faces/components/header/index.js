import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import './index.styl'

class HeaderTemplate extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        bb:'bbbb'
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
                            <div onClick={this.logoClick} className="logo">DoIt</div>
                        </div>
                    </div>
                    <div className="c-content w-560">
                        <p style={{ color : this.props.themeColor }}>this is content</p>
                        <p style={{ color : this.props.themeColor }}>{this.state.bb}</p>
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        themeColor: state.home.themeColor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({type: 'CHANGE_COLOR', themeColor: color})
        }
    }
}

HeaderTemplate = connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate)

export default withRouter(HeaderTemplate);