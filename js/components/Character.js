import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import ComicList from './ComicList';

class Character extends React.Component {
  render() {
    const { character } = this.props;

    return <div>
      <h1>{character.name}</h1>
      <img height='100' src={character.thumbnail} width='100'/>
      <p>{character.description}</p>
      <p>
        <Link to='/characters/'>
          {'View All'}
        </Link>
      </p>

      <ComicList comics={character.comics} />
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
        comics {
          ${ComicList.getFragment('comics')}
        }
      }
    `,
  },
});

export default Character;
