import React from 'react';
import Relay from 'react-relay';
import ComicList from '../components/ComicList';
import SeriesList from '../components/SeriesList';
import { Grid, Row, Col, Image } from 'react-bootstrap';
const PAGE_SIZE = 10;

class Character extends React.Component {
  loadMore(e, resource) {
    e.preventDefault();

    const { relay } = this.props;
    const variableKey = `${resource}Limit`;
    const currentValue = relay.variables[variableKey];
    const newVariables = {};

    newVariables[variableKey] = currentValue + PAGE_SIZE;

    relay.setVariables(newVariables);
    relay.forceFetch();
  }
  render() {
    const { character: { name, thumbnail, description, comics, series } } = this.props;

    return (
      <Grid>
        <Row>
          <h1>{name}</h1>
        </Row>
        <Row>
          <Col>
            <Image height='100' src={thumbnail} width='100' />
          </Col>
          <Col>
            <p>{description}</p>
          </Col>
        </Row>

        <Row>
          <h1>{'Series'}</h1>
          <SeriesList series={series} />
          {series.pageInfo.hasNextPage ? <a href='#' onClick={(e) => this.loadMore(e, 'series')}>Load More</a> : <div />}
        </Row>

        <Row>
          <h1>{'Recent Comics'}</h1>
          <ComicList comics={comics} />
          {comics.pageInfo.hasNextPage ? <a href='#' onClick={(e) => this.loadMore(e, 'comics')}>Load More</a> : <div />}
        </Row>
      </Grid>
    );
  }
}

Character.propTypes = {
  character: React.PropTypes.object,
  relay: React.PropTypes.object,
};

Character = Relay.createContainer(Character, {
  initialVariables: {
    comicsLimit: PAGE_SIZE,
    seriesLimit: PAGE_SIZE,
  },
  fragments: {
    character: () => Relay.QL`
      fragment on Character {
        name,
        description,
        thumbnail,
        comics(first: $comicsLimit) {
          pageInfo {
            hasNextPage,
          },
          ${ComicList.getFragment('comics')}
        }
        series(first: $seriesLimit) {
          pageInfo {
            hasNextPage,
          },
          ${SeriesList.getFragment('series')}
        }
      }
    `,
  },
});

export default Character;
