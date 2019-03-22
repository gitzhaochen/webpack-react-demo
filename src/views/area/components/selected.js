import React, {Component} from 'react';

class Template extends Component {

    // componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
    //         console.log('options-update')
    //         this.setState({
    //             code: nextProps.options[0].code
    //         })
    //     }
    // }
    render() {
        let {res,level} = this.props
        res=res.slice(0,level)
        return (
            <div>
                当前选中：{res.map(item=>{
                    return item && item.name
                }).join('-')}
            </div>
        );
    }
}

export default Template;