import React, {Component} from 'react';
import axios from '@/axios'
import api_city from '@/api/cities'
import Selction from './selection'
import Selected from './selected'

function get_item(parents, code) {
    let obj = parents.find(item => {
        return item.code === code
    })
    return obj || {children:[]};
}

class Template extends Component {
    state = {
        datas: [],
        province_options: [],
        city_options: [],
        city2_options: [],
        city3_options: [],
        city4_options: [],
    }

    get_json = async () => {
        let url = '/assets/pcas-code.json'
        let res = await axios.get(url)
        let datas = res.data
        let city_options = datas[0].children || []
        let city2_options = city_options[0].children || []
        let city3_options = city2_options[0].children || []
        let city4_options = city3_options[0].children || []
        let province = datas[0]
        let city = city_options[0]
        let city2 = city2_options[0]
        let city3 = city3_options[0]
        let city4 = city4_options[0]
        this.setState({
            datas,
            province_options: datas,
            city_options,
            city2_options,
            city3_options,
            city4_options,
            province,
            city,
            city2,
            city3,
            city4,
        })
    }

    componentDidMount() {
        this.get_json()
    }

    handleChange = (type, code) => {
        let datas = this.state.datas
        console.log(code, type)
        if (type === 'province') {
            let province = get_item(datas, code)
            let city_options = province.children || []
            let city2_options = city_options[0].children || []
            let city3_options = city2_options[0].children || []
            let city4_options = city3_options[0].children || []
            let city = city_options[0]
            let city2 = city2_options[0]
            let city3 = city3_options[0]
            let city4 = city4_options[0]
            this.setState({
                city_options,
                city2_options,
                city3_options,
                city4_options,
                province,
                city,
                city2,
                city3,
                city4,
            })
        } else if (type === 'city') {
            let city = get_item(this.state.city_options, code)
            let city2_options = city.children || []
            let city3_options = city2_options[0].children || []
            let city4_options = city3_options[0].children || []
            let city2 = city2_options[0]
            let city3 = city3_options[0]
            let city4 = city4_options[0]
            this.setState({
                city2_options,
                city3_options,
                city4_options,
                city,
                city2,
                city3,
                city4,
            })
        } else if (type === 'city2') {
            let city2 = get_item(this.state.city2_options, code)
            let city3_options = city2.children || []
            let city4_options = city3_options[0].children || []
            let city3 = city3_options[0]
            let city4 = city4_options[0]
            this.setState({
                city3_options,
                city4_options,
                city2,
                city3,
                city4,
            })
        } else if (type === 'city3') {
            let city3 = get_item(this.state.city3_options, code)
            let city4_options = city3.children || []
            let city4 = city4_options[0]

            this.setState({
                city4_options,
                city3,
                city4
            })
        }else if (type === 'city4') {
            let city4 = get_item(this.state.city4_options, code)
            this.setState({
                city4
            })
        }

    }

    render() {
        let {
            province_options,
            city_options,
            city2_options,
            city3_options,
            city4_options,
            province,
            city,
            city2,
            city3,
            city4
        } = this.state;
        let level = this.props.level
        return (
            <div className='city-selection'>
                <Selction type='province' options={province_options} handleChange={this.handleChange}></Selction>
                <Selction type='city' options={city_options} handleChange={this.handleChange}></Selction>
                <Selction type='city2' options={city2_options} handleChange={this.handleChange}></Selction>
                {level > 3 &&
                <Selction type='city3' options={city3_options} handleChange={this.handleChange}></Selction>}
                {level > 4 &&
                <Selction type='city4' options={city4_options} handleChange={this.handleChange}></Selction>}
                <Selected level={level} res={[province,
                    city,
                    city2,
                    city3,
                    city4,]}></Selected>
            </div>

        );
    }
}

export default Template;