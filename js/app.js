import 'babel-polyfill';

import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware, IndexRoute, browserHistory } from 'react-router';

const ViewerQueries = {
  characters: () => Relay.QL`query { characters }`,
};

const CharacterQueries = {
  character: () => Relay.QL`query { character(name: $characterId) }`,
};

class CharacterList extends React.Component {
  render() {
    return <div />;
  }
}

class Character extends React.Component {
  render() {
    const { character } = this.props;

    return <div>
      <h1>{character.name}</h1>
      <img height='100' src={character.thumbnail} width='100'/>
    </div>;
  }
}

Character.propTypes = {
  character: React.PropTypes.object,
};

Character = Relay.createContainer(Character, {
  fragments: {
    character: () => Relay.QL`
      fragment on Character {
        name,
        description,
        thumbnail,
      }
    `,
  },
});

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
        render={({ props }) => props ? <Character {...props} /> : <div className='loading' />}
      />
    </Route>
  </Route>
</Router>;

ReactDOM.render(AppRouter, container);
