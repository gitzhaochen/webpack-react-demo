import React, {Component} from 'react';

class Template extends Component {
    state = {
        code: ''
    }
    handleChange = () => {
        console.log(event)
        let code = event.target.value
        let type = this.props.type
        this.props.handleChange(type, code)
        this.setState({
            code
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
            console.log('options-update')
            this.setState({
                code: nextProps.options[0].code
            })
        }
    }

    render() {
        let options = this.props.options;
        if (!options.length) return null;
        let code = this.state.code
        return (
            <select
                value={code}
                style={{width: 120}}
                onChange={this.handleChange}
            >
                {options.map(item => <option value={item.code} key={item.code}>{item.name}</option>)}
            </select>
        );
    }
}

export default Template;