import React, {Component} from 'react';
import axios from '@/axios'
import api_city from '@/api/cities'
import Selction from './selection'

function get_childrens(parents, code) {
    let obj = parents.find(item => {
        return item.code === code
    })
    return obj.children || [];
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
        let res = await axios.get(api_city.cities)
        let datas = res.data
        let city_options = datas[0].children || []
        let city2_options = city_options[0].children || []
        let city3_options = city2_options[0].children || []
        let city4_options = city3_options[0].children || []
        this.setState({
            datas,
            province_options: datas,
            city_options,
            city2_options,
            city3_options,
            city4_options,
        })
    }

    componentDidMount() {
        this.get_json()
    }

    handleChange = (type, code) => {
        let datas = this.state.datas
        console.log(code, type)
        if (type === 'province') {
            let city_options = get_childrens(datas, code)
            let city2_options = city_options[0].children || []
            let city3_options = city2_options[0].children || []
            let city4_options = city3_options[0].children || []
            this.setState({
                city_options,
                city2_options,
                city3_options,
                city4_options,
            })
        }else if(type === 'city'){
            let city2_options = get_childrens(this.state.city_options, code)
            let city3_options = city2_options[0].children || []
            let city4_options = city3_options[0].children || []
            this.setState({
                city2_options,
                city3_options,
                city4_options,
            })
        }else if(type === 'city2'){
            let city3_options = get_childrens(this.state.city2_options, code)
            let city4_options = city3_options[0].children || []
            this.setState({
                city3_options,
                city4_options,
            })
        }else if(type === 'city3'){
            let city4_options = get_childrens(this.state.city3_options, code)
            this.setState({
                city4_options,
            })
        }

    }

    render() {
        let {province_options, city_options, city2_options, city3_options, city4_options} = this.state
        let level=this.props.level
        return (
            <div>
                <Selction type='province' options={province_options} handleChange={this.handleChange}></Selction>
                <Selction type='city' options={city_options} handleChange={this.handleChange}></Selction>
                <Selction type='city2' options={city2_options} handleChange={this.handleChange}></Selction>
                {level>3 && <Selction type='city3' options={city3_options} handleChange={this.handleChange}></Selction>}
                {level>4 && <Selction type='city4' options={city4_options} handleChange={this.handleChange}></Selction>}
            </div>
        );
    }
}

export default Template;