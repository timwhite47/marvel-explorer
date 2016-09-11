import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import ComicList from './ComicList';
import SeriesList from './SeriesList';
class Character extends React.Component {
  render() {
    const { character: { name, thumbnail, description, comics, series } } = this.props;

    return <div>
      <h1>{name}</h1>
      <img height='100' src={thumbnail} width='100'/>
      <p>{description}</p>
      <p>
        <Link to='/characters/'>
          {'View All'}
        </Link>
      </p>

      <h1>Series</h1>
      <SeriesList series={series} />

      <h1>Recent Comics</h1>
      <ComicList comics={comics} />
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
        series {
          ${SeriesList.getFragment('series')}
        }
      }
    `,
  },
});

export default Character;
