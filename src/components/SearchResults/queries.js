import gql from 'graphql-tag';

export const GET_CHARACTERS = gql`
  query GetCharactersByName($name: String!){
    characters(filter: { name: $name }) {
      results {
        id,
        name,
        image,
        status,
        gender,
        species,
        type,
        episode {
          id
        },
        location {
          name
        }
      }
    }
  }
`;