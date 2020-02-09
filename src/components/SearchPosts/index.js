import _ from 'lodash'
import React from 'react';

import { Search, Grid } from 'semantic-ui-react';

function SearchPosts() {
  const handleSearchChange = (e, query) => {
    console.log('handleSearchChange', query)
  };
  const handleResultSelect = (e, selectedResult) => {
    console.log('handleResultSelect', selectedResult)
  };
  
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <Search
            loading={false}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SearchPosts;
