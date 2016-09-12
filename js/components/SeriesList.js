import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
class SeriesList extends React.Component {
  _renderSeries() {
    const { series: { edges } } = this.props;

    return edges.map((edge) => (
      <li key={edge.node.id}>
        <Link to={`/series/${edge.node.id}`}>
          {edge.node.title}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <ul>{this._renderSeries()}</ul>
    );
  }
}

SeriesList = Relay.createContainer(SeriesList, {
  fragments: {
    series: () => Relay.QL`
      fragment on SeriesConnection {
        edges {
          node {
            id,
            title,
          }
        }
      }
    `
  }
});

export default SeriesList;
