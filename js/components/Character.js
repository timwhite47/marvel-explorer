import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

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

export default Character;
