import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboard')
);

const Administrators = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './administrators')
);

const Users = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './users')
);

const Schedulings = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './schedulings')
);

const Notifications = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './notifications')
);

const Messages = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './messages')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboard`}
              />
              <Route
                path={`${match.url}/dashboard`}
                render={props => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/administrators`}
                render={props => <Administrators {...props} />}
              />
              <Route
                path={`${match.url}/users`}
                render={props => <Users {...props} />}
              />
              <Route
                path={`${match.url}/schedulings`}
                render={props => <Schedulings {...props} />}
              />
              <Route
                path={`${match.url}/notifications`}
                render={props => <Notifications {...props} />}
              />
              <Route
                path={`${match.url}/messages`}
                render={props => <Messages {...props} />}
              />
              
              {/* <Route
                path={`${match.url}/gogo`}
                render={props => <Gogo {...props} />}
              /> */}
              {/* <Route
                path={`${match.url}/second-menu`}
                render={props => <SecondMenu {...props} />}
              /> */}
              {/* <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              /> */}
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
