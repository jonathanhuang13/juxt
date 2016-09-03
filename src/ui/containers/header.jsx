import React from 'react';
import { LinkComponent as Link } from './common-components';

export default class Header extends React.Component {
  render() {
    return <div className='header'>
      <Link to='/'><h2 className='title'>JUXT</h2></Link>
    </div>;
  }
}
