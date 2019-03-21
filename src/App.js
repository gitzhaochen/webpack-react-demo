import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
const Animation = React.lazy(() => import(/* webpackChunkName: "animation" */ './views/animation/index'));
const Area = React.lazy(() => import(/* webpackChunkName: "area" */'./views/area/index'));


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
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                            <Link to="/area">Area</Link>
                        </li>
                    </ul>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/" component={Animation}/>
                            <Route path="/area" component={Area}/>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        )
    }
}

export default Template;
