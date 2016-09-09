import 'babel-polyfill';

import App from './components/App';
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

class CharacterList extends React.Component {
  render() {
    const { viewer: { characters } } = this.props;

    const elements = characters.map((character) => (
      <li key={character.id}>
        <Link to={`/characters/${character.id}`}>
          {character.name}
        </Link>
      </li>
    ));

    return <div>
      <ul>{elements}</ul>
    </div>;
  }
}

CharacterList = Relay.createContainer(CharacterList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        characters {
          id,
          name,
        }
      }
    `,
  },
});

class Character extends React.Component {
  render() {
    const { character } = this.props;

    return <div>
      <h1>{character.name}</h1>
      <img height='100' src={character.thumbnail} width='100'/>
      <p>
        <Link to='/characters/'>
          {'View All'}
        </Link>
      </p>

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
