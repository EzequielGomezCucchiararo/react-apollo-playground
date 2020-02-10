import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Form, Loader, Select, Button, Input, Card, Image, Icon } from 'semantic-ui-react';

import './index.scss';

function SearchResults() {
  const [state, setState] = useState({
    searching: false,
    results: [],
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
    console.log("TCL: onChange -> e.target.name", e.target.name)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setState({ ...state, searching: true });
    refetch({ name: state.characterName })
      .then(({ data }) => {
        setState({
          ...state,
          results: data.characters.results,
          searching: false,
        });
      });
  };

  const GET_CHARACTERS = gql`
    query Characters($name: String!){
      characters(filter: { name: $name }) {
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

  const { refetch } = useQuery(GET_CHARACTERS, { skip: true });

  return (
    <>
      <Form noValidate
        className="search-form"
        loading={state.searching}
        onSubmit={handleSearch}
      >
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Character Name'
            name="characterName"
            value={ state.characterName }
            placeholder='Type a character...'
            onChange={onChange}
          />
          <Form.Select
            fluid
            label='Status'
            name="characterStatus"
            options={statusOptions}
            value={ state.characterStatus }
            placeholder='Status'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Button primary>Search</Form.Button>
      </Form>
      <Grid columns={4}>
        {
          !state.searching && <Grid.Row>
            {state.results.map((item) => {
              return (
                <Grid.Column key={item.id} className="card-result">
                  <Card>
                    <Image src={item.image} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Meta>
                        <span>{item.species} {item.type ? `(${item.type})` : ''}</span>
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
