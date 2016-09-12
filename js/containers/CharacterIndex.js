import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import CharacterList from '../components/CharacterList';
import {
  Grid,
  Row,
  Form,
  FormControl,
  FormGroup,
  Button,
  ControlLabel,
} from 'react-bootstrap';

const PAGE_SIZE = 10;

class CharacterIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  search(search) {
    const { relay } = this.props;

    relay.setVariables({ search }, (readyState) => console.log(readyState));
  }

  loadMore(e) {
    const { relay } = this.props;
    const { variables: { limit } } = relay;
    const newLimit = limit + PAGE_SIZE;
    e.preventDefault();
    this.setState({ loading: true });
    console.log('loading more!', newLimit);

    relay.setVariables({ limit: newLimit });

    relay.forceFetch(({ done }) => {
      if (done) {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { viewer: { characters } } = this.props;
    const { loading } = this.state;

    return (
      <Grid>
        <Row>
          <Form inline onSubmit={(e) => {
            e.preventDefault();
            const input = ReactDOM.findDOMNode(this.input);
            this.search(input.value);
          }}>
            <FormGroup>
              <ControlLabel>{'Search By Name'}</ControlLabel>
              {' '}
              <FormControl id='search' ref={(ref) => { this.input = ref; } } />
            </FormGroup>
              <Button type='submit' bsStyle='primary'>
              Search
              </Button>
          </Form>
        </Row>

        <Row>
          <CharacterList characters={characters} />
        </Row>

        <Row>
          <a href='#' onClick={(e) => this.loadMore(e)}>
            { loading ? 'Loading...' : 'Load More' }
          </a>
        </Row>
      </Grid>

    );
  }
}

CharacterIndex.propTypes = {
  relay: React.PropTypes.object,
  viewer: React.PropTypes.object,
};

CharacterIndex = Relay.createContainer(CharacterIndex, {
  initialVariables: {
    limit: PAGE_SIZE,
    search: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        characters(first: $limit, search: $search) {
          pageInfo {
            hasNextPage,
            endCursor,
          }

          ${CharacterList.getFragment('characters')}
        }
      }
    `,
  },
});

export default CharacterIndex;
