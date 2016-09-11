import 'babel-polyfill';

import App from './components/App';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import Loader from './components/Loader';
import Comic from './components/Comic';
import Series from './components/Series';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware, IndexRoute, browserHistory } from 'react-router';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const ComicQueries = {
  comic: () => Relay.QL`query { comic(id: $comicId) }`,
};

const CharacterQueries = {
  character: () => Relay.QL`query { character(id: $characterId) }`,
};

const SeriesQueries = {
  series: () => Relay.QL`query {series(id: $seriesId) }`
};

const container = document.getElementById('root');

// TODO: Split out router and routes.
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
  <Route path='series'>
    <Route
      component={Series}
      path=':seriesId'
      queries={SeriesQueries}
      render={({ props }) => props ? <Series {...props}/> : <Loader />}
      />
  </Route>
    <Route path='comics'>
      <Route
        component={Comic}
        path=':comicId'
        queries={ComicQueries}
        render={({ props }) => props ? <Comic {...props}/> : <Loader />}
        />
    </Route>
    <Route path='characters'>
      <IndexRoute
        component={CharacterList}
        queries={ViewerQueries}
        render={({ props }) => props ? <CharacterList {...props}/> : <Loader />}
      />
      <Route
        component={Character}
        path=':characterId'
        queries={CharacterQueries}
        render={({ props }) => props ? <Character {...props}/> : <Loader />}
      />

    </Route>
  </Route>
</Router>;

ReactDOM.render(AppRouter, container);
