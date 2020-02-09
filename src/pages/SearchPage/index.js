import React from 'react';

import PageLayout from '../../layout/PageLayout';
import SearchPosts from '../../components/SearchPosts';
import SearchResults from '../../components/SearchResults';

import './index.scss';

function SearchPage() {
  return (
    <PageLayout>
      <div className="search-page">
        <SearchPosts />
        <SearchResults />
      </div>
    </PageLayout>
  );
}

export default SearchPage;
