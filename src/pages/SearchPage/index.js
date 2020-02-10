import React from 'react';

import PageLayout from '../../layout/PageLayout';
import SearchResults from '../../components/SearchResults';

import './index.scss';

function SearchPage() {
  return (
    <PageLayout>
      <div className="search-page">
        <SearchResults />
      </div>
    </PageLayout>
  );
}

export default SearchPage;
