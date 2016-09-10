import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

const PAGE_SIZE = 100;

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  loadMore(e) {
    const { relay } = this.props;
    const { variables: { limit } } = relay;

    e.preventDefault();
    this.setState({ loading: true });

    relay.setVariables({ limit: limit + PAGE_SIZE }, ({ done }) => {
      if (done) {
        this.setState({ loading: false });
      }
    });
  }

  search(search) {
    const { relay } = this.props;

    relay.setVariables({ search }, (readyState) => console.log(readyState));
  }
  render() {
    const { viewer: { characters } } = this.props;
    const { loading } = this.state;

    const elements = characters.map((character) => (
      <li key={character.id}>
        <Link to={`/characters/${character.id}`}>
          {character.name}
        </Link>
      </li>
    ));

    return <div>
    <form onSubmit={(e) => {
      e.preventDefault();
      this.search(this.input.value);
    }}>
      <input id='search' ref={(ref) => { this.input = ref; } }/>
      <input type='submit' value='Search'/>
    </form>

      <ul>{elements}</ul>
      <a href='#' onClick={(e) => this.loadMore(e)}>
        { loading ? 'Loading...' : 'Load More' }
      </a>
    </div>;
  }
}

CharacterList.propTypes = {
  relay: React.PropTypes.object,
  viewer: React.PropTypes.object,
};

CharacterList = Relay.createContainer(CharacterList, {
  initialVariables: {
    limit: PAGE_SIZE,
    search: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        characters(limit: $limit, search: $search) {
          id,
          name,
        }
      }
    `,
  },
});

export default CharacterList;
