import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Comic extends React.Component {
  renderCharacters() {
    const { comic: { characters } } = this.props;

    const entries = characters.map((character) => (
      <li key={character.id}>
        <p>
          <Link to={`/characters/${character.id}`}>
            {character.name}
          </Link>
          <Link to={`/characters/${character.id}`}>
            <img height='125' src={character.thumbnail} width='75'/>
          </Link>
        </p>
      </li>
    ));

    return <ul>{entries}</ul>;
  }

  render() {
    const { comic: { title, thumbnail: { url: thumbnail } } } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <img height='250' src={thumbnail} width='150'/>
        {this.renderCharacters()}
      </div>
    );
  }
}

Comic.propTypes = {
  comic: React.PropTypes.object,
  relay: React.PropTypes.object,
};

Comic = Relay.createContainer(Comic, {
  fragments: {
    comic: () => Relay.QL`
      fragment on Comic {
          id,
          title,
         format,
         issueNumber,
         images {
           url,
         },
         thumbnail {
           url,
         },
         series {
           title,
         },
         characters {
           id,
           name,
           thumbnail
         }
      }
    `,
  },
});

export default Comic;
