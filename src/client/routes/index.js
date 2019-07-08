import React from 'react';
import { object } from 'prop-types';
import { Router } from 'react-router-dom';

import { HomeView } from './Home';

const RouterProvider = ({ history }) => {
  return (
    <Router history={history}>
      <HomeView/>
    </Router>
  );
};

RouterProvider.propTypes = {
  history: object.isRequired,
};

export default RouterProvider;
