import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class ComicList extends React.Component {
  _renderComicListing(comic) {
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
    const { comics } = this.props;

    return comics.map(this._renderComicListing);
  }

  render() {
    return (
      <ul>{this._renderComics()}</ul>
    );
  }
}

ComicList = Relay.createContainer(ComicList, {
  fragments: {
    comics: () => Relay.QL`
      fragment on Comic @relay(plural: true) {
        id,
        title,
        thumbnail {
          url,
        },
      }
    `,
  },
});

export default ComicList;
