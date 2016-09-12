import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import CharacterList from './CharacterList';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';

class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div id='marvel-explorer-container'>
      <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                {'Marvel Explorer'}
              </Link>

            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li>
              <Link to='/characters'>
                {'Characters'}
              </Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


      {children}</div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any,
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        characters(first: 10) {
          ${CharacterList.getFragment('characters')}
        }
      }
    `,
  },
});
