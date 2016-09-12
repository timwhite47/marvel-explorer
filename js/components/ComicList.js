import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Media, Image } from 'react-bootstrap';

class ComicList extends React.Component {
  _renderComicListing(edge) {
    const comic = edge.node;
    return <Media key={comic.id}>
      <Media.Left align='top'>
        <Link to={`/characters/${comic.id}`}>
          <Image height='250' src={comic.thumbnail.url} width='150'/>
        </Link>
      </Media.Left>
      <Media.Body>
        <Link to={`/comics/${comic.id}`}>
          <Media.Heading>{comic.title}</Media.Heading>
        </Link>

        <p>{comic.description}</p>

      </Media.Body>
    </Media>;
    return (
      <li>
        <p>
          <Link to={`/comics/${comic.id}`}>
            {comic.title}
          </Link>
        </p>
        <Link to={`/comics/${comic.id}`}>
          <img height='250' src={comic.thumbnail.url} width='150'/>
        </Link>
      </li>

    );
  }

  _renderComics() {
    const { comics: { edges } } = this.props;

    return edges.map(this._renderComicListing);
  }

  render() {
    return (
      <ul>{this._renderComics()}</ul>
    );
  }
}

ComicList.propTypes = {
  comics: React.PropTypes.object,
};

ComicList = Relay.createContainer(ComicList, {
  fragments: {
    comics: () => Relay.QL`
      fragment on ComicConnection {
        edges {
          node {
            id,
            title,
            thumbnail {
              url,
            }
          }
        }
      }
    `,
  },
});

export default ComicList;
