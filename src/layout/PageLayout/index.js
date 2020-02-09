import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import './index.scss';

function PageLayout({ children: pageContent }) {
  return (
    <div className="page">
      <Header />
      <div className="page__content">
        { pageContent }
      </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
