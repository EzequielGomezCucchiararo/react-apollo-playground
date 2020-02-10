import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import { Grid, Form, Loader, Select, Button, Input, Card, Image, Icon } from 'semantic-ui-react';

import './index.scss';

function SearchResults() {
  const [state, setState] = useState({
    characterName: '',
    characterStatus: ''
  })

  const statusOptions = [
    { key: 'alive', value: 'alive', text: 'Alive' },
    { key: 'dead', value: 'dead', text: 'Dead' },
    { key: 'unknow', vunknowue: 'al', text: 'Unknow' },
  ]

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
    // TODO: select tiene target null console.log("TCL: onChange -> e.target.value", e)
  }

  const GET_CHARACTERS = gql`
    query Characters($name: String!){
      characters(filter: { name: $name }) {
        results {
          id,
          name,
          image,
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

  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTERS);

  return (
    <>
      <Form noValidate
        className="search-form"
        loading={loading}
        onSubmit={() => getCharacters({ variables: { name: state.characterName } })}
      >
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Character Name'
            name="characterName"
            value={state.characterName}
            placeholder='Type a character...'
            onChange={onChange}
          />
          <Form.Select
            fluid
            label='Status'
            name="characterStatus"
            options={statusOptions}
            placeholder='Status'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Button primary>Search</Form.Button>
      </Form>
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
