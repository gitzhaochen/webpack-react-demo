import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

const home = React.lazy(() => import(/* webpackChunkName: "home" */ './views/faces/home/index'));
const animation = React.lazy(() => import(/* webpackChunkName: "animation" */ './views/faces/animation/index'));
const area = React.lazy(() => import(/* webpackChunkName: "area" */'./views/faces/area/index'));

const dashboard = React.lazy(() => import(/* webpackChunkName: "dashboard" */ './views/dashboard/index'));
const notfound = React.lazy(() => import(/* webpackChunkName: "notfound" */ './views/notfound/index'));


class Template extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/" exact component={home}/>
                        <Route path="/animation" component={animation}/>
                        <Route path="/area" component={area}/>
                        <Route path="/dashboard" component={dashboard}/>
                        <Route component={notfound}/>
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}

export default Template;
