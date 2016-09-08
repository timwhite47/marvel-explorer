import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    character: () => Relay.QL`
      query {
        character(name: "deadpool")
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
