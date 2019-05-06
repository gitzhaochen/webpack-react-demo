import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

const Face = React.lazy(() => import(/* webpackChunkName: "face" */ './views/faces/index'));
const Notfound = React.lazy(() => import(/* webpackChunkName: "notfound" */ './views/notfound/index'));


class Template extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/" component={Face}/>
                        <Route component={Notfound} />
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}

export default Template;
