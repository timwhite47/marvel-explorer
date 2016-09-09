import 'babel-polyfill';

import App from './components/App';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware, IndexRoute, browserHistory } from 'react-router';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const CharacterQueries = {
  character: () => Relay.QL`query { character(id: $characterId) }`,
};

const container = document.getElementById('root');
const AppRouter = <Router
  environment={Relay.Store}
  history={browserHistory}
  render={applyRouterMiddleware(useRelay)}
>
  <Route
    component={App}
    path='/'
    queries={ViewerQueries}
  >
    <Route path='characters'>
      <IndexRoute
        component={CharacterList}
        queries={ViewerQueries}
      />
      <Route
        component={Character}
        path=':characterId'
        queries={CharacterQueries}
      />
    </Route>
  </Route>
</Router>;

ReactDOM.render(AppRouter, container);
