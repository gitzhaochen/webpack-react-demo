import React, {Component} from 'react';
import CitySelection from './components/city-selection'
import './index.styl'
class Template extends Component {
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
            <div className="page">
                <CitySelection level={3}/>
                <CitySelection level={4}/>
                <CitySelection level={5}/>
            </div>
        );
    }
}

export default Template;