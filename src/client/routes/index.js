import React from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { HomeView } from './Home';

const RouterProvider = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomeView} />
      </Switch>
    </Router>
  );
};

RouterProvider.propTypes = {
  history: object.isRequired,
};

export default RouterProvider;
