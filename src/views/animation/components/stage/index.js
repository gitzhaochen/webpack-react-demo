import React, {Component} from 'react';
import './stage.styl'

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            points: props.points
        };
    }

    draw_point = () => {
        //画点
        console.log('draw-point')
        this.state.points.forEach(point => {
            this.state.ctx.beginPath();
            this.state.ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            this.state.ctx.fillStyle = "rgba(0,0,0,1)";
            this.state.ctx.fill();
            this.state.ctx.closePath();
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.points) !== JSON.stringify(this.props.points)) {
            console.log('canvas-update')
            this.setState({
                points: nextProps.points
            }, () => this.draw_point())
        }
    }

    componentDidMount() {
        console.log('canvas-mount')
        let ctx = this.refs.canvas.getContext('2d');
        this.props.handler_emit_ctx(ctx)
        this.setState({
            ctx
        }, () => this.draw_point())
    }

    render() {
        console.log('canvas-rendor')
        return (
            <canvas id="canvas" ref="canvas" width={this.props.width} height={this.props.height}></canvas>
        )
    }
}

export default Template;