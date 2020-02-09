import React, { useState } from 'react';

import { Menu } from 'semantic-ui-react'
import { Header, Image } from 'semantic-ui-react'

import './index.scss';

function PageHeader() {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="page-header">
      <div className="page-header__user">
        <Image circular width='75' src='https://img.icons8.com/plasticine/100/000000/user.png' />
        <Header as="h4">EzequielMG</Header>
      </div>
      <div className="page-header__actions">
        <Menu secondary size="huge">
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  );
}

export default PageHeader;
