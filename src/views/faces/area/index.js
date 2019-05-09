import React, {Component} from 'react';
import CitySelection from './components/city-selection'
import './index.styl'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import FaceHeader from '../components/header'

class AreaTemp extends Component {
    state = {
        datas: [],
        province_options: [],
        city_options: [],
        city2_options: [],
        city3_options: [],
        city4_options: [],
    }

    render() {
        return (
            <div>
                <FaceHeader></FaceHeader>
                <div className="page">
                    {this.props.area_type}

                    {this.props.themeColor}
                    <CitySelection level={3}/>
                    <CitySelection level={4}/>
                    <CitySelection level={5}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        area_type: state.area.area_type,
        themeColor: state.home.themeColor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({type: 'CHANGE_TYPE', area_type: color})
        }
    }
}
AreaTemp = connect(mapStateToProps, mapDispatchToProps)(AreaTemp)

export default withRouter(AreaTemp);