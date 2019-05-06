import React, {Component} from 'react';

class Template extends Component {
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