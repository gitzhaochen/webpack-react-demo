import React, {Component} from "react";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';

import FaceHeader from '../components/header'

class Home extends Component {
    constructor () {
        super()
        // this.state = { themeColor: '' }
    }

    // dispatch action 去改变颜色
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }
    render () {
        return (
            <div className='home page'>
                <FaceHeader></FaceHeader>
                <button
                    style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
                <button
                    style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this,'blue')}>Blue</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default withRouter(Home);