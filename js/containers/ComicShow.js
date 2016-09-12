import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import CharacterList from '../components/CharacterList';

class Comic extends React.Component {
  renderCharacters() {
    const { comic: { characters } } = this.props;
    return <CharacterList characters={characters}/>;
  }

  renderSeries() {
    const { comic: { series: { title, id } } } = this.props;

    return (
      <h3>
        <Link to={`/series/${id}`}>{title}</Link>
      </h3>
    );
  }

  render() {
    const { comic: { title, thumbnail: { url: thumbnail } } } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <p>
          <img height='250' src={thumbnail} width='150'/>
        </p>
        <h1>Characters</h1>
        {this.renderCharacters()}
        <h1>Series</h1>
        {this.renderSeries()}
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
           id,
           title,
         },
         characters(first: 10) {
           ${CharacterList.getFragment('characters')}
         }
      }
    `,
  },
});

export default Comic;
