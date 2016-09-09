import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

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

CharacterList.propTypes = {
  viewer: React.PropTypes.object,
};

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

export default CharacterList;
