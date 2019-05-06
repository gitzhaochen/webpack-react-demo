import React, {Component, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

const Animation = React.lazy(() => import(/* webpackChunkName: "animation" */ './animation/index'));
const Area = React.lazy(() => import(/* webpackChunkName: "area" */'./area/index'));
const FaceHeader = React.lazy(() => import(/* webpackChunkName: "face_header" */'./header/index'));

class Template extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="faces">
                <FaceHeader/>
                <Route path="/animation" component={Animation}/>
                <Route path="/area" component={Area}/>
            </div>
        )
    }
}

export default Template;