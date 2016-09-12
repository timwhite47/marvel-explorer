import React from 'react';
import { IndexRoute } from 'react-router';
import CharacterIndex from '../containers/CharacterIndex';
import Relay from 'react-relay';
import Loader from '../components/Loader';

const CharacterQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const CharacterIndexRoute = <IndexRoute
  component={CharacterIndex}
  queries={CharacterQueries}
/>;

export default CharacterIndexRoute;
