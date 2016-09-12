import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import {
  ListGroup,
  ListGroupItem,
  Media,
  Image,
} from 'react-bootstrap';
class CharacterList extends React.Component {
  renderCharacters(edge) {
    const character = edge.node;
    return (
      <Media key={character.id}>
        <Media.Left align='top'>
          <Link to={`/characters/${character.id}`}>
            <Image width={64} height={64} src={character.thumbnail} alt='Image'/>
          </Link>
        </Media.Left>
        <Media.Body>
          <Link to={`/characters/${character.id}`}>
            <Media.Heading>{character.name}</Media.Heading>
          </Link>

          <p>{character.description}</p>

        </Media.Body>
      </Media>
    );
    return (
      <ListGroupItem key={character.id}>
        <Link to={`/characters/${character.id}`}>
          {character.name}
        </Link>
      </ListGroupItem>
    );
  }
  render() {

    const { characters } = this.props;

    const elements = characters.edges.map(this.renderCharacters);

    return <div>
      <ListGroup>{elements}</ListGroup>
    </div>;
  }
}

CharacterList.propTypes = {
  characters: React.PropTypes.object,
  relay: React.PropTypes.object,
};

CharacterList = Relay.createContainer(CharacterList, {
  fragments: {
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id,
            name,
            thumbnail,
            description,
          }
        }
      }
    `,
  },
});

export default CharacterList;
