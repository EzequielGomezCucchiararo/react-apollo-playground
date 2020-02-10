import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Grid, Form, Card, Image, Icon } from 'semantic-ui-react';

import { GET_CHARACTERS } from './queries';

import './index.scss';

function SearchResults() {
  const [characterName, setCharacterName] = useState('')
  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTERS);

  return (
    <>
      <Grid columns={4}>
        <Grid.Column>
          <Form noValidate
            className="search-form"
            onSubmit={() => getCharacters({ variables: { name: characterName } })}
          >
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                loading={loading}
                label='Character Name'
                name="characterName"
                value={characterName}
                placeholder='Type a character...'
                onChange={(e) => setCharacterName(e.target.value)}
              />
            </Form.Group>
            <Form.Button primary>Search</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={4}>
        {
          !loading && data && <Grid.Row>
            {data.characters.results && data.characters.results.map((item) => {
              return (
                <Grid.Column key={item.id} className="card-result">
                  <Card>
                    <Image src={item.image} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Meta>
                        <span>{item.gender} - {item.species} {item.type ? `(${item.type})` : ''}</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='map marker alternate' />
                      <span>{item.location.name}</span>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='tv' />
                      <span>{item.episode.length} Episodes</span>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        }
      </Grid>
    </>
  );
}

export default SearchResults;
