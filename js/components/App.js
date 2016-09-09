import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div id='marvel-explorer-container'>{children}</div>
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
        characters {
          name,
          description,
          thumbnail,
        }
      }
    `,
  },
});
