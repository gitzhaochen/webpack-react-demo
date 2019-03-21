import React, {Component} from 'react';
import Stage from './components/stage'

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_index: 0,
            points: [],
            canvas: {
                width: 600,
                height: 300
            },
            ctx: null
        };
    }

    get_point = (num) => {
        let points = []
        while (num > points.length) {
            let point = {
                x: Math.ceil(Math.random() * this.state.canvas.width),
                y: Math.ceil(Math.random() * this.state.canvas.height),
            };
            points.push(point)
        }
        return points
    }
    draw_line = (a, b) => {
        //划线
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(a.x, a.y);
        this.state.ctx.lineTo(b.x, b.y);
        this.state.ctx.stroke();
        this.state.ctx.closePath();
    }
    handler_emit_ctx = (ctx) => {
        this.setState({
            ctx
        })
    }

    componentWillMount() {
        console.log('animation-will-mount')
        let points = this.get_point(20);
        this.setState({
            points
        })
    }

    start = () => {
        clearInterval(this.state.timer)
        let cur_index = this.state.cur_index
        let points = this.state.points
        let timer = setInterval(() => {
            if (cur_index >= points.length - 1) {
                cur_index = 0
                clearInterval(timer)
                return;
            }
            let a = points[cur_index]
            let b = points[cur_index + 1]
            this.draw_line(a, b)
            cur_index++
            this.setState({
                cur_index
            })
        }, 500)
        this.setState({
            timer
        })
    }
    pause = () => {
        clearInterval(this.state.timer)
    }
    reset = () => {
        this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        clearInterval(this.state.timer)
        let points = this.get_point(20);
        this.setState({
            points,
            cur_index: 0,
            timer: null
        })
    }

    render() {
        console.log('animation-rendor')
        let canvas = this.state.canvas
        return (
            <div className="board">
                <Stage handler_emit_ctx={this.handler_emit_ctx} width={canvas.width} height={canvas.height}
                       points={this.state.points}/>
                <div className="bot">
                    <div className="btn start" onClick={this.start}>start</div>
                    <div className="btn pause" onClick={this.pause}>pause</div>
                    <div className="btn reset" onClick={this.reset}>reset</div>
                </div>
            </div>

        );
    }
}

export default Template;
