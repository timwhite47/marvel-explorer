import React from 'react';
import Relay from 'react-relay';
import ComicList from '../components/ComicList';

class Series extends React.Component {
  render() {
    const { series: { comics, title, description } } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <ComicList comics={comics} />
      </div>
    );
  }
}

Series.propTypes = {
  series: React.PropTypes.object,
};

Series = Relay.createContainer(Series, {
  fragments: {
    series: () => Relay.QL`
      fragment on Series {
        id,
        title,
        description,
        urls {
          type,
          url,
        },
        comics(first: 100) {
          ${ComicList.getFragment('comics')}
        }
        thumbnail {
          url,
        }
      }
    `,
  },
});

export default Series;
