import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Card, Image, Icon } from 'semantic-ui-react';

import './index.scss';

function SearchResults() {
  const GET_ANIMES = gql`
    {
      characters(page: 2, filter: { name: "rick" }) {
        results {
          id,
          name,
          image,
          species,
          status,
          gender,
          episode {
            id
          },
          species,
          location {
            name
          }
        }
      }
    }
  `;
  const { loading, data } = useQuery(GET_ANIMES);

  if (loading) {
    return 'Loading';
  } else {
    console.log('data', data)
  }

  return (
    <Grid columns={4}>
      <Grid.Row>
        {data.characters.results.map((item) => {
          return (
            <Grid.Column key={item.id} className="card-result">
              <Card>
                <Image src={item.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Meta>
                    <span>{ item.species } { item.type ? `(${ item.type})` : '' }</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='map marker alternate' />
                  <span>{ item.location.name }</span>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='tv' />
                  <span>{ item.episode.length } Episodes</span>
                </Card.Content>
              </Card>
            </Grid.Column>
          )
        })}
      </Grid.Row>
    </Grid>
  );
}

export default SearchResults;
