import React from 'react';

import './index.scss';

import Header from '../Header';
import Footer from '../Footer';

function AppLayout({ children: pageContent }) {
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

export default AppLayout;
