import 'babel-polyfill';

import CharacterIndex from './containers/CharacterIndex';
import ComicShow from './containers/ComicShow';
import SeriesShow from './containers/SeriesShow';
import CharacterShow from './containers/CharacterShow';

import App from './components/App';
import Loader from './components/Loader';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware, IndexRoute, browserHistory, Link } from 'react-router';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const CharacterQueries = {
  character: () => Relay.QL`query { character(id: $characterId) }`,
};

const ComicQueries = {
  comic: () => Relay.QL`query { comic(id: $comicId) }`,
};

const SeriesShowQueries = {
  series: () => Relay.QL`query {series(id: $seriesId) }`,
};

const container = document.getElementById('root');

// TODO: Split out router and routes.
const appRouter = <Router
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
      component={CharacterIndex}
      queries={ViewerQueries}
    />

    <Route
      component={CharacterShow}
      path=':characterId'
      queries={CharacterQueries}
    />
  </Route>
  <Route path='series'>
    <Route
      component={SeriesShow}
      path=':seriesId'
      queries={SeriesShowQueries}
      render={({ props }) => props ? <SeriesShow {...props}/> : <Loader />}
      />
  </Route>
    <Route path='comics'>
      <Route
        component={ComicShow}
        path=':comicId'
        queries={ComicQueries}
        render={({ props }) => props ? <ComicShow {...props}/> : <Loader />}
        />
    </Route>

  </Route>
</Router>;

ReactDOM.render(appRouter, container);
